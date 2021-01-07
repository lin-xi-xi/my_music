<template>
  <div class="logo">
    <div class="logoleft">
      <span :style="imgurl"></span>
    </div>
    <div class="logoright">
      <span>下载APP</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgurl: {
        background: "url(" + require("../assets/images/topbar.png") + ")no-repeat 0 -19px",
      },
      
    };
  },
};
</script>

<style lang="scss">
@import "../assets/css/logo.scss";
</style>