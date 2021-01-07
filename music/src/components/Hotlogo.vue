<template>
  <div>
    <div class="hotlogotop">
      <div class="hotlogo">
        <div class="hoticon"></div>
        <div class="hottime"><span>跟新时间:12月12日</span></div>
      </div>
    </div>

  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.hotlogotop {
  margin-top: 120px;
  display: flex;
  position: relative;
  padding-top: 38.9%;
  display: flex;
  overflow: hidden;
  background: url("../assets/images/hot_music_bg.jpg") no-repeat;
  background-size: contain;
  &:after {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .hotlogo {
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    box-sizing: border-box;
    .hoticon {
      width: 142px;
      height: 67px;
      background: url("../assets/images/index_icon.png") -24px -30px;
      background-size: 166px 97px;
      //   transform: scale(0.5);
    }
    .hottime {
      color: white;
      margin-top: 10px;
      color: hsla(0, 0%, 100%, 0.8);
      font-size: 12px;
    }
  }
}
</style>