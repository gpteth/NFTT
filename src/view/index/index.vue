<template>
  <div class="container">
    <div class="indexHeader1" v-show="userInfo.level > 0">
      <div class="main">
        <div class="title">钱包地址</div>
        <div class="qrcodeBox">
          <div class="left jcc">
            <div id="qrcode" ref="qrcode"></div>
          </div>
          <div class="right">
            <div class="myAddress">{{ userInfoAddress }}</div>
            <div
              class="copy1"
              v-clipboard:copy="userInfoAddress"
              v-clipboard:success="fzdzhiAs"
            >
              复制
            </div>
          </div>
        </div>
        <div
          class="inviteFriends jcc"
          v-clipboard:copy="value"
          v-clipboard:success="fzdzhiAs"
        >
          复制邀请链接
        </div>
        <img src="../../assets/img/pic1.png" class="pic1" alt="" />
      </div>
    </div>
    <div class="indexHeader" v-show="userInfo.level == 0"></div>

    <div class="indexMain">
      <div class="tokenInformation">
        <div class="theTotal">
          <div class="theTotalTitle">持有NFTT</div>
          <div class="theTotalNum">{{ nfttBalnceOf }}</div>
        </div>
        <div class="tokenInformationBox">
          <div class="title">购买矿机</div>
          <div class="miningMachine" @click="buyLevel(1)">
            <div class="top">
              <div class="lv">A1</div>
              <div class="purchased" v-show="userInfo.level >= 1">已购买</div>
              <div class="left">
                <img src="../../assets/img/miningMachine.png" alt="" />
              </div>
              <div class="center">
                <div class="nftt">100USDT</div>
                <div class="hierarchy">层级人数:3</div>
                <div class="released">
                  层级收益:{{ totalPendingRewards.level1 }}U
                </div>
              </div>
              <div class="right"><van-icon name="arrow" /></div>
            </div>
            <!-- <div class="bottom jcsb">
              <div class="text">待领取</div>
              <div class="num">{{ userRewards.level1 }}USDT</div>
              <div
                class="btn"
                @click.stop="claimPendingRewards(1, userRewards.level1)"
              >
                领取
              </div>
            </div> -->
          </div>
          <div class="miningMachine" @click="buyLevel(2)">
            <div class="top">
              <div class="lv">A2</div>
              <div class="purchased" v-show="userInfo.level >= 2">已购买</div>
              <div class="left">
                <img src="../../assets/img/miningMachine.png" alt="" />
              </div>
              <div class="center">
                <div class="nftt">200USDT</div>
                <div class="hierarchy">层级人数:9</div>
                <div class="released">
                  层级收益:{{ totalPendingRewards.level2 }}U
                </div>
              </div>
              <div class="right"><van-icon name="arrow" /></div>
            </div>
            <div class="bottom jcsb">
              <div class="text">待领取</div>
              <div class="num">{{ userRewards.level2 }}USDT</div>
              <div
                class="btn"
                @click.stop="claimPendingRewards(2, userRewards.level2)"
              >
                领取
              </div>
            </div>
          </div>
          <div class="miningMachine" @click="buyLevel(3)">
            <div class="top">
              <div class="lv">A3</div>
              <div class="purchased" v-show="userInfo.level >= 3">已购买</div>
              <div class="left">
                <img src="../../assets/img/miningMachine.png" alt="" />
              </div>
              <div class="center">
                <div class="nftt">400USDT</div>
                <div class="hierarchy">层级人数:27</div>
                <div class="released">
                  层级收益:{{ totalPendingRewards.level3 }}U
                </div>
              </div>
              <div class="right"><van-icon name="arrow" /></div>
            </div>
            <div class="bottom jcsb">
              <div class="text">待领取</div>
              <div class="num">{{ userRewards.level3 }}USDT</div>
              <div
                class="btn"
                @click.stop="claimPendingRewards(3, userRewards.level3)"
              >
                领取
              </div>
            </div>
          </div>
          <div class="miningMachine" @click="buyLevel(4)">
            <div class="top">
              <div class="lv">A4</div>
              <div class="purchased" v-show="userInfo.level >= 4">已购买</div>
              <div class="left">
                <img src="../../assets/img/miningMachine.png" alt="" />
              </div>
              <div class="center">
                <div class="nftt">1000USDT</div>
                <div class="hierarchy">层级人数:81</div>
                <div class="released">
                  层级收益:{{ totalPendingRewards.level4 }}U
                </div>
              </div>
              <div class="right"><van-icon name="arrow" /></div>
            </div>
            <div class="bottom jcsb">
              <div class="text">待领取</div>
              <div class="num">{{ userRewards.level4 }}USDT</div>
              <div
                class="btn"
                @click.stop="claimPendingRewards(4, userRewards.level4)"
              >
                领取
              </div>
            </div>
          </div>
          <div class="miningMachine" @click="buyLevel(5)">
            <div class="top">
              <div class="lv">A5</div>
              <div class="purchased" v-show="userInfo.level >= 5">已购买</div>
              <div class="left">
                <img src="../../assets/img/miningMachine.png" alt="" />
              </div>
              <div class="center">
                <div class="nftt">4000USDT</div>
                <div class="hierarchy">层级人数:243</div>
                <div class="released">
                  层级收益:{{ totalPendingRewards.level5 }}U
                </div>
              </div>
              <div class="right"><van-icon name="arrow" /></div>
            </div>
            <div class="bottom jcsb">
              <div class="text">待领取</div>
              <div class="num">{{ userRewards.level5 }}USDT</div>
              <div
                class="btn"
                @click.stop="claimPendingRewards(5, userRewards.level5)"
              >
                领取
              </div>
            </div>
          </div>
          <div class="miningMachine" @click="buyLevel(6)">
            <div class="top">
              <div class="lv">A6</div>
              <div class="purchased" v-show="userInfo.level >= 6">已购买</div>
              <div class="left">
                <img src="../../assets/img/miningMachine.png" alt="" />
              </div>
              <div class="center">
                <div class="nftt">13000USDT</div>
                <div class="hierarchy">层级人数:729</div>
                <div class="released">
                  层级收益:{{ totalPendingRewards.level6 }}U
                </div>
              </div>
              <div class="right"><van-icon name="arrow" /></div>
            </div>
            <div class="bottom jcsb">
              <div class="text">待领取</div>
              <div class="num">{{ userRewards.level6 }}USDT</div>
              <div
                class="btn"
                @click.stop="claimPendingRewards(6, userRewards.level6)"
              >
                领取
              </div>
            </div>
          </div>
          <div class="miningMachine1">
            <div class="lv">A7</div>
            <div class="left">
              <img src="../../assets/img/miningMachine.png" alt="" />
            </div>
            <div class="center">
              <div class="nftt">即将上线</div>
            </div>
            <div class="right"><van-icon name="arrow" /></div>
          </div>
          <div class="miningMachine1">
            <div class="lv">A8</div>
            <div class="left">
              <img src="../../assets/img/miningMachine.png" alt="" />
            </div>
            <div class="center">
              <div class="nftt">即将上线</div>
            </div>
            <div class="right"><van-icon name="arrow" /></div>
          </div>
          <div class="miningMachine1">
            <div class="lv">A9</div>
            <div class="left">
              <img src="../../assets/img/miningMachine.png" alt="" />
            </div>
            <div class="center">
              <div class="nftt">即将上线</div>
            </div>
            <div class="right"><van-icon name="arrow" /></div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="请输入上级地址"
      :visible.sync="dialogVisible"
      width="80%"
      @close="dialogVisible = false"
      custom-class="bindDialogg"
    >
      <div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 4 }"
          placeholder="请输入"
          v-model.trim="superiorsAddr"
        >
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="btn btn1 jcc" @click="dialogVisible = false">取消</div>
        <div class="btn btn2 jcc" @click="confirm">确定</div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Toast } from "vant";
import QRCode from "qrcodejs2"; // 二维码

export default {
  data() {
    return {
      dialogVisible: false,
      superiorsAddr: undefined,
      orSponsor: true,
      userInfo: {},
      nfttBalnceOf: 0,
      userRewards: {
        level1: 0,
        level2: 0,
        level3: 0,
        level4: 0,
        level5: 0,
        level6: 0
      },
      totalPendingRewards: {
        level1: 0,
        level2: 0,
        level3: 0,
        level4: 0,
        level5: 0,
        level6: 0
      },
      value: `${window.location.origin}/#/?address=${localStorage.getItem(
        "WalletAddress"
      )}`,
      userInfoAddress: ""
    };
  },
  mounted() {
    this.getUserInfo(true);
    this.getNFTTBalanceOf();
    this.$nextTick(function() {
      this.qrcode();
    });
    this.userInfoAddress = localStorage.getItem("WalletAddress");
  },
  activated() {
    this.QueryBinding();
    this.superiorsAddr = this.$route.query.address;
  },
  methods: {
    fzdzhiAs() {
      Toast({
        message: "复制成功",
        className: "yellow"
      });
    },
    qrcode() {
      new QRCode("qrcode", {
        text: this.value,
        width: 80,
        height: 80
      });
    },
    confirm() {
      if (
        this.superiorsAddr.toLowerCase() ==
        localStorage.getItem("WalletAddress").toLowerCase()
      ) {
        Toast({
          message: "不可绑定自己",
          className: "yellow"
        });
        return;
      }
      if (!this.superiorsAddr) {
        Toast({
          message: "请输入上级地址",
          className: "yellow"
        });
        return;
      }

      this.querySuperiorPermissions(this.superiorsAddr);
    },
    buyLevel(level) {
      if (this.orSponsor) {
        this.dialogVisible = true;
        return;
      }

      if (this.userInfo.level == 0 && level > 1) {
        Toast({
          message: `请先购买A1矿机`,
          className: "yellow"
        });
        return;
      }
      if (this.userInfo.level > level) {
        Toast({
          message: `您当前的矿机已经是A${this.userInfo.level}`,
          className: "yellow"
        });
        return;
      }
      if (this.userInfo.level == level) {
        Toast({
          message: `您当前的矿机已经是A${level}`,
          className: "yellow"
        });
        return;
      }
      this.approveUsdt(level);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.indexHeader {
  background: url("../../assets/img/indexHeaderBg.png") no-repeat;
  background-size: 100% 100%;
  height: 20rem;
  img {
    width: 100%;
    height: 100%;
  }
}
.indexHeader1 {
  padding: 1.5rem;
  .main {
    position: relative;
    height: 100%;
    padding: 1rem;
    background: #343434;
    border-radius: 0.5rem;
    .title {
      font-size: 1.5rem;
      color: #dbd308;
      font-weight: bold;
    }
    .pic1 {
      position: absolute;
      right: 0;
      top: 0;
      width: 12rem;
    }
    .qrcodeBox {
      display: flex;
      margin-top: 1rem;
      .left {
        /deep/ #qrcode {
          border: 0.5rem solid #fff;
        }
      }
      .right {
        margin-left: 1rem;
        .myAddress {
          color: #fff;
          font-size: 1.5rem;
          line-height: 3rem;
        }
        .copy1 {
          margin-top: 1rem;
          color: #dbd308;
          font-size: 1.3rem;
        }
      }
    }
    .inviteFriends {
      margin-top: 2rem;
      height: 4rem;
      border-radius: 0.5rem;
      background: #dbd308;
      color: #333333;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
}
.indexMain {
  padding-bottom: 2rem;
  .tokenInformation {
    padding: 1.5rem;
    background: linear-gradient(180deg, #a5a000 0%, #111111 100%);
    height: 50rem;
    .tokenInformationBox {
      padding: 1.5rem;
      background: #343434;
      border-radius: 0.5rem;
      margin-top: 2rem;
    }
    .title {
      font-size: 1.8rem;
      color: #fff;
      font-weight: bold;
    }
    .miningMachine {
      margin-top: 2rem;
      background: #111111;
      border-radius: 0.5rem;
      border: 1px solid #dbd308;
      position: relative;
      padding: 0 1.5rem;
      .top {
        display: flex;
        justify-content: space-between;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #292929;
        .lv {
          position: absolute;
          top: 0;
          left: 0;
          width: 4.5rem;
          height: 2.5rem;
          line-height: 2.5rem;
          font-weight: bold;
          text-align: center;
          color: #333333;
          background: #dbd308;
          font-size: 1.5rem;
          border-bottom-right-radius: 0.5rem;
        }
        .purchased {
          position: absolute;
          top: 0;
          right: 0;
          width: 6rem;
          height: 2.5rem;
          line-height: 2.5rem;
          font-weight: bold;
          text-align: center;
          color: #333333;
          background: #dbd308;
          font-size: 1.3rem;
          border-bottom-left-radius: 0.5rem;
        }
        .left {
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 10rem;
          }
        }
        .center {
          display: flex;
          justify-content: space-evenly;
          flex-direction: column;
          margin-right: 2rem;
          .nftt {
            font-size: 2rem;
            color: #fff;
            font-weight: bold;
          }
          .released {
            font-size: 1.3rem;
            color: #fff;
          }
          .hierarchy {
            font-size: 1.3rem;
            color: #fff;
          }
        }
        .right {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 2rem;
        }
      }
      .bottom {
        line-height: 5rem;
        .text {
          color: #fff;
          font-size: 1.5rem;
        }
        .num {
          width: 11rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #fff;
          text-align: center;
          font-size: 1.5rem;
          margin-left: 5rem;
        }
        .btn {
          color: #333333;
          font-size: 1.2rem;
          width: 6rem;
          height: 3rem;
          line-height: 3.2rem;
          text-align: center;
          background: #dbd308;
          border-radius: 4px 4px 4px 4px;
        }
      }
    }
    .miningMachine1 {
      margin-top: 2rem;
      height: 12rem;
      background: #e0e0e0;
      border-radius: 0.5rem;
      border: 1px solid #dbd308;
      display: flex;
      justify-content: space-around;
      position: relative;

      .lv {
        position: absolute;
        top: 0;
        left: 0;
        width: 4.5rem;
        height: 2.5rem;
        line-height: 2.5rem;
        font-weight: bold;
        text-align: center;
        color: #333333;
        background: #dbd308;
        font-size: 1.5rem;
        border-bottom-right-radius: 0.5rem;
      }
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 10rem;
        }
      }
      .center {
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
        margin-right: 2rem;
        .nftt {
          font-size: 1.8rem;
          font-weight: bold;
          color: #333333;
        }
        .released {
          font-size: 1.3rem;
          color: #fff;
        }
        .hierarchy {
          font-size: 1.3rem;
          color: #fff;
        }
      }
      .right {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 2rem;
      }
    }
  }

  .theTotal {
    padding: 1rem;
    background: #111111;
    border: 1px solid #dbd308;
    border-radius: 0.5rem;

    .theTotalTitle {
      color: #999999;
      font-size: 1.5rem;
    }
    .theTotalNum {
      font-size: 2rem;
      font-weight: bold;
      color: #dbd308;
      margin-top: 1rem;
    }
  }
}
</style>
