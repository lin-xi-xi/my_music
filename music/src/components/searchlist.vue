<template>
  <div>
    <section class="search_searchlists" v-if="searchlists">
      <div class="search_title">搜索“{{ searchlists }}”</div>
      <ul class="search_list">
        <li
          v-for="(item, index) in searchitem"
          :key="index"
          class="search_item"
        >
          <i><img src="../assets/images/search.png" alt="" /></i>
          <span @click="searchSong(item.keyword)"> {{ item.keyword }}</span>
        </li>
      </ul>
      <div v-if="!searchitem">
        <div>
          <img src="../assets/images/loading.gif" alt="" />加载中...
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  props: ["searchlists", "searchitem", "state"],

  watch: {
    searchitem: function () {
      console.log("数据改变了吗");
    },
  },
  methods: {
    searchSong: function (e) {
      this.$emit("clickSearchSong", e);

   
    },
  },
};
</script>

<style lang="scss">
.search_searchlists {
  .search_title {
    height: 50px;
    margin-left: 10px;
    padding-right: 10px;
    font-size: 15px;
    line-height: 50px;
    color: #507daf;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: normal;
    border-bottom: 1px solid #dcdada72;
  }
  .search_list {
    .search_item {
      display: flex;
      align-items: center;
      height: 45px;
      padding-left: 10px;
      margin-right: 7px;
      span {
        display: inline-block;
        flex: 1;
        width: 1%;
        padding-right: 10px;
        font-size: 15px;
        line-height: 45px;
        color: #333;
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
        border-bottom: 1px solid #dcdada72;
      }
      i {
        flex: 0 0 auto;
        display: inline-block;
        margin-right: 7px;
        img {
          width: 15px;
          height: 15px;
        }
      }
    }
  }
}
</style>