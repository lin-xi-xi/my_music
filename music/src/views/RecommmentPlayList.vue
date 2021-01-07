<template>
  <section>
    <div class="title">
      <BorderTitle><slot></slot></BorderTitle>
    </div>

    <ul class="playlist" >
      <PlayListItem 
      v-if="currentRecommments"
      :currentRecommments="currentRecommments"
      ></PlayListItem>
     <div v-else>
      <van-loading size="24px">加载中...</van-loading>
    </div>
    </ul>
   
  </section>
</template>

<script>
import BorderTitle from "./BorderTitle";
import PlayListItem from "./PlayIistItem";
export default {
  components: {
    BorderTitle,
    PlayListItem,
  },
  props: ["currentRecommments"],
};
</script>

<style lang="scss">
</style>