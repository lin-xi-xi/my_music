<template>
  <div>
    <Searchtop
      @oninput="oninput"
      @error="error"
      :paused="paused"
      :currentMusic="currentMusic"
      :currentIndex="currentIndex"
      :historyclicksearchSong="searchSong"
      @translate-music="$emit('translate-music', $event)"

    ></Searchtop>

    <Hotsearchlist
      v-if="!changeoninput"
      @searchDate="searchDate"
      @clickSeachsong="clickSeachsong"
    ></Hotsearchlist>
    <div v-if="date">
      <SearchHistory v-if="!changeoninput"
      @clicksearchSong="clicksearchSong"
      ></SearchHistory>
    </div>
    <div v-else>
      <img src="../assets/images/loading.gif" alt="">加载中
    </div>
  </div>
</template>

<script>
import Searchtop from "../components/Searchtop";
import Hotsearchlist from "../components/hotsearch";
import SearchHistory from "../components/searchistory";
export default {
  components: {
    Searchtop,
    Hotsearchlist,
    SearchHistory,
  },
  props:["paused", "currentMusic", "currentIndex"],
  data() {
    return {
      changeoninput: "",
      state: "",
      date: "",
      searchSong:""
    };
  },
  methods: {
    searchDate: function (e) {
      
      this.date = e;
      console.log('开始打印，改变哈哈')
    },
    oninput: function (e) {
      console.log("e", e);
      this.changeoninput = e;
    },
    error: function (e) {
      this.state = e;
    },
    clicksearchSong:function(e){
      console.log(e)
      this.searchSong=e
    },
    clickSeachsong:function(e){
      console.log(e)
      this.searchSong=e

    }
  },
};
</script>

<style>
</style>