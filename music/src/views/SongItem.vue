<template>
<div>
    <div class="songItem">
    <div class="songItem" v-if="hotSong && !newSong">
      <ul v-for="(item, index) in hotSong" :key="index">
        <div v-if="!hotSong[index].name" class="samllloading">
          <img src="../assets/images/loading.gif" alt="" />
        </div>
        <template v-if="hotSong[index].name">
          <span
            v-if="index < 9"
            class="sorting"
            :class="{ sortingactive: index < 3 }"
            >0{{ index + 1 }}</span
          >
          <span v-else class="sorting">{{ index + 1 }}</span>
        </template>

        <li
          class="song-item"
          @click="clickPaused(index, item.id)"
          v-if="hotSong[index].name"
        >
          <div class="song_item_center">
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
              :class="{
                paused: changePaused && changePaused.paused == '暂停',
              }"
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
    <ul v-for="(item, index) in newSong" :key="index">
      <div v-if="!newSong[index].name" class="samllloading">
        <img src="../assets/images/loading.gif" alt="" />
      </div>
      <li class="song-item" @click="clickPaused(index, item.id)">
        <div class="song_center">
          <h5>{{ newSong[index].name }}</h5>
          <p>
            <i :style="imgurl"></i>
            <span
              v-for="(artist, index2) in newSong[index].song.artists"
              :key="index2"
            >
              <template v-if="index2"> / </template>{{ artist.name }} </span
            ><span>- {{ newSong[index].name }}</span>
          </p>
        </div>
        <div class="icon">
          <span
            v-if="changePaused && newSong[index].id == changePaused.id"
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
  <div class="none_more" v-if="newSong||hotSong">没有更多~</div>
</div>
</template>

<script>
export default {
  props: ["newSong", "paused", "currentMusic", "currentIndex", "hotSong"],

  methods: {
    clickPaused: function (index, id) {
      this.changePaused = { paused: "播放", id: id };
      if (this.hotSong) {
        console.log("开始点击");
        // this.changePaused = { paused: "播放", id: id };
        this.$emit("translate-music", [
          this.hotSong,
          this.hotSong[index],
          index,
        ]);
      } else if (this.newSong) {
       

        this.$emit("translate-music", [
          this.newSong,
          this.newSong[index],
          index,
        ]);
      }
    },
  },
  watch: {
    currentIndex: function () {
      if (this.hotSong) {
      
        this.changePaused.id = this.hotSong[this.currentIndex].al.id;
        this.$emit("translate-music", [
          this.hotSong,
          this.hotSong[this.currentIndex],
          this.currentIndex,
        ]);
      } else {
        this.changePaused.id = this.newSong[this.currentIndex].id;
        this.$emit("translate-music", [
          this.newSong,
          this.newSong[this.currentIndex],
          this.currentIndex,
        ]);
      }
    },
    paused: function () {
      this.changePaused = this.paused;
    },
  },

  data() {
    return {
      id: "",
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
.none_more{
  display: block;
  text-align: center;
  font-size: 13px;
  color: #999;
  line-height: 35px;
}
.samllloading {
  position: absolute;
  left: 0;
}
.song_center {
  width: 600px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sortingactive {
  color: #df3436 !important;
}
.songItem {
  .sorting {
    display: block;
    width: 30px;
    font-size: 17px;
    margin-left: 15px;
    color: #999;
    line-height: 54px;
  }
  ul {
    display: flex;
    width: 90vw;
    li {
      margin-left: 45px;
      width: 90vw;
      width: 100vw;
      height: 54px;
      padding: 6px 0px;
      // margin-left: 10px;
      margin-left: 10px;
      border-bottom: 1px solid #dcdada72;
      display: flex;
      justify-content: space-between;

      h5 {
        width: 280px;
        // width: 300px;
        margin-right: 20px;
        display: block;
        font-size: 17px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
        font-weight: normal;
      }
      p {
        width: 260px;
        display: flex;
        align-items: center;
        // margin-right: 20px;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
        i {
          display: inline-block;
          width: 14px;
          height: 8px;
          margin-right: 4px;
          background-size: 166px 97px;
          vertical-align: bottom;
        }
        span {
          font-size: 12px;
          color: #888;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: normal;
          font-weight: normal;
          overflow: hidden;
        }
        span:nth-child(2) {
          padding-right: 3px;
        }
        span:nth-child(3) {
          padding-left: 3px;
        }
      }

      .icon {
        float: right;
        height: 100%;
        line-height: 54px;
        vertical-align: center;
        margin-right:19px;
        // margin-right: 5px;

        .playing {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: 11px;
          // margin-top: 11px;

          i {
            width: 2px;
            height: 25px;
            background-color: #d43c33;
            background-image: linear-gradient(#b879ef, #e367d8);
            // display: inline-block;
            transform-origin: center bottom;

            animation: playing 0.6s linear -0.2s infinite alternate-reverse;

            &:first-of-type {
              animation-delay: 0s;
            }
            &:nth-child(3) {
              animation-delay: -0.2s;
            }
            &:nth-child(2) {
              animation-delay: -0.4s;
            }
            &:last-of-type {
              animation-delay: -0.6s;
            }
          }
          &.paused {
            i {
              animation-play-state: paused;
            }
          }
        }

        span {
          display: inline-block;
          width: 22px;
          height: 22px;

          background-position: -24px 0;
          // animation: run 6s linear 0s infinite;
        }
      }
    }
  }
}
@keyframes playing {
  from {
    // height: 50px;
    transform: scaleY(1);
  }
  to {
    // height: 10px;
    transform: scaleY(0.2);
  }
}
</style>