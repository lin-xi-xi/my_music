<template>
  <div>
    <div class="Searchtop">
      <div class="inputSearchtop">
        <i class="search_ico">
          <img src="../assets/images/search.png" alt="" />
        </i>
        <input
          type="text"
          name="search"
          class="search"
          placeholder="搜索歌曲、歌手、专辑"
          @input="changeinput"
          @keyup.enter="handleSubmit"
          @focus="focus"
          autocomplete="off"
          v-model.trim="searchlists"
        />
        <span class="close" :class="{ search_active_isactive: searchlists }">
          <img src="../assets/images/search_move.png" alt="" @click="remove" />
        </span>
      </div>
    </div>

    <SongItem
      v-if="pause"
      :newSong="searchSong"
      @translate-music="$emit('translate-music', $event)"
      :paused="paused"
      :currentMusic="currentMusic"
      :currentIndex="currentIndex"
    ></SongItem>

    <Searchlists
      v-else
      :searchlists="searchlists"
      :searchitem="searchitem"
      :state="state"
      @clickSearchSong="clickSearchSong"
    ></Searchlists>
    
  </div>
</template>

<script>
import Searchlists from "./searchlist";
import SongItem from "../views/SongItem";
export default {
  components: { Searchlists, SongItem },
  props: ["paused", "currentMusic", "currentIndex", "historyclicksearchSong"],
  watch: {
    searchlists: function (val) {
      if (this.searchlists) {
        // console.log
      }
      if (typeof val === "string") {
        if (val.trim().length !== 0) {
          this.debounce(this.changeinput, 100);
        } else {
          this.isActive = false;
        }
      }
    },
    historyclicksearchSong: function () {
      this.searchlists = this.historyclicksearchSong;
      this.clickSearchSong(this.historyclickSearchSong);
    },
  },
  methods: {
   focus:function(){
      console.log('鼠标获取焦点')
      this.pause=false

    },
    clickSearchSong: function (e) {
      console.log(e);
      this.axios
        .get(`http://music.kele8.cn/search?keywords=${e}&type=1`)
        .then((response) => {
          this.searchSong = response.data.result.songs;
          this.searchSong.forEach((element, index) => {
            console.log(typeof element.artists);
            console.log(element.artists);
            this.changeobj.song = element.artists[0];
            this.searchSong[index].song = this.changeobj.song;
            // this.searchSong[index].id=element.alias.id
            this.searchSong[index].song.artists = [
              { name: this.searchSong[index].song.name },
            ];
            this.searchSong[index].song.artists.picUrl =
              "https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg%22";

            this.searchSong[index].picUrl =
              "https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg%22";
            delete this.searchSong[index]["artists"];
          });
          console.log(this.searchSong);
          this.pause = true;
        });
    },
    debounce: function (fn, wait) {
      if (this.fun != null) {
        // clearInterval();
        clearTimeout(this.fun);
      }
      this.fun = setTimeout(fn, wait);
    },
    handleSubmit: function () {
      if (this.arr.indexOf(this.searchlists) == -1) {
        this.arr.push(this.searchlists);
        this.obj[this.searchlists] = this.searchlists;

        localStorage.setItem("obj", JSON.stringify(this.obj));
      }
    },
    remove: function () {
      this.searchlists = "";
      this.pause = false;
      this.$emit("oninput", this.searchlists);
    },
    changeinput: function () {
      if (this.searchlists) {
        this.axios
          .get(
            `http://music.kele8.cn/search/suggest?keywords=${this.searchlists}&type=mobile`
          )
          .then((response) => {
            this.searchitem = response.data.result.allMatch;
          })
          .catch((error) => {
            this.state = error.response.status;
            this.$emit("error", error.response.status);
          });
        this.$emit("oninput", this.searchlists);
      }
    },
  },
  data() {
    return {
      searchlists: "",
      searchitem: "",
      arr: [],
      state: "",
      obj: {},
      searchSong: "",
      changeobj: {},
      pause: false,
      focusSate:this.paused,
    };
  },
};
</script>

<style lang="scss">
.Searchtop {
  margin-top: 7.7rem;
  padding: 15px 10px;
  position: relative;
  border-bottom: 1px solid #dcdada72;

  .inputSearchtop {
    width: 100%;
    height: 30px;
    padding: 0 30px;
    box-sizing: border-box;
    background: #ebecec;
    border-radius: 30px;

    .search_ico {
      display: block;
      position: absolute;
      left: 12px;
      top: 18px;
      margin: 0 8px;
      img {
        width: 13px;
        height: 13px;
      }
    }
    input::-webkit-input-placeholder {
      color: #c9c9c9;
    }
    .search {
      width: 100%;
      height: 30px;
      line-height: 18px;
      background: rgba(0, 0, 0, 0);
      font-size: 14px;
      color: #333;
      outline: none;
      text-shadow: none;
      appearance: none;
    }
    .close {
      // display: block;
      width: 14px;
      height: 14px;
      position: absolute;
      top: 18px;
      right: 12px;
      margin: 0 8px;
      display: none;
      img {
        width: 14px;
        height: 14px;
      }
    }
  }
  input::-webkit-search-decoration,
  input::-webkit-search-cancel-button {
    display: none;
  }
}
.search_active_isactive {
  display: block !important;
}
</style>