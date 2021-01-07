<template>
  <div class="recomment">
    <lunbo></lunbo>

    <div>
      <div v-if="recommments&&!loading1">
        <RecommmentPlayList :currentRecommments="currentRecommments"
          >推荐歌单</RecommmentPlayList
        >
      </div>
       <div v-if="loading1">
         
         <img src="../assets/images/loading.gif" alt=""><span>在加载中...</span>
         <!-- <van-loading type="spinner" size="24px" default>加载中...</van-loading> -->
        <!-- <van-loading size="24px"> -->
      </div>
  
      <div v-if="newSong&&!loading">
        <RecommmentNewMusic
          @translate-music="$emit('translate-music', $event)"
          :newSong="newSong"
          :paused="paused"
          :currentMusic="currentMusic"
          :currentIndex="currentIndex"
          >最新音乐</RecommmentNewMusic
        >
      </div>
      <div v-if="loading&&!loading1">
        <img src="../assets/images/loading.gif" alt=""><span>在加载中...</span>
      </div>
    </div>
  </div>
</template>
<script>
import lunbo from "../components/lunbo";

import RecommmentPlayList from "./RecommmentPlayList";
import RecommmentNewMusic from "./RecommmentNewMusic";
export default {
  props: ["paused", "currentMusic", "currentIndex"],
  components: {
    RecommmentPlayList,
    RecommmentNewMusic,

    lunbo,
  },
  data() {
    return {
      recommments: [],
      newSong: [],
      loading:true,
      loading1:true
    };
  },
  methods: {
    translatemusic: function () {
      console.log("chu");
    },
  },
  computed: {
    currentRecommments: function () {
      return this.recommments.slice(0, 6);
    },
  },
  created() {
    this.loading1=true
    this.axios.get("http://music.kele8.cn/personalized").then((response) => {
      console.log(response.data.result);
      this.recommments = response.data.result;
      this.loading1=false
      
    }),
    
      this.axios

        .get("http://music.kele8.cn/personalized/newsong")
        .then((response) => {
          this.loading=true
          console.log(response.data.result);
          this.newSong = response.data.result;
          this.loading=false
        });
  },
};
</script>

<style>
</style>
