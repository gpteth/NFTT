export default {
  methods: {
    toWei(n) {
      return this.Web3.utils.toWei(n.toString(), "ether");
    },
    fromWei(n) {
      return this.Web3.utils.fromWei(n.toString(), "ether");
    },
    getImagePath(id) {
      // 根据图片的 ID 构建图片路径
      return require(`../assets/img/caishen${id}.png`);
    }
  }
};
