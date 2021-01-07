<template>
  <div class="hotsearchlist">
    <h3>热门搜索</h3>
    <ul class="hotsearchlist_hotlist">
      <li v-for="(item, index) in hotsearch"
      :key="index"
      @click="clicsong(item.first)"
      >{{item.first}}</li>
  
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotsearch: "",
    };
  },
  methods: {
    clicsong:function(e){
      console.log(e)
      this.$emit('clickSeachsong',e)

    }
  },
  watch:{
    'hotsearch':function(){
      this.$emit('searchDate',this.hotsearch)
    }

  },
  created() {
    this.axios.get("http://music.kele8.cn/search/hot").then((response) => {
      console.log(response.data.result);
      this.hotsearch = response.data.result.hots;
      
    });
  },
};
</script>

<style lang="scss">
.hotsearchlist {
  padding: 15px 10px 0;
  h3 {
    font-size: 12px;
    line-height: 12px;
    color: #666;
    font-weight: normal;
  }
  .hotsearchlist_hotlist {
    margin: 10px 0 7px;
    li {
      display: inline-block;
      height: 32px;
      margin-right: 8px;
      margin-bottom: 8px;
      padding: 0 14px;
      font-size: 14px;
      line-height: 30px;
      color: #333;
      text-align: center;
      border: 1px solid #dcdada72;
      border-radius: 13px;
    }
    li:after {
      display: block;
      contain: "22";
      height: 32px;
      width: 15px;
      background: red;
    }
  }
}
</style>