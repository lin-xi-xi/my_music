<template>
  <div id="app">
    <!-- <logo></logo> -->
    <router-view
      v-if="!$route.meta.isShow"
       @translate-music="currentMusic = $event"
      :paused="paused"
      :currentMusic="currentMusic1"
      :currentIndex="currentIndex"
    ></router-view>
    <homenav
      v-if="$route.meta.isShow"
      @translate-music="currentMusic = $event"
      :paused="paused"
      :currentMusic="currentMusic1"
      :currentIndex="currentIndex"
    ></homenav>
    <!-- <router-view @translate-music="currentMusic = $event" /> -->
    <Play
    
      :currentMusic1="currentMusic"
      @updatePaused="updatePaused"
      @update:music="
        currentMusic1 = $event.item;
        currentIndex = $event.index;
      "
    ></Play>
  </div>
  <!-- @updatePaused="$emit('updatePaused', $event)" -->
</template>
<script>
import homenav from "./components/homeNav";

// import play from './views/Play'
import Play from "./views/Play.vue";
export default {
  created() {
    this.path=this.$route.path
  },
  watch:{
    '$route.path':function(){
      this.path=this.$route.path
    }
    
    
  },
  components: { homenav, Play },
  data() {
    return {
      paused: null,
      currentMusic: null,
      currentMusic1: null,
      playlist: [],
      currentIndex: "",
      path:''
    };
  },

  methods: {
    updatePaused: function (e) {
      this.paused = e;
    },
  },
};
</script>

<style scoped lang="scss">
@import "./assets/css/reset.css";
.playlistactive {
  display: block;
}
</style>
