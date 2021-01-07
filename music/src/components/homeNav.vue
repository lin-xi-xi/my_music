<template>
  <div>
    <logo></logo>
    <div id="nav" v-if="$route.meta.isShow">
      <router-link to="/home">推荐音乐</router-link>
      <router-link to="/hot">热歌榜</router-link>
      <router-link to="/search">搜索</router-link>
    </div>
    <keep-alive>
      <router-view
        @translate-music="$emit('translate-music', $event)"
        :paused="paused"
        :currentMusic="currentMusic"
        :currentIndex="currentIndex"
      />
    </keep-alive>
  </div>
</template>

<script>
import logo from "../components/logo";
export default {
  components: { logo },

  props: ["paused", "currentMusic", "currentIndex"],
};
</script>

<style lang="scss">
#nav {
  clear: both;
  display: flex;
  position: fixed;
  top: 84px;
  left: 0;
  z-index: 100;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #dcdada72;

  a {
    flex: 1;
    // width: 33.33%;
    height: 40px;
    line-height: 40px;
    display: block;
    text-align: center;
    color: #333;
    font-size: 15px;
    font-weight: 400;

    margin: 0px 29px;
    &.router-link-exact-active {
      color: #dd001b;
      border-bottom: 2px solid #dd001b;
    }
  }
}
</style>