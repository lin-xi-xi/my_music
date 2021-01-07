<template>
  <div v-if="creator">
    <div class="playlist_header" >
      <div
        class="plybg"
        v-bind:style="{ backgroundImage: `url(${creator.coverImgUrl})` }"
      ></div>
      <!-- <img :src=".coverImgUrl" alt=""> -->

      <div class="plhead_warp">
        <div class="plhead_warp_left">
          <img :src="creator.coverImgUrl" alt="" />
          <span class="music_creatoricon">歌单</span>
          <i class="bofan_num"> {{ creator.playCount | formatPlayCount }}</i>
        </div>
        <div class="plhead_warp_right">
          <h2 class="plhead_warp_title">{{ creator.name }}</h2>

          <div class="plhead_warp_autor">
            <a href="#">
              <div class="my-autor">
                <img :src="creator.creator.avatarUrl" alt="" />
                <span></span>
                <i>{{ creator.creator.nickname }}</i>
              </div>
            </a>
          </div>
        </div>
      </div>
      
    </div>
    <h3 class="u-stitle">歌单列表</h3>
    
  </div>
</template>

<script>
export default {
  props: ["creator"],
  filters: {
    formatPlayCount: function (value) {
      return (value / 10000).toFixed(1) + "万";
    },
  },
};
</script>
<style lang="scss">
@import url("../assets/css/playlist_header.css");
.playlist_magrinTop {
  margin-top: 215px;

}
.u-stitle {
  position: fixed;
  width: 100%;
  top: 186px;
  height: 23px;
  line-height: 23px;
  padding: 0 10px;
  font-size: 12px;
  color: #666;
  z-index: 5;
  background-color: #eeeff0;
}
</style>