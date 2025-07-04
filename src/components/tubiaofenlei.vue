<script setup>
import tupian from '../assets/icon/huodong.jpg'
import config from '@/global.config.js'
// baseURL=  config.backendserver;
const lanmu = config.lanmu;
const keys = Object.keys(lanmu);
  console.log(keys);
  console.log(keys[0]);
  const zhi = Object.values(lanmu)[0];
  console.log(zhi);
</script>

<template>
   

  <!-- 导航宫格  :column-num="4"设置一行几个导航-->
<van-grid :column-num="4">  
  <van-grid-item to="/dizhi" icon="invitation" color="#ee0a24" text="拼单服务" />
  <van-grid-item to="/activitys_liebiao" icon="photo-o" text="教育培训" />
  <van-grid-item to="/mypage" icon="photo-o" color="#ee0a24" text="旅行服务" />
  <van-grid-item to="/detail" icon="photo-o" text="医疗保健" />
  <van-grid-item to="/liebiao2" icon="photo-o" text="休闲娱乐" />
  <van-grid-item to="/axiosgetdata" icon="photo-o" text="房屋相关" />
  <van-grid-item to="/" icon="photo-o" text="生活服务" />
  <van-grid-item to="/act_list" icon='photo-o'  text="商超信息" />
  <van-grid-item to="/act_detail" icon="photo-o" text="美食" />
  <van-grid-item to="/act_list" icon="photo-o" text="财务法务" />
  <van-grid-item>
    <van-image
      src="https://img.bianchengxue.com/upload11/2303/105529180.jpeg" rel="external nofollow" 
    />
  </van-grid-item>
  <!-- <van-grid-item>
      <van-image :src="require('../assets/icon/huodong.jpg')" />
  </van-grid-item> -->
</van-grid>
<div style="font-weight: bold;margin-left:20px;"> 拼单服务</div> 
<van-grid>
  <van-grid-item to="/act_detail" text="活动拼单" />
  <van-grid-item  text="购买拼单" />
  <van-grid-item  text="教育抢单" />
  <van-grid-item  text="" />
</van-grid>

</template>

<style scoped>

</style>
