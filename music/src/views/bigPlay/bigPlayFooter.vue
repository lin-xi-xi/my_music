<template>
  <div class="bigPlayFooter">
    <div
      class="controls_list_play_list"
      @click="playlistblock = false"
      :class="{ playlistblockactive: playlistblock }"
    >
      <div class="play_list_box">
        <div class="play_list_box_inner">
          <h3>
            当前播放
            <p>({{ playlist.length }})</p>
          </h3>
          <div class="swiper">
            <ul>
              <li
                v-for="(item, index) in playlist"
                :key="index"
                @click="playlistmusic(index, item)"
                :class="{ ismusicplayindex: currentIndex == index }"
              >
                <i v-if="currentIndex == index" class="shengying_ico">
                  <img src="../../assets/images/shengying.png" alt="" />
                </i>
                <p v-if="!item.al">
                  {{ item.name }}-
                  <span
                    v-for="(artist, index2) in item.song.artists"
                    :key="index2"
                  >
                    <template v-if="index2"> / </template>{{ artist.name }}
                  </span>
                </p>
                <p class="wenzi" v-else>
                  {{ item.al.name }}-
                  <span v-for="(artist, index2) in item.ar" :key="index2">
                    <template v-if="index2"> / </template>{{ artist.name }}
                  </span>
                </p>

                <span class="cuo">×</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="progress">
      <div class="progress_left">
        <span>{{ timer }}</span>
      </div>
      <div class="progress_center">
        <input
          type="range"
          min="0"
          :max="durationTime"
          step="1"
          :value="duration"
          @input="getValue"
        />
        <span
          :style="{ width: (currentTime / durationTime) * 100 + '%' }"
        ></span>
        <i
          ref="span"
          :style="{ left: (currentTime / durationTime) * 100 + '%' }"
        ></i>
      </div>
      <div class="progress_right">
        <span>{{ duration }}</span>
      </div>
    </div>
    <div class="controls">
      <div class="controls_random">

        <img
          src="../../assets/images/xunhuang.png"
          alt=""
          @click="random"
          v-if="cunhuang"
        />
        <!-- 随机播放的数据 -->
        <img
          src="../../assets/images/random.png"
          alt=""
          @click="random"
          v-if="!cunhuang"
        />
      </div>
      <div class="controls_pre">
        <img
          src="../../assets/images/pre.png"
          alt=""
          @click="$emit('clickpre')"
        />
      </div>
      <div class="controls_pause_play">
        <div class="controls_pause">
          <img
            src="../../assets/images/stop.png"
            alt=""
            v-if="state == '播放'"
            @click="$emit('clickPlay', '暂停')"
          />
          <img
            src="../../assets/images/bofan.png"
            alt=""
            v-if="state == '暂停'"
            @click="$emit('clickPause', '播放')"
          />
        </div>
      </div>
      <div class="controls_next">
        <img
          src="../../assets/images/next.png"
          alt=""
          @click="$emit('clicknext')"
        />
      </div>
      <div class="controls_list">
        <img
          src="../../assets/images/list.png"
          alt=""
          @click="playlistblock = true"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "timer",
    "duration",
    "currentTime",
    "durationTime",
    "state",
    "playlist",
    "currentIndex",
  ],
  data() {
    return {
      playlistblock: false,
      cunhuang: "ture",
    };
  },
  methods: {
    random: function () {
      this.cunhuang = !this.cunhuang;
      // 将当前状态抛出去
      this.$emit("changeRandom", this.cunhuang )
    },
    getValue: function (e) {
      this.$emit("updateCurrentTime", e.target.value);
    },
    playlistmusic: function (a, b) {
      this.$emit("playlistmusic", { index: a, item: b });
    },
  },
};
</script>

<style lang="scss">
@import url("../../assets/css/bigPlayFooter.css");
.playlistblockactive {
  display: block !important;
}
.ismusicplayindex {
  color: #d43c33 !important;
}
</style>