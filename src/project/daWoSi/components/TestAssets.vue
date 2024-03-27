<script setup lang='ts'>
import bluePng from '$daWoSi/assets/images/blue.png'
console.log(bluePng);

</script>
<template>
<h1>测试静态资源</h1>
<h2>图片引入</h2>
<img style="width: 50px;" src="$daWoSi/assets/images/blue.png" alt="">
<h2>背景引入</h2>
<div class="bg"></div>
<h2>全局图片引入</h2>
<img src="/images/添加按钮.png" alt="">
<img style="width: 50px;" src="/green.png" alt="">
</template>
<style lang='scss' scoped>
.bg {
  width: 50px; 
  height: 50px;
  background: red;
  background-image: url("$daWoSi/assets/images/blue.png");
  background-size: 100%;
  // #{$daWoSi}
  // background-image: url('#{$daWoSi}/assets/images/blue.png') 100% 100%;
}
</style>