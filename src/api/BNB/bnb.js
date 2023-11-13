import Web3 from "web3";
import CoreAbi from "@/api/abi/Core.json";
import usdtAbi from "@/api/abi/usdt.json";
import nfttAbi from "@/api/abi/nftt.json";

import { Toast } from "vant";
// Establish web3 provider
export default {
  install(Vue, options) {
    // https://dweb.link/ipfs
    var WalletAddress = "";
    var zeroAddress = "0x0000000000000000000000000000000000000000";
    var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

    // 测试网
    var CoreToken = "0x431897b0422B0EAC07e437Ac8d611A802ab9F8dD"; //核心业务
    var usdt = "0x90BE2D7031D723033e7f3CBc0e18Dcf511bb6033";
    var nftt = "0xe36e6DE8962d2ECa7CC8b98Db46f5F7224D927c5";
    // 主网
    // var CoreToken = "0xAd912788B4aa886Fe5694873d2D6F91d9efF23fd"; //核心业务
    // // var usdt = "0x55d398326f99059fF775485246999027B3197955";
    // var nftt = "0xa1927b4035F6DEb641BA5dF11849d9A3a1331733";

    //监听钱包切换
    ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
    //监听链网络改变
    ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    function Link() {
      if (typeof window.ethereum !== "undefined") {
        return new Promise(async (resolve, reject) => {
          const res = await ethereum
            .request({ method: "eth_requestAccounts" })
            .catch(error => {
              if (error.code === 4001) {
                console.log("Please connect to MetaMask.");
              } else {
                console.error(error);
              }
            });
          WalletAddress = res[0];
          resolve(res[0]);
        });
      }
    }
    async function Contract(abi, address, Gasres, gasPrice) {
      return new web3.eth.Contract(abi, address, {
        from: await Link(),
        gas: Gasres,
        gasPrice: gasPrice
      });
    }
    // 公共查询方法
    function CommonQuery(abi, address, fn, ...arg) {
      return new Promise(async (resolve, reject) => {
        const result = await Contract(abi, address);
        result.methods[fn](WalletAddress, ...arg)
          .call()
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    }
    // 公共查询方法
    function CommonQuery1(abi, address, fn, ...arg) {
      return new Promise(async (resolve, reject) => {
        const result = await Contract(abi, address);
        result.methods[fn](...arg)
          .call()
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    }
    // 公共写入方法
    function CommonWrite(abi, address, fn, ...arg) {
      return new Promise(async (resolve, reject) => {
        const result = await Contract(abi, address);
        result.methods[fn](...arg)
          .estimateGas({ from: WalletAddress })
          .then(Gesres => {
            web3.eth
              .getGasPrice()
              .then(async gasPrice => {
                const result1 = await Contract(abi, address, Gesres, gasPrice);
                result1.methods[fn](...arg)
                  .send()
                  .on("transactionHash", async function(hash) {
                    transactionInformation(hash, resolve);
                  })
                  .catch(error => {
                    console.log(error);
                    reject(error);
                  });
              })
              .catch(error => {
                console.log(error);
                reject(error);
              });
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    }
    // 查看是否交易成功
    function transactionInformation(hash, resolve) {
      web3.eth.getTransactionReceipt(hash).then(res => {
        if (res == null) {
          transactionInformation(hash, resolve);
        } else {
          if (res.status == true) {
            Toast.clear();
            resolve();
          } else {
          }
        }
      });
    }
    // 链接钱包
    Vue.prototype.LinkBNB = async function(e) {
      if (typeof window.ethereum !== "undefined") {
        const res = await ethereum
          .request({ method: "eth_requestAccounts" })
          .catch(error => {
            if (error.code === 4001) {
              console.log("Please connect to MetaMask.");
            } else {
              console.error(error);
            }
          });
        localStorage.setItem("WalletAddress", res[0]);
        WalletAddress = res[0];
        this.MyAddress = WalletAddress;
      }
    };
    // 获取用户信息
    Vue.prototype.getUserInfo = function(num) {
      CommonQuery(CoreAbi, CoreToken, "members")
        .then(res => {
          this.userInfo = res;
          if (num) {
            this.getTotalReward();
            this.getTotalPendingRewards();
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    // 查询上级是否有推广权限
    Vue.prototype.querySuperiorPermissions = function(address) {
      CommonQuery1(CoreAbi, CoreToken, "members", address)
        .then(res => {
          if (res.level == 0) {
            Toast({
              message: `您的上级未获得推广权限`,
              className: "yellow"
            });
            return;
          }
          this.bind(address);
        })
        .catch(err => {
          console.log(err);
        });
    };
    // 查询所有等级待释放
    Vue.prototype.getTotalReward = async function() {
      let arr = ["level1", "level2", "level3", "level4", "level5", "level6"];
      for (let index = 0; index <= 6; index++) {
        let r = await CommonQuery(
          CoreAbi,
          CoreToken,
          "getPendingRewards",
          index + 1
        );
        this.userRewards[arr[index]] = Number(r);
      }
    };

    // 查询所有等级可获得的层级收益
    Vue.prototype.getTotalPendingRewards = async function() {
      let arr = ["level1", "level2", "level3", "level4", "level5", "level6"];
      for (let index = 0; index <= 6; index++) {
        let r = await CommonQuery(
          CoreAbi,
          CoreToken,
          "gettotalPendingRewards",
          index + 1
        );
        this.totalPendingRewards[arr[index]] = this.fromWei(r);
      }
    };

    Vue.prototype.claimPendingRewards = async function(level, userRewards) {
      if (this.userInfo.level < level) {
        Toast({
          message: `需要购买A${level}矿机才能领取`,
          className: "yellow"
        });
        return;
      }
      if (userRewards == "0.000") {
        Toast({
          message: "暂无领取",
          className: "yellow"
        });
        return;
      }

      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "领取中..."
      });
      await CommonWrite(CoreAbi, CoreToken, "claimPendingRewards", level)
        .then(() => {
          Toast({
            message: "领取成功",
            className: "yellow"
          });
          this.getPendingReward();
        })
        .catch(err => {
          Toast.clear();
          Toast({
            message: "领取失败",
            className: "yellow"
          });
        });
    };
    //查询是否有绑定上级
    Vue.prototype.QueryBinding = function() {
      CommonQuery(CoreAbi, CoreToken, "members")
        .then(res => {
          this.superiors = res.sponsor;
          if (res.sponsor == zeroAddress) {
            this.dialogVisible = true;
            this.orSponsor = true;
          } else {
            this.orSponsor = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    // 绑定上级
    Vue.prototype.bind = function(addr) {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "绑定中...",
        className: "bind"
      });
      CommonWrite(CoreAbi, CoreToken, "join", addr)
        .then(() => {
          Toast.clear();
          Toast({
            message: "绑定成功",
            className: "yellow"
          });
          // 关闭绑定弹窗
          this.dialogVisible = false;
          this.orSponsor = false;
        })
        .catch(err => {
          console.log(err);
          Toast.clear();
        });
    };
    // 查询下级
    Vue.prototype.getReferrals = function() {
      CommonQuery(CoreAbi, CoreToken, "getReferrals")
        .then(res => {
          this.childList = res;
        })
        .catch(err => {
          console.log(err);
        });
    };

    // 查询指定下级
    Vue.prototype.queryReferrals = function(addr) {
      CommonQuery1(CoreAbi, CoreToken, "getReferrals", addr)
        .then(res => {
          console.log(res);
          this.subordinateList = res;
        })
        .catch(err => {
          console.log(err);
        });
    };
    // 购买矿机
    Vue.prototype.buyingMachine = function(level) {
      CommonWrite(CoreAbi, CoreToken, "buyLevel", level)
        .then(res => {
          Toast({
            message: "购买成功",
            className: "yellow"
          });
          this.getUserInfo();
          this.getNFTTBalanceOf();
        })
        .catch(error => {
          Toast.clear();
          console.log(error);
          Toast({
            message: "购买失败",
            className: "yellow"
          });
        });
    };
    // 授权NFTT余额
    Vue.prototype.approveUsdt = async function(level) {
      let arr = [0, 100, 200, 400, 1000, 4000, 13000, 28000, 38000];
      // 等级对应价格
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "购买中...",
        className: "bind"
      });

      const approveNum = await CommonQuery1(
        CoreAbi,
        CoreToken,
        "usdt2Token",
        "1000000000000000000"
      );
      await CommonWrite(
        nfttAbi,
        nftt,
        "approve",
        CoreToken,
        this.toWei(Number(this.fromWei(approveNum)) * Number(arr[level]))
      )
        .then(() => {
          this.buyingMachine(level);
        })
        .catch(err => {
          Toast.clear();
        });
    };
    // 获取 NFTT 余额
    Vue.prototype.getNFTTBalanceOf = function() {
      CommonQuery(nfttAbi, nftt, "balanceOf")
        .then(res => {
          this.nfttBalnceOf = this.fromWei(res);
        })
        .catch(err => {
          console.log(err);
        });
    };
    //跳转查询
    Vue.prototype.JumpQueryAbi = function(e) {
      // if (WalletAddress == "") {
      //   Toast("请链接钱包");
      // } else {
      //   this.JumpQueryCg(e);
      // }
      this.JumpQueryCg(e);
    };
  }
};
