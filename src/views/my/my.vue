
<template>
  <div class="my-container">
   <van-nav-bar title="个人中心" left-text="返回" @click=" router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <!-- 导航宫格  :column-num="4"设置一行几个导航-->
<van-grid :column-num="4" style="background-color: white;">  
  <van-grid-item to="/dizhi" icon="invitation" color="#ee0a24" text="地址管理" />
  <van-grid-item to="/user_info" icon="photo-o" text="登录信息" />
  <van-grid-item to="/user_2tier_detail" icon="photo-o" color="#ee0a24" text="个人详情" />
  <van-grid-item to="/user_login" icon="photo-o" text="登录" />
  <van-grid-item to="/liebiao2" icon="photo-o" text="列表2" />
  <van-grid-item to="/axiosgetdata" icon="photo-o" text="axiosgetdata" />
  <van-grid-item to="/" icon="photo-o" text="获取手机gps" />
  <van-grid-item to="/act_list" icon='photo-o'  text="活动列表" />
  <van-grid-item to="/act_detail" icon="photo-o" text="活动详情" />
  <van-grid-item to="/act_list" icon="photo-o" text="活动列表" />
  <van-grid-item>
    <van-image
      src="https://img.bianchengxue.com/upload11/2303/105529180.jpeg" rel="external nofollow" 
    />
  </van-grid-item>
  <!-- <van-grid-item>
      <van-image :src="require('../assets/icon/huodong.jpg')" />
  </van-grid-item> -->
</van-grid>


<!-- 
<van-cell title="单元格" is-link />
<van-cell title="单元格" is-link value="内容" />
<van-cell title="单元格" is-link arrow-direction="down" value="内容" /> -->

<!-- <van-cell title="URL 跳转" is-link url="https://github.com" />
<van-cell title="路由跳转" is-link to="index" /> -->
<van-space :size="20"></van-space>
<van-cell style="font-size: small;" title="个人信息" />
<van-row style="width:100%;background-color: white;">
  <van-col style="" span="12"> <van-cell to="/address"  title="个人地址管理"   icon="records"/></van-col>
  <van-col span="12"> <van-cell to="/user_2tier_detail" style="" title="个人详细信息"  icon="location-o" /></van-col>
  <van-col span="12"> <van-cell to="/user_zhuce_info" style="" title="注册信息"  icon="location-o" /></van-col>

</van-row> 
<van-space :size="20"></van-space>
<van-cell style="  display: flex; font-size: small;" title="信息发布" />
<van-row> 
  <van-col style="display: flex;align-items: center; justify-content: center;" span="12"> <van-cell  title="发布管理"  icon="manager-o" /></van-col>
  <van-col span="12"> <van-cell to="/my_fabu" style="" title="黄页发布"   icon="peer-pay" /></van-col>

</van-row>

<van-cell-group title="分组1">
  <van-cell title="单元格" />
</van-cell-group>
<van-cell-group title="分组2">
  <van-cell title="单元格" />
</van-cell-group>

<van-cell value="内容" is-link>
  <!-- 使用 title 插槽来自定义标题 -->
  <template #title>
    <span  class="custom-title">单元格</span>
    <van-tag type="primary">标签</van-tag>
  </template>
</van-cell>
<van-space :size="20"></van-space>
<div  style="text-align: center;">
  <van-cell @click="btn_logout" style="color: blue;" title="退出登录" />
</div>

</div>
</template>


<script setup>

import {showToast} from 'vant'
import https from '@/utils/request.js'


  const btn_logout = () =>{
      https.post('/api/v1/user/sign/out','').then(response=>{
          // console.log('asdfas555111');
          console.log(response);
          showToast('退出登录');
          // 把获取的详情添加到本地存储
          localStorage.clear()
          // 跳转到登录页
          router.push('/user_login')
          // this.$router.push({ path: '/user_login' });
        }).catch(error=>{
              console.log('出错了2');
              console.error(error);
              // showToast('请重新登录');
      });
      
    }




</script>


<style >
.my-container{
  background-color:#F4F2F2 ;
}
.van-cell__title{
  padding-left: -20px;
}
</style>



