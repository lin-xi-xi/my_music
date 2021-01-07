<template>
  <div>
    <div
      class="PlayFullChart"
      @click="$emit('toggle-show-lyric')"
      v-if="currentMusic"
    >
      <div class="PlayFullChart_top">
        <span></span>
        <img
          src="../../assets/images/needle-ip6.png"
          alt=""
          :class="{
            needleicoPlay: state == '播放',
            needleico: state == '暂停',
          }"
        />
      </div>
      <div class="PlayFullChart_main">
        <div class="PlayFullChart_bg">
          <div class="PlayFullChart_mark"></div>

          <div class="PlayFullChart_bg_img"></div>
          <div class="PlayFullChart_cahngpian">
            <img
              src="../../assets/images/music_bg.png"
              alt=""
              :class="{ musicmoveactive: state == '暂停' }"
            />
          </div>
        </div>
        <div class="PlayFullChart_img">
          <img
            :src="currentMusic.picUrl || currentMusic.al.picUrl"
            alt=""
            :class="{ musicmoveactive: state == '播放' }"
          />
        </div>
      </div>
      <div class="PlayFullChart_footer">
        <ul>
          <li><img src="../../assets/images/shouzang.png" alt="" /></li>
          <li><img src="../../assets/images/down.png" alt="" /></li>
          <li><img src="../../assets/images/cailing.png" alt="" /></li>
          <li><img src="../../assets/images/pinglun.png" alt="" /></li>
          <li><img src="../../assets/images/other.png" alt="" /></li>
        </ul>
      </div>
    </div>
    <div v-else>
      <loading></loading>
    </div>
  </div>
</template>

<script>
import loading from "../../components/loading";
export default {
  components: { loading },
  data() {
    return {};
  },
  props: ["currentMusic", "state"],
};
</script>

<style lang="scss">
@import url("../../assets/css/bigPalyChart.css");
@keyframes pauseall {
  0% {
    transform-origin: top center;
    transform: rotate(0deg) translateY(0px) translateX(0px);
  }
  100% {
    transform-origin: top center;
    transform: rotate(-30deg) translateY(-23px) translateX(5px);
  }
}
@keyframes playall {
  0% {
    transform-origin: top center;
    transform: rotate(-30deg) translateY(-23px) translateX(5px);
  }
  100% {
    transform-origin: top center;
    transform: rotate(0deg) translateY(0px) translateX(0px);
  }
}
.musicmoveactive {
  animation: 12s musicmove linear infinite;
}
.needleico {
  animation: 1s pauseall linear;
  animation-fill-mode: forwards;
}
.needleicoPlay {
  animation: 1s playall linear;
  animation-fill-mode: forwards;
}

@keyframes musicmove {
  0% {
    transform-origin: center;
    transform: rotate(0deg);
  }
  100% {
    transform-origin: center;
    transform: rotate(360deg);
  }
}
</style>