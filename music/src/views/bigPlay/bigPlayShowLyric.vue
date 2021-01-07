<template>
  <div>
    <div
      class="PlayFullLyric"
      @click="$emit('toggle-show-lyric')"
      v-if="!arr.length == 0"
      ref="divplay"
    >
      <div class="Lyric_box">
        <div
          class="Lyric_box_ul"
          @touchmove="touchmove"
          @touchstart="touchstart"
          @touchend="touchend"
          :style="{ marginTop: margintop + 'px' }"
        >
          <ul>
            <li
              v-for="(item, index) in arr"
              :key="index"
              ref="li"
              :class="{
                playLyricActive:
                  isindex == index ||
                  isindex == index + 1 ||
                  isindex == index - 1,
              }"
            >
              <span>
                {{ item.text }}
              </span>
              <p>{{ item.time.toFixed(2) }}</p>

              <!-- <span></span> -->
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else class="loading_mark">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import loading from "../../components/loading";
export default {
  components: { loading },
  props: ["currentMusic", "showtime", "audio"],
  data() {
    return {
      lyric: "",
      arr: [],
      playmusic: "",
      margintop: "",
      isindex: "",
      id: "",
      height: "",
      startY: "",
      moveY: "",
      endY: 0,
    };
  },

  created() {
    this.playmusic = this.currentMusic;
    if (this.playmusic.al) {
      this.axios
        .get(`http://music.kele8.cn/lyric?id=${this.playmusic.id}`)
        .then((response) => {
          this.lyric = response.data.lrc.lyric;
          this.arr = this.paresLyric();
        });
    } else if (this.playmusic) {
      this.axios
        .get(`http://music.kele8.cn/lyric?id=${this.playmusic.id}`)
        .then((response) => {
          this.lyric = response.data.lrc.lyric;
          this.arr = this.paresLyric();
        });
    }
  },

  watch: {
    showtime: function () {
      if (this.arr.length == 0) {
        return;
      } else {
        var i = this.arr.findIndex((element) => {
          return element.time > this.showtime;
        });
        console.log(i);
        this.height = parseFloat(
          window.getComputedStyle(this.$refs.li[i - 1]).height
        );
        this.margintop = -38 * (i - 1 ) + 175;
        this.isindex = i  - 1;
        console.log(this.arr[this.isindex].time);
        parseFloat(window.getComputedStyle(this.$refs.li[i - 1]).height);
        console.log(window.getComputedStyle(this.$refs.li[i - 1]).height);
      }
    },
    currentMusic: function () {
      this.playmusic = this.currentMusic;
      if (this.playmusic.al) {
        this.axios
          .get(`http://music.kele8.cn/lyric?id=${this.playmusic.id}`)
          .then((response) => {
            console.log("huoquaa", response.data);

            this.lyric = response.data.lrc.lyric;
            this.arr = this.paresLyric();
            console.log(this.arr);
            
          });
         
      } else if (this.playmusic) {
        this.axios
          .get(`http://music.kele8.cn/lyric?id=${this.playmusic.id}`)
          .then((response) => {
            console.log("huoqu", response.data);
            this.lyric = response.data.lrc.lyric;
            this.arr = this.paresLyric();
            console.log(this.arr);
          });
      }
    },
  },
  methods: {
    touchstart: function (e) {
      console.log(e.touches[0].pageY);
      this.startY = e.touches[0].pageY;
    },
    touchend: function () {
      this.endY = this.moveY;
      var i = this.arr.findIndex((element) => {
        return element.time > this.showtime;
      });
      this.height = parseFloat(
        window.getComputedStyle(this.$refs.li[i - 1]).height
      );

      this.isindex = i - this.endY-1;
      console.log(this.arr[this.isindex].time);
      this.audio.currentTime = this.arr[this.isindex].time;
    },
    touchmove: function (e) {
      // console.log('开始移动')
      // console.log(e.touches[0].pageY);
      if (this.arr.length) {
        this.moveY = Math.round((e.touches[0].pageY - this.startY) / 24.8);
        console.log(this.moveY);
        console.log(this.audio);
        if (this.arr.length == 0) {
          return;
        } else {
          var i = this.arr.findIndex((element) => {
            return element.time > this.showtime;
          });
          console.log(i);
          this.height = parseFloat(
            window.getComputedStyle(this.$refs.li[i - 1]).height
          );
          this.margintop = -38 * (i - 1 - this.moveY) + 175;
          this.isindex = i - this.endY;
          console.log(this.arr[this.isindex].time);
          parseFloat(window.getComputedStyle(this.$refs.li[i - 1]).height);
          console.log(window.getComputedStyle(this.$refs.li[i - 1]).height);
        }
      }

      // this.margintop = 40 * 9 + 175;
    },
    paresLyric: function () {
      var patt = /\[\d{2}:\d{2}\.\d{2,3}\]/gi;
      var arr = this.lyric
        .split("\n")
        .filter((e) => e)
        .map((str) => {
          var time = str.match(patt)[0].replace(/(\[|\])/gi, "");
          var timeArr = time.split(":");
          time = Number(timeArr[0]) * 60 + Number(timeArr[1]);
          var text = str.replace(patt, "");
          return { time, text };
        });
      return arr;
    },
  },
  getdate: function () {},
};
</script>

<style lang="scss">
@import url("../../assets/css/bigPlayShowLyric.css");
.playLyricActive {
  color: white;
}
.loading_mark {
  position: absolute;
  top: 0;
  z-index: 99999;
}
</style>