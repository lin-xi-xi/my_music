<template>
  <h2><slot></slot></h2>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
h2 {
  display: block;
  margin-top: 12px;
//   background-color: pink;

  padding-left: 10px;
  line-height: 1em;
  margin-right: 15px 0;
  line-height:55px;
  height: 55px;
  position: relative;

  width: 100%;
  font-size: 17px;
  font-weight: normal;
  &::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -9px;
    width: 2px;
    height: 16px;
    background-color: #d33a31;
  }
}
</style>