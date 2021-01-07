<template>
  <section class="search_history" v-if="data">
    <ul class="search_history_list">
      <li
        class="search_history_item"
        v-for="(item, index) in data"
        :key="index"
      >
        <i class="search_history_ico">
          <img src="../assets/images/histroy.png" alt="" />
        </i>
        <div class="search_history_item_main">
          <span @click="clicksearchSong(item)">{{ item }}</span>
          <p>
            <img
              src="../assets/images/remove.png"
              alt=""
              @click="removeClick(item)"
            />
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      data: "",
    };
  },
  created() {
    console.log(JSON.parse(localStorage.getItem("obj")));
    this.data = JSON.parse(localStorage.getItem("obj"));
  },
  methods: {
    removeClick: function (e) {
      this.data = JSON.parse(localStorage.getItem("obj"));
      console.log(this.data);
      console.log(e);
      delete this.data[e];
      localStorage.setItem("obj", JSON.stringify(this.data));
    },
    clicksearchSong: function (e) {
      this.$emit("clicksearchSong", e);
    },
  },
};
</script>

<style lang="scss">
.search_history {
  .search_history_list {
    .search_history_item {
      height: 48px;
      display: flex;
      align-items: center;
      //   background-color: red;
      width: 100%;
      margin-left: 10px;
      line-height: 48px;
      .search_history_ico {
        width: 18px;
        img {
          display: block;

          width: 17px;
          height: 17px;
        }
      }
      .search_history_item_main {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-left: 15px;
        height: 48px;
        border-bottom: 1px solid #dcdada72;

        span {
          flex: 1;
          color: #333;
          font-size: 14px;
        }
        p {
          display: inline-block;
          width: 14px;
          margin-right: 25px;
          img {
            display: block;
            width: 13px;
            height: 13px;
          }
        }
      }
    }
  }
}
</style>