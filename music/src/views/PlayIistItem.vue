<template>
  <div>
    <div class="playlistitem">
      <div v-if="!currentRecommments" class="samllloading">
        <img src="../assets/images/loading.gif" alt="" />
      </div>
      <template v-if="currentRecommments">
        <li
          v-for="(item, index) in currentRecommments"
          :key="index"
          @click="navigatoplayitem(item.id)"
        >
          <div class="imgbox">
            <img :src="currentRecommments[index].picUrl" alt="" />
            <span class="play-count">{{
              currentRecommments[index].playCount | formatPlayCount
            }}</span>
          </div>
          <span class="tittle">{{ currentRecommments[index].name }}</span>
        </li>
      </template>
      <div v-else>
        <van-loading size="24px">加载中...</van-loading>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currentRecommments"],
  filters: {
    formatPlayCount: function (value) {
      return (value / 10000).toFixed(1) + "万";
    },
  },
  methods: {
    navigatoplayitem: function (id) {
      this.$router.push({
        path: "/playlist",
        query: {
          id: id,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.playlistitem {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  li {
    // flex: 1 1 calc(100vw / 3 - 10px);
    &:nth-of-type(3n + 2) {
      margin-right: 4px;
      margin-left: 4px;
    }
    width: 32.6%;
    margin-bottom: 16px;

    .imgbox {
      position: relative;
      img {
        width: 100%;

        min-height: 30vw;
        vertical-align: middle;
      }
      .play-count {
        font-size: 12px;
        position: absolute;
        top: 0;
        right: 0;
        color: white;
        text-shadow: 0 0 1px black;
        &::before {
          content: "";
          background: no-repeat
            url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+");
          background-position: left center;
          background-size: auto 100%;
          width: 1.2em;
          height: 0.9em;
          display: inline-block;
          // vertical-align: middle;
        }
      }
    }
    .tittle {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      padding: 6px 2px 0 6px;
      min-height: 30px;
      line-height: 1.2;
      font-size: 13px;
    }
  }
}
</style>