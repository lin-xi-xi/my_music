<template>
  <div class="musicPlaylist playlist_magrinTop">
    <div v-if="songitem && creator">
      <topNav :creator="creator"></topNav>
      <SongItem
        :hotSong="songitem"
        :paused="paused"
        @translate-music="$emit('translate-music', $event)"
        :currentMusic="currentMusic"
        :currentIndex="currentIndex"
      ></SongItem>
    </div>
    <div v-else>
      <loading></loading>
    </div>
    </div>
  
    
    <!-- <loading v-else></loading> -->

  <!-- api
   -->
  <!-- http://music.kele8.cn/playlist/detail?id=2819914042 -->
</template>

<script>
import loading from "../components/loading";
import topNav from "../components/musicListNav";
// import hotSongItem from "../components/hotSongItem";
import SongItem from "../views/SongItem";
export default {
  beforeRouteUpdate(to, from, next) {
    this.songitem = null;
    (this.creator = ""), (this.arr = []);
    this.getPost(to.params.id, (err, post) => {
      this.axios
        .get(`http://music.kele8.cn/playlist/detail?id=${this.$route.query.id}`)
        .then((response) => {
          console.log(response.data);
          this.creator = response.data.playlist;
          this.songitem = response.data.playlist.trackIds.splice(0, 20);
          this.songitem.forEach((element) => {
            this.arr.push(element.id);
          onsole.log(this.arr)
          });
          this.songitem = this.arr.join(",");
          this.axios
            .get(`http://music.kele8.cn/song/detail?ids=${this.songitem}`)
            .then((response) => {
              console.log('ss')
              this.songitem = response.data.songs;
            });
        });
      this.setData(err, post);
      next();
    });
  },
  components: { topNav, SongItem, loading },
  props: ["paused", "currentMusic", "currentIndex"],
  data() {
    return {
      creator: "",
      songitem: "",
      arr: [],
    };
  },
  watch: {
    "$route.query.id": function () {
      console.log(this.$route.query);
    },
  },
  created() {
    this.axios
      .get(`http://music.kele8.cn/playlist/detail?id=${this.$route.query.id}`)
      .then((response) => {
        console.log(response.data);
        this.creator = response.data.playlist;
        this.songitem = response.data.playlist.trackIds.splice(0, 20);
        this.songitem.forEach((element) => {
          this.arr.push(element.id);
        });
        this.songitem = this.arr.join(",");
        this.axios
          .get(`http://music.kele8.cn/song/detail?ids=${this.songitem}`)
          .then((response) => {
            console.log(response.data.songs);
            this.songitem = response.data.songs;
          });
      });
  },
};
</script>

<style lang="scss">
</style>