<template>
  <div>
    <div class="songItem" v-if="hotSong">
      <ul
       
      v-for="(item, index) in hotSong" :key="index">
        <span
          v-if="index < 9"
          class="sorting"
          :class="{ sortingactive: index < 3 }"
          >0{{ index + 1 }}</span
        >
        <span v-else class="sorting">{{ index + 1 }}</span>
        <li class="song-item" v-if="hotSong[index].name">
          <div>
            <h5 v-if="hotSong">{{ hotSong[index].name }}</h5>
            <p>
              <i :style="imgurl"></i>
              <span v-for="(artist, index2) in hotSong[index].ar" :key="index2">
                <template v-if="index2"> / </template>{{ artist.name }} </span
              ><span>- {{ hotSong[index].al.name }}</span>
            </p>
          </div>
          <div class="icon">
            <span
              v-if="changePaused && hotSong[index].id == changePaused.id"
              class="playing"
              :class="{ paused: changePaused && changePaused.paused == '暂停' }"
            >
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </span>
            <span :style="imgurl2" v-else></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hotSong"],
  data() {
    return {
      changePaused: null,
      imgurl: {
        background:
          "url(" + require("../assets/images/index_icon.png") + ")no-repeat",
        backgroundSize: "166px 97px",
      },
      imgurl2: {
        background:
          "url(" +
          require("../assets/images/index_icon.png") +
          ")no-repeat -24px 0",
        backgroundSize: "166px 97px",
      },
    };
  },
};
</script>

<style lang="scss">
.songItem {
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    .sorting {
      display: block;
      width: 30px;
      font-size: 17px;
      margin-left: 15px;
      color: #999;
    }
  }
  .sortingactive {
    color: #df3436 !important;
  }
}
</style>