<template>
  <div class="inviteontainerBox">
    <div class="inviteBox">
      <div class="Walletaddress">
        <div class="title">我的钱包地址</div>
        <div class="qrcodeBox jcc" v-show="!orSponsor && userInfo.level != 0">
          <div id="qrcode" ref="qrcode"></div>
        </div>
        <div class="myAddress">
          {{ userInfoAddress }}
          <span
            class="copyAddress "
            v-clipboard:copy="userInfoAddress"
            v-clipboard:success="fzdzhiAs"
          >
            复制
          </span>
        </div>
        <div
          v-show="!orSponsor && userInfo.level != 0"
          class="inviteFriends jcc"
          v-clipboard:copy="value"
          v-clipboard:success="fzdzhiAs"
        >
          复制邀请链接
        </div>
      </div>
      <div class="junior">
        <div class="title">我的下级({{ childList.length }})</div>
        <div class="juniorItem" v-if="childList.length != 0">
          <div class="item jcsb" v-for="item in childList" :key="item">
            <div class="left">{{ item }}</div>
            <div class="right" @click="querySubordinates(item)">查询</div>
          </div>
        </div>
      </div>
      <div class="Walletaddress" style="margin-top:8rem">
        <div class="title">我的上级</div>
        <div class="superiors" v-if="superiors != zeroAddress">
          {{ superiors }}
          <span
            class="copySuperiors"
            v-clipboard:copy="superiors"
            v-clipboard:success="fzdzhiAs"
          >
            复制
          </span>
        </div>
        <div class="superiors" v-else>暂无上级</div>
      </div>
    </div>
    <el-dialog
      title="查询下级"
      :visible.sync="dialogVisible1"
      width="96%"
      @close="dialogVisible1 = false"
      custom-class="bindDialogg queried"
    >
      <div>
        <div class="addressQueried">查询的地址</div>
        <div class="user">{{ querySubordinatesAddr }}</div>
        <div class="addressQueried1">下级地址</div>

        <div class="subordinate">
          <div v-if="subordinateList.length > 0">
            <div
              class="subordinateItem jcsb"
              v-for="(item, index) in subordinateList"
              :key="index"
            >
              <div class="left">{{ item }}</div>
              <div class="right" @click="querySubordinates(item)">查询</div>
            </div>
          </div>
          <div class="empty" v-else>未查询到下级</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Toast } from "vant";
import QRCode from "qrcodejs2"; // 二维码
export default {
  components: {},
  data() {
    return {
      zeroAddress: "0x0000000000000000000000000000000000000000",
      superiors: undefined,
      userInfoAddress: "",
      value: `${window.location.origin}/#/?address=${localStorage.getItem(
        "WalletAddress"
      )}`,
      // value: `http://106.53.125.77:1222/#/?address=${localStorage.getItem(
      //   "WalletAddress"
      // )}`,
      childList: [],
      orSponsor: true,
      userInfo: {},
      dialogVisible1: false,
      subordinateList: [],
      querySubordinatesAddr: ""
    };
  },
  activated() {
    this.getUserInfo();
    this.getReferrals();
    this.QueryBinding();
  },
  mounted() {
    this.userInfoAddress = localStorage.getItem("WalletAddress");
    this.$nextTick(function() {
      this.qrcode();
    });
  },
  methods: {
    querySubordinates(addr) {
      this.querySubordinatesAddr = addr;
      this.queryReferrals(addr);
      this.dialogVisible1 = true;
    },
    qrcode() {
      new QRCode("qrcode", {
        text: this.value,
        width: 200,
        height: 200
      });
    },
    fzdzhiAs() {
      Toast({
        message: "复制成功",
        className: "yellow"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.inviteBox {
  padding: 2rem;
  .Walletaddress {
    background: #343434;
    padding: 2rem;
    .title {
      font-size: 1.7rem;
      color: #dbd308;
      font-weight: bold;
    }
    .superiors {
      font-size: 1.5rem;
      color: #fff;
      line-height: 3rem;
      margin-top: 1rem;
      .copySuperiors {
        color: #dbd308;
        font-size: 1.5rem;
      }
    }
    .myAddress {
      margin-top: 2rem;
      line-height: 3rem;
      font-size: 1.5rem;
      color: #fff;
      .copyAddress {
        color: #dbd308;
        font-size: 1.5rem;
      }
    }
  }
  .inviteFriends {
    margin-top: 3rem;
    height: 5rem;
    border-radius: 0.5rem;
    background: #dbd308;
    color: #333333;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .junior {
    margin-top: 2rem;
    .title {
      color: #fff;
      font-size: 1.8rem;
      font-weight: bold;
    }
    .juniorItem {
      max-height: 43vh;
      overflow: auto;
      .item {
        line-height: 3rem;
        color: #fff;
        font-size: 1.3rem;
        .left {
          width: 84%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .right {
          color: #dbd308;
        }
      }
    }
  }
  .qrcodeBox {
    margin-top: 2rem;
    #qrcode {
      border: 10px solid #fff;
    }
  }
}

.queried {
  .addressQueried {
    color: #dbd308;
    font-size: 1.5rem;
    font-weight: bold;
  }
  .user {
    margin-top: 1rem;
    color: #fff;
  }
  .addressQueried1 {
    color: #dbd308;
    margin-top: 1rem;
  }
  .subordinateItem {
    color: #fff;
    line-height: 3rem;
    .left {
      width: 85%;
    }
    .right {
      color: #dbd308;
    }
  }
  .empty {
    color: #fff;
    text-align: center;
  }
}
</style>
