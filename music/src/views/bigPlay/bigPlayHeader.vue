<template>
  <div>
    <div class="bigPlayHeadet">
      <div class="bigPlayicon">
        <img
          src="../../assets/images/left_arrow.png"
          alt=""
          @click="$emit('changeClick')"
        />
      </div>

      <div class="tittle-box">
        <div class="titlemove">
          <p>{{ currentMusic.name || currentMusic.al.name }}</p>
        </div>
        <div class="wenzi" v-if="!currentMusic.al">
          <span
            v-for="(artist, index2) in currentMusic.song.artists ||
            currentMusic"
            :key="index2"
            ><template v-if="index2"> / </template>{{ artist.name }}
          </span>
        </div>
        <div class="wenzi" v-else>
          <span v-for="(artist, index2) in currentMusic.ar" :key="index2">
            <template v-if="index2"> / </template>{{ artist.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentMusic"],
};
</script>
<style lang="scss">
@import url("../../assets/css/bigPlayHeader.css");
</style>

