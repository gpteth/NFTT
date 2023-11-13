<template>
  <div id="app">
    <TopSide></TopSide>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    this.LinkBNB();
  }
};
</script>

<style lang="less">
div {
  box-sizing: border-box;
}
html {
  font-size: 2.6666666665vw !important;
}

.yellow {
  background: yellow;
  color: #000;
  font-size: 1.5rem;
}

// .bindDialog {
//   background: #343434 !important;
//   border: 2px solid #dbd308;
//   border-radius: 0.5rem;
//   .el-textarea__inner {
//     background: #000000;
//     border: 0;
//   }
//   .el-dialog__header {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     .el-dialog__headerbtn {
//       width: 3rem;
//       height: 3rem;
//       background: #fff;
//       border-radius: 50%;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       .el-dialog__close {
//         font-weight: bold;
//       }
//     }
//   }
//   .el-dialog__title {
//     text-align: center;
//     color: #fff;
//     font-size: 1.5rem;
//   }
//   .el-dialog__footer {
//     .dialog-footer {
//       width: 100%;
//       display: flex;
//       justify-content: space-between;
//       .btn {
//         width: 48%;
//         height: 5rem;
//         background: #000000;
//         border-radius: 0.5rem;
//         font-size: 1.5rem;
//         font-weight: bold;
//       }
//       .btn1 {
//         border: 1px solid #999999;
//         color: #999999;
//       }
//       .btn2 {
//         border: 1px solid #dbd308;
//         color: #dbd308;
//       }
//     }
//   }
// }
body {
  margin: 0px;
  background: #000000;

  /* height: 100vh; */
  /* height: 100vh; */
  /* display: flex; */
}
.bindersAddrs {
  .van-button--danger {
    background: linear-gradient(67deg, #0ac38a 0%, #0d8cb4 100%);
  }
}
.bind {
  z-index: 999999;
}
.container {
  opacity: 1;
  /* border-radius: 4rem; */
}
div {
  word-break: break-all;
}
p {
  display: block;
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
li {
  list-style: none;
  /* word-wrap:break-word !important;  */
}
ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
}

.SellingBulletFramesBox .van-popup--center {
  border-radius: 0.8rem !important;
}
.PKSbangd .van-popup--center {
  border-radius: 0.8rem !important;
}
</style>
