<template>
  <section>
    <div class="title">
      <BorderTitle><slot></slot></BorderTitle>
    </div>

  <div v-if="newSong">
      <NewSong
      :newSong="newSong"
      @translate-music="$emit('translate-music', $event)"
      @update:music="$emit('update:music', $event)"
      :paused="paused"
      :currentMusic="currentMusic"
      :currentIndex="currentIndex"
    ></NewSong>
  </div>
  <div v-else>
    <van-loading size="24px">加载中...</van-loading>


  </div>
  </section>
</template>

<script>
import BorderTitle from "./BorderTitle";
import NewSong from "./SongItem";
export default {
  components: {
    BorderTitle,
    NewSong,
  },
  props: ["newSong", "paused","currentMusic","currentIndex"],
};
</script>




<style lang="scss">
.playtitlediv {
  .playlist {
    display: flex;

    li {
      width: 100%;
      border-bottom: 1px solid grey;
    }
  }
}
</style>