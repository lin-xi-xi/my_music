<template>
  <div>
    <div v-if="hotSong">
      <Hotlogo></Hotlogo>
      <!-- <hotSongItem :hotSong="hotSong"></hotSongItem> -->
      <SongItem
        :hotSong="hotSong"
        @translate-music="$emit('translate-music', $event)"
       
        :paused="paused"
        :currentMusic="currentMusic"
        :currentIndex="currentIndex"
      ></SongItem>
    </div>
      <div v-else>
      <loading></loading>
    </div>
  </div>
</template>

<script>
import Hotlogo from "../components/Hotlogo";
import SongItem from "../views/SongItem";
import loading from "../components/loading"
// import hotSongItem from "../components/hotSongItem";
export default {
  components: {
    Hotlogo,
    SongItem,
    loading
  },
  props: ["paused", "currentMusic", "currentIndex"],
  data() {
    return {
      hotSong: "",
      arr: [],
    };
  },
  created() {
    this.axios.get("http://music.kele8.cn/top/list?idx=1").then((response) => {
      this.hotSong = response.data.playlist.trackIds.splice(0, 20);
      this.hotSong.forEach((element) => {
        this.arr.push(element.id);
      });
      this.hotSong = this.arr.join(",");
      this.axios
        .get(`http://music.kele8.cn/song/detail?ids=${this.hotSong}`)
        .then((response) => {
          console.log(response.data.songs);
          this.hotSong = response.data.songs;
        });
    });
  },
};
</script>

<style>
</style>