<template>
<div class="loading">
    <img src="../assets/images/loading1.gif" alt="">
    

    
    
</div>
  
</template>

<script>
export default {

}
</script>

<style lang="scss">
.loading{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background:#fafafc;
    img{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -300px;
        margin-left: -300px;
        width:600px;
        height: 600px;
        transform: scale(0.7);
    }
}

</style>