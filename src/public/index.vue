<template>
  <div class="containerBox">
    <div class="Topbox">
      <div class="TopbuttonLeft">
        <img src="../assets/img/logo.png" alt="" />
      </div>
      <div class="TopbuttonRi" @click="clickbroadside()">
        <li>
          <span class="LiTio">
            <slot name="center">{{ $route.meta.title || "" }}</slot>
          </span>
          <img src="../assets/img/icon3.png" alt="" />
        </li>
      </div>
    </div>
    <div class="slot"></div>
    <!-- 侧边栏 -->
    <div class="broadside">
      <van-popup
        v-model="show"
        position="right"
        :style="{ width: '60%', height: ' 100%' }"
      >
        <div class="SideContainerBox">
          <div class="SideAddressBox">
            <div class="SideAddressBoxYe">
              <div class="Myyue">
                <span class="token">NFTT：</span>
                <span class="num"> {{ nfttBalnceOf }}</span>
              </div>
            </div>

            <div class="MyadddizhiBox jcc">
              <div class="connect jcsb" v-if="!MyAddress">
                <span>连接钱包</span>
                <i class="el-icon-arrow-right"></i>
              </div>

              <div v-else class="MyAddress">{{ MyAddress }}</div>
            </div>
          </div>

          <div
            class="newlyincreasedBox"
            v-for="(iten, index) in FunctionpageData"
            v-bind:key="index"
          >
            <div class="newlyincreased" @click="JumpQueryAbi(iten.url)">
              <li>
                <img :src="iten.img" alt="" /> {{ iten.name }}
                <span style="float:right;margin-top:0.5rem"
                  ><i class="el-icon-arrow-right"></i
                ></span>
              </li>
            </div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      show: false,
      MyAddress: "",
      FunctionpageData: [
        { img: require("../assets/img/Group1.png"), name: "首页", url: "/" },
        {
          img: require("../assets/img/Group3.png"),
          name: "邀请",
          url: "/invite"
        }
      ],
      nfttBalnceOf: 0
    };
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler() {
        this.show = false;
      }
    }
  },
  // 使用了keep-alive会导致van-popup 被改变回true
  activated() {
    this.LjieABI();
    this.show = false;
  },
  mounted() {
    this.LjieABI();
    this.getNFTTBalanceOf();
  },

  methods: {
    fzdzhiA() {
      Toast({
        message: "复制成功",
        className: "yellow"
      });
    },

    clickbroadside() {
      this.show = true;
    },

    LjieABI() {
      this.LinkBNB();
    },

    JumpQueryCg(e) {
      this.$router.push({
        path: e
        // query: {
        //   category: JSON.stringify(e),
        // },
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.slot {
  height: 5rem;
}
.Topbox {
  z-index: 999;
  position: absolute;
  top: 0;
  width: 100%;
  height: 5rem;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.TopbuttonLeft {
  img {
    width: 8rem;
  }
}
.TopbuttonRi {
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      margin-right: 1rem;
    }
  }
}
.TopbuttonRi img {
  width: 3rem;
  height: 3rem;
}

.LogoBox {
  height: 29.8rem;
  padding-top: 3rem;
  /* background: salmon; */
}
.LogoImg {
  width: 28.7rem;
  height: 28.7rem;
  margin: 0 auto;
}
.LogoImg img {
  width: 100%;
  height: 100%;
}
.WalletAddressBox {
  height: 7rem;
  padding-bottom: 0.7rem;
}
.WalletAddressBoxLeft {
  width: 50%;
  height: 7rem;

  float: left;
}
.WalletAddressBoxright {
  width: 50%;
  height: 7rem;

  float: left;
}
.WalletAddressBox img {
  width: 7rem;
  height: 7rem;
  float: right;
  /* float: left; */
}
.WalletAddressBoxright li {
  float: left;
  line-height: 7rem;
  font-size: 2.4rem;
  font-weight: 700;
}
.WalletDisplayBox {
  height: 5rem;
  padding-left: 2.4rem;
  padding-right: 2.4rem;
}
.WalletDisplay {
  height: 5rem;
  border-radius: 40px;
  background: rgba(42, 130, 228, 1);
  box-shadow: 0px 20px 30px 0px rgba(25, 28, 50, 0.1);
}
.WalletDisplay li {
  text-align: center;
  line-height: 5rem;
  font-size: 24px;
  font-weight: 500;
  color: rgba(204, 204, 204, 1);
}
.PollContainerBox {
  height: 28.8rem;
  /* background: silver;  */
}
.PollContainer {
  padding-left: 2.4rem;
  padding-right: 2.4rem;
  padding-top: 4.6rem;
  padding-bottom: 6.6rem;
  height: 17.6rem;
}
.PollContainerData {
  border-radius: 2.5rem;
  height: 17.6rem;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25),
    0px 0.2rem 0.4rem 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4rem);
}
.broadsideLogo {
  padding-top: 2rem;
  padding-bottom: 2rem;
  height: 11rem;
}
.broadsideLogoImg {
  width: 11rem;
  height: 11rem;

  margin: 0 auto;
}
.broadsideLogoImg img {
  width: 100%;
  height: 100%;
}
.FunctionpageBox {
  padding-top: 2rem;
  height: 3.3rem;
}
.Functionpage {
  height: 3.3rem;
  border-radius: 40px;
  background: rgba(42, 130, 228, 1);
  box-shadow: 0px 20px 30px 0px rgba(25, 28, 50, 0.1);
}
.Functionpage li {
  text-align: center;
  line-height: 3.3rem;
  font-size: 2rem;
  color: rgba(255, 255, 255, 1);
}
.newlyincreasedBox {
  padding-top: 2rem;
  .el-icon-arrow-right {
    color: #999999;
    font-weight: bold;
  }
}

.newlyincreased {
  height: 3.2rem;
}
.newlyincreased li {
  font-size: 1.6rem;
  color: #fff;
}
.newlyincreased img {
  width: 2.1rem;
  height: 2.1rem;
  padding-right: 1.2rem;
  position: relative;
  top: 0.5rem;
}
.SideContainerBox {
  padding: 2rem;
  height: 100%;
  box-sizing: border-box;
  background: #343434;
}

.SideAddressBox {
  padding: 1rem;
  background: #111111;
  border-radius: 0.5rem;
  border: 1px solid #dbd308;
}
.SideAddressBoxYe {
  /* height: 4.8rem; */
  .Myyue {
    line-height: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .token {
      font-size: 1.4rem;
      color: #fff;
    }
    .num {
      width: 11rem;
      font-size: 2rem;
      font-weight: bold;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .level {
      float: right;
      font-size: 1.5rem;
      color: #fff;
    }
  }
}

.MyadddizhiBox {
  height: 5rem;
  background: #dbd308;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #dbd308;
  margin-top: 2rem;
  .connect {
    width: 100%;
    padding: 0 1rem;
    span {
      font-size: 1.5rem;
      color: #333333;
    }
    .el-icon-arrow-right {
      color: #333333;
      font-weight: bold;
      font-size: 1.5rem;
    }
  }
  .MyAddress {
    font-size: 1.5rem;
    word-break: normal;
    padding: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.LiTio {
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 2rem;
  color: #dbd308;
}
.MyadddizhiBoxLeftButton {
  width: 10rem;
  height: 4rem;
}
.MyadddizhiBoxLeftButton li {
  line-height: 4rem;
  font-size: 16px;
  color: #fff;
}
</style>
