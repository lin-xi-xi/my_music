<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__fadeInUp"
    leave-active-class="animate__animated animate__fadeOutDown"
  >
    <div v-if="currentMusic1">
      <audio
        v-if="currentMusic"
        :src="
          'https://music.163.com/song/media/outer/url?id=' + currentMusic.id ||
          currentMusic.al.id + '.mp3'
        "
        @timeupdate="updateTime"
        @canplay="getDuration"
        controls
        @play="get"
        @ended="ended"
        autoplay
        ref="audio"
      ></audio>
      <transition
        name="custom-classes-transition"
        enter-active-class="animate__animated animate__fadeInUp"
        leave-active-class="animate__animated animate__fadeOutDown"
      >
        <div
          class="play-bar"
          v-if="(chanegbig && currentMusic) || currentMusic.al"
        >
          <div class="audio-left" @click.prevent="chanegbig = false">
            <div class="playicom">
              <img
                :src="currentMusic.picUrl || currentMusic.al.picUrl"
                alt=""
                :class="{ active: flag == '播放' }"
              />
            </div>
          </div>
          <div class="audio">
            <div class="audio-top">
              <div>{{ timer }}</div>
              <div class="prograss" ref="ul">
                <ul>
                  <li></li>
                  <i :style="{ width: left + 2 + 'px' }"></i>
                  <span
                    :style="{ left: left + 'px' }"
                    ref="span"
                    @touchmove="touchmove"
                  ></span>
                </ul>
              </div>
              <div>{{ duration }}</div>
              <div class="icon" @click.prevent="changepaused">
                <img
                  src="../assets/images/play.png"
                  alt=""
                  v-if="flag == '暂停'"
                />
                <img
                  src="../assets/images/pause.png"
                  alt=""
                  v-if="flag == '播放'"
                />
                <!-- <span :style="" v-show="flag == '暂停'"> </span> -->
                <!-- <span :style="" v-show="flag == '播放'" class="play"> </span> -->
              </div>
            </div>
            <div class="audio-title">
              <div v-if="!currentMusic.al">
                {{ currentMusic.name }}--{{ currentMusic.song.artists[0].name }}
              </div>
              <div v-else>
                {{ currentMusic.al.name }}--{{ currentMusic.ar[0].name }}
              </div>
            </div>
          </div>
        </div>
      </transition>
      <transition
        name="custom-classes-transition"
        enter-active-class="animate__animated animate__fadeInDown"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <!-- :style="{ backgroundImage: 'url(' + currentMusic.picUrl + ')' }" -->
        <div class="bigPlay" v-if="!chanegbig">
          <div>
            <div
              v-if="!currentMusic.picUrl"
              class="musicbg"
              v-bind:style="{
                backgroundImage: `url(${currentMusic.al.picUrl})`,
              }"
            ></div>
            <div
              v-else
              class="musicbg"
              v-bind:style="{
                backgroundImage: `url(${currentMusic.picUrl})`,
              }"
            ></div>
          </div>

          <bigPlayHeader
            :currentMusic="currentMusic"
            @changeClick="chanegbig = true"
          ></bigPlayHeader>
          <template>
            <bigPlayShowLyric
              v-if="isShowLyric"
              @toggle-show-lyric="isShowLyric = !isShowLyric"
              :currentMusic="currentMusic"
              :showtime="showtime"
              :audio="audio"
            ></bigPlayShowLyric>
            <bigPalyChart
              v-else
              @toggle-show-lyric="isShowLyric = !isShowLyric"
              :currentMusic="currentMusic"
              :state="flag"
            ></bigPalyChart>
          </template>
          <bigPlayFooter
            :duration="duration"
            :timer="timer"
            :currentTime="showtime"
            :durationTime="sum"
            :state="flag"
            :playlist="playlist"
            :currentIndex="currentIndex"
            @clickPlay="clickPlay"
            @clickPause="clickPause"
            @updateCurrentTime="updateCurrentTime"
            @clicknext="clicknext"
            @clickpre="clickpre"
            @playlistmusic="playlistmusic"
            @changeRandom="changeRandom"
          ></bigPlayFooter>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
// 处理边界情况 要拿dom 的属性

import bigPlayFooter from "../views/bigPlay/bigPlayFooter";
import bigPlayHeader from "../views/bigPlay/bigPlayHeader";
import bigPlayShowLyric from "../views/bigPlay/bigPlayShowLyric";
import bigPalyChart from "../views/bigPlay/bigPalyChart";

export default {
  props: ["currentMusic1"],
  components: {
    bigPlayFooter,
    bigPlayHeader,
    bigPlayShowLyric,
    bigPalyChart,
  },
  created() {
    this.currentMusic = this.currentMusic1;
  },
  data() {
    return {
      audio: "",
      currentMusic: "",
      currentIndex: "",
      playlist: "",
      isShowLyric: false,
      paused: null,
      currentSong: null,
      currentTime: 0,
      minuter: 0,
      timer: 0,
      sum: 0,
      showtime: 0,
      duration: 0,
      left: 0,
      flag: "播放",
      chanegbig: true,
      random: true,
      // changeleft:0,
    };
  },

  watch: {
    flag: function (e) {
      this.$emit("updatePaused", {
        paused: e,
        id: this.currentMusic.id || this.currentMusic.al.id,
      });
    },
    currentMusic1: function () {
      this.currentMusic = this.currentMusic1[1];
      this.playlist = this.currentMusic1[0];
      this.currentIndex = this.currentMusic1[2];
    },
  },
  methods: {
    changeRandom: function (e) {
      console.log(e);
      this.random = e;
    },
    playlistmusic: function (e) {
      this.currentMusic = e.item;
      this.currentIndex = e.index;
      this.$emit("update:music", {
        item: e.item,
        index: e.index,
      });
    },
    clickpre: function () {
      this.playPre();
    },
    clicknext: function () {
      this.playNext();
    },
    clickPlay: function (e) {
      // console.log(e)
      this.flag = e;
      console.log(this.$refs.audio);
      this.$refs.audio.pause();
    },
    clickPause: function (e) {
      this.flag = e;

      this.$refs.audio.play();
    },
    updateCurrentTime: function (e) {
      console.log(e);
      this.$refs.audio.currentTime = e;
    },
    touchmove: function (e) {
      this.$refs.audio.currentTime =
        ((e.touches[0].pageX - this.$refs.ul.offsetLeft) *
          this.$refs.audio.duration) /
        200;
    },
    changepaused: function () {
      if (this.flag == "暂停") {
        this.flag = "播放";
        this.$refs.audio.play();
        return;
      }
      if (this.flag == "播放") {
        this.flag = "暂停";
        this.$refs.audio.pause();

        return;
      }
    },
    ended() {
      console.log("结束了");

      this.playNext();
    },

    playNext: function () {
      console.log("下一曲");
      let index = this.calculateNext();
      this.$emit("update:music", {
        item: this.playlist[index],
        index,
      });
    },
    playPre: function () {
      console.log("上一曲");
      let index = this.calculatepre();
      this.$emit("update:music", {
        item: this.playlist[index],
        index,
      });
    },
    // 计算上一曲的方法
    calculatepre: function () {
      // 根据当前播放模式 随机 单曲循环 顺序 顺序循环
      let preIndex;
      if (this.currentIndex > 0) {
        preIndex = this.currentIndex - 1;
      } else if (this.currentIndex <= 0) {
        preIndex = 9;
        console.log("开始变为9");
      }
      return preIndex;
    },

    // 计算下一曲的方法
    calculateNext: function () {
      // 根据当前播放模式 随机 单曲循环 顺序 顺序循环
      let nextIndex;

      if (this.random) {
        if (this.currentIndex < this.playlist.length - 1) {
          nextIndex = this.currentIndex + 1;
        } else if (this.currentIndex >= this.playlist.length - 1) {
          nextIndex = 0;
          console.log("开始变为零");
        }
      } else {
        let a = this.Random(0, this.playlist.length - 1);
        if (a == this.currentIndex) {
          this.playNext();
          return;
        } else {
          if (this.currentIndex < this.playlist.length - 1) {
            nextIndex = a;
          } else if (this.currentIndex >= this.playlist.length - 1) {
            nextIndex = 0;
          }
          console.log(a);
        }
        console.log(a);
      }

      return nextIndex;
    },
    // 计算随机生成一个数据函数
    Random(start, end) {
      return Math.floor(Math.random() * (end - start + 1) + start);
    },

    updateTime(e) {
      this.audio = this.$refs.audio;
      if (this.showtime == this.sum) {
        this.currentMusic = this.currentMusic1[1];
        this.playlist = this.currentMusic1[0];
        this.currentIndex = this.currentMusic1[2];
        console.log("时间到了");
      }
      this.showtime = e.target.currentTime;
      this.left = (this.showtime * 200) / this.sum;
      this.currentTime = Math.floor(e.target.currentTime);
      this.minuter = Math.floor(this.currentTime / 60);
      this.minuter = this.minuter < 10 ? "0" + this.minuter : this.minuter;
      this.currentTime =
        this.currentTime > 60 ? this.currentTime % 60 : this.currentTime;
      this.currentTime =
        this.currentTime < 10 ? "0" + this.currentTime : this.currentTime;
      this.timer = this.minuter + ":" + this.currentTime;
      //获取audio当前播放时间
    },
    get() {
      this.currentTime = this.$refs.audio.currentTime / 60;
      console.log(this.$refs.audio.currentTime / 60);
      //获取audio当前播放时间
    },
    getDuration() {
      console.log(this.$refs.audio.duration / 60); //此时可以获取到duration
      this.duration = this.$refs.audio.duration % 60;
      this.duration =
        Math.floor(this.$refs.audio.duration % 60) < 10
          ? "0" + Math.floor(this.$refs.audio.duration % 60)
          : Math.floor(this.$refs.audio.duration % 60);
      this.sum = this.$refs.audio.duration;

      this.duration =
        "0" + Math.floor(this.$refs.audio.duration / 60) + ":" + this.duration;
    },
  },
};
</script>

<style lang="scss">
.bigPlay {
  position: absolute;

  overflow: hidden;

  right: 0;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  width: 100vw;
  height: 100vh;
  bottom: 0;

  .musicbg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    -webkit-filter: blur(20px);
    filter: blur(20px);
    -webkit-transform: scale(1.5);
    -ms-transform: scale(1.5);
    transform: scale(1.5);
    // background-image: ;

    &:after {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      content: " ";
      background-color: rgba(0, 0, 0, 0.25);
    }
  }
}
.play-bar {
  background-color: white;
  position: fixed;
  display: flex;
  justify-content: center;

  bottom: 0;
  left: 0;
  width: 100%;
}
.audio {
  justify-content: center;

  .audio-top {
    margin-top: 2px;
    display: flex;
    .icon {
      margin-left: 10px;
      vertical-align: center;
      img {
        display: inline-block;
        width: 24px;
        height: 24px;
        // margin-right:px;
        // transform: scale(2);
      }
    }
    div {
      font-size: 14px;
      color: #888;
    }
    .prograss {
      margin-top: 7.4px;
      margin: 7.4px 5px;
      margin-top: 5px;

      ul {
        position: relative;
        i {
          z-index: 999;
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          height: 5px;
          border-radius: 15px;
          background-color: red;
        }
        li {
          width: 200px;
          height: 5px;
          border-radius: 15px;
          background-color: #e6e6e8;
        }
        span {
          width: 8px;
          height: 8px;
          display: block;
          background-color: #d43c33;
          border-radius: 50%;
          position: absolute;
          top: -1.5px;
          z-index: 999;
          // left: 20px;
        }
      }
    }
  }
  .audio-title {
    text-align: left;
    font-size: 12px;
    color: #888;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: normal;
  }
}

.playicom {
  img {
    vertical-align: baseline;
    margin-right: 7px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
}
.active {
  animation: run 6s linear 0s infinite;
}
audio {
  opacity: 0;
}
@keyframes run {
  from {
    transform-origin: center;
    transform: rotate(0deg);
  }
  to {
    transform-origin: center;
    -webkit-transform: rotate(360deg);
  }
}
</style>