<template>
  <div class="homeplay">
    <recomment
      :paused="paused"
      :currentMusic="currentMusic"
      :currentIndex="currentIndex"
      @translate-music="$emit('translate-music', $event)"
    ></recomment>
  </div>
</template>
<script>
import recomment from "./Recommment";

export default {
  props: ["paused","currentMusic","currentIndex"],
  components: {
    recomment,
  },
};
</script>
<style lang="scss">
.homeplay {
  margin-top: 130px;
}
</style>