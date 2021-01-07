<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#d43c33" >
    <van-swipe-item class="van-swipe-item_img">
      <img
        src="https://p1.music.126.net/_cUL8jdHrwRc5pOMOaI8Xg==/109951165556148033.jpg?imageView&quality=89"
        alt=""
      />
    </van-swipe-item>
    <van-swipe-item>
      <img
        src="https://p1.music.126.net/6lz66uv1iUOi5F3n6Rr0_Q==/109951165556151714.jpg?imageView&quality=89"
        alt=""
      />
    </van-swipe-item>
    <van-swipe-item>
      <img
        src="https://p1.music.126.net/c_0QM9GypecVIJW8CiQtKQ==/109951165556123877.jpg?imageView&quality=89"
        alt=""
      />
    </van-swipe-item>
    <van-swipe-item>
      <img
        src="https://p1.music.126.net/W3T3hgZrdClxZjPFUtTd5w==/109951165556300665.jpg?imageView&quality=89"
        alt=""
      />
    </van-swipe-item>

 
  </van-swipe>
  
</template>

<script>
export default {};
</script>

<style lang="scss">
.van-swipe-item_img {
  color: #d43c33;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  //   background-color: #39a9ed;
}
.my-swipe {
  margin-top: -8px;
}
.my-swipe .van-swipe-item {
  img {
    max-width: 100vw;
    max-height: 100vh;
  }
}
</style>