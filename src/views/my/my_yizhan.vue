
<template>
  <van-nav-bar title="我的驿站订单" left-text="返回" @click=" router.go(-1);" left-arrow>
<template #right>
  <van-icon name="search" size="18" />
</template>
</van-nav-bar>
<span style="display: flex; margin:15px;    justify-content: center; /* 水平居中 */"> 请点击选择驿站</span>
    <van-list style="margin-bottom: 10px;">
      <van-cell class="custom-cell" v-for="(item,index) in listdata2" :key="item.id">
          <template #title>
            <!-- <span>驿站编码：{{ item.id }}：</span>  -->
             <span @click="get_orders_yizhan(item.id,item)" style="font-weight: bold;">{{ item.address }} {{ item.city }} ,{{ item.province }}</span>
            <div class="container">          
            </div>
          </template>
       
      </van-cell>

    </van-list>

   
</template>

<script setup>
import axios from 'axios';
import config from '@/global.config.js'
import md5 from 'js-md5'
// import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';
import { useStore } from 'vuex'
// import { showToast ,showConfirmDialog, showDialog} from 'vant';
// import { ref, onMounted, computed,reactive } from 'vue';
import textEditor  from "@/components/textEditor.vue"  
import weizhi from '@/components/weizhi.vue'
import userFunc from '@/utils/userfunc.js'
import funcs from '@/utils/common_func.js'
import { ref, onMounted, computed,reactive } from 'vue';
import {  showToast, showDialog, showConfirmDialog,ImagePreview   } from 'vant';

var listdata2 = ref([]);

import { useRouter,useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
// event_id.value = route.query.id;
const istrue = ref(true)
const yizhan_selected = ref('')
const listdata3= ref([])
const fulladdr = ref('')


// 找到一个驿站的所有商品
const get_orders_yizhan = (yizhan_id, item) =>{
  fulladdr.value = item.address + ',' + item.city +', ' + item.province
  router.push(`/my_yizhan_one?yizhan_id=${yizhan_id}&addr=${fulladdr.value}`)
  yizhan_selected.value = address
 
}

onMounted(() => {
// const user_id = localStorage.getItem("user_id");
// console.log('userid', user_id)
 
https.get('/api/user/yizhan_addr/myyizhan').then(response => {
      console.log('asdfas555111');
      console.log(response);
      listdata2.value = response
      // router.push('/my_post')
    }).catch(error => {
      console.log('出错了2');
      console.error(error);
      
    });
});


</script>

<style scoped>
   .container {
            display: flex;
            /* 可选：让子元素水平居中 */
            /* justify-content: space-between;  */
            /* 可选：让子元素垂直居中 */
            align-items: center;
        }
        .item {
            /* padding: 10px; */
            margin: 5px;
            /* border: 1px solid #ccc; */
        }


        :deep .van-field__control{
    color: rgb(13, 110, 78);
}

.containerRef{
  background-color: rgb(237, 236, 235);
}
.container {
  width: 100%; /* 容器占满全部宽度 */
  display: flex; /* 使用 Flexbox 布局 */
  /*flex-wrap: wrap;  允许换行 */
  margin: 5px;
}


.modal {
  position: fixed;
  z-index: 9999; /* 确保在顶层 */
  /* background-color: rgba(0, 0, 0, 0.9);  半透明黑色背景 */
  /* display: flex; */
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.modal-content {
  max-width: 100vw; /* 使用视口宽度的90%作为最大宽度 */
  max-height: 90vh; /* 使用视口高度的90%作为最大高度 */
  object-fit: contain; /* 图片按比例缩放以完全填充容器 */
}

.thumb-img {
  cursor: pointer; /* 鼠标指针样式为手型 */
  width: 100%; /* 缩略图宽度100% */
  height: auto; /* 自动调整高度 */
}

.close {
  position: absolute;
  top: 15px;
  right: 15px;
  color: #fff; /* 符号的颜色 */
  font-size: 30px;
  background-color: rgba(0, 0, 0, 0.5); /* 背景色，半透明黑色 */
  padding: 5px; /* 调整内边距 */
  border-radius: 50%; /* 圆角 */
  cursor: pointer;
}




::deep .van-card-desc {
  white-space: pre-line; /* 允许文本根据需要自动换行 */
}


.goodslist{
 
  height: auto;
  padding-top: 10px;
  align-items: center; /* 垂直居中 */
  
  /* background-color: white; */
}

.bottom-row{
  
  background-color: #fff;
  display: flex;
  max-width: 760px;
  justify-content: flex-end; /* 按钮居右对齐 */
  gap: 10px; /* 按钮之间的间距 */
  padding-right: 10px; /* 右边内边距 */
  padding-bottom: 5px;
}


.full-screen-layout {
  display: flex;
  margin-bottom: 0px;
 
  height: auto;
  padding-top: 10px;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  background-color: white;
}

.image {
  margin-left: 10px;
  flex: 0 0 22%; /* 左侧图片固定宽度为屏幕宽度的一半 */
  /* max-width: 50%;  图片最大宽度为屏幕宽度的一半 */
  
}

.image img {
  max-width: 100%; /* 图片最大宽度100% */
  height: auto; /* 高度自适应 */
  max-height: 70vh; /* 图片最大高度为屏幕高度的70% */
  object-fit: contain; /* 图片填充方式，保持比例并适应容器 */
 
  border-radius: 12px; /* 圆角效果 */
}

.info {
  flex: 1; /* 右侧信息占据剩余空间 */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 垂直顶部对齐 */
  align-items: flex-start; /* 左对齐 */
  padding-top: 5px; /* 右侧信息的内边距 */
  margin-left:10px;
  margin-top:-10px;
  padding-bottom: 5px;
 
  padding-right: 10px;
}

.info-item {
  margin-bottom: 5px;
  margin-right: 5px;
}

.label {
  font-weight: bold;
  font-size: 12px; /* 标签字体大小 */
}

.value {
  font-size: 12px; /* 值字体大小 */
  color: rgb(87, 84, 84);
}

.mybutton{
  border: 1px solid #353636; /* 边框颜色和宽度 */
  border-radius: 5px; /* 圆角半径 */
  padding: 2px 8px; /* 内边距 */
  padding-top:0px;
  font-size: 12px; /* 字体大小 */
  color: #0c0c0c; /* 文字颜色 */
  background-color: transparent; /* 背景透明 */
  cursor: pointer; /* 鼠标指针为手型 */
  transition: background-color 0.3s, color 0.3s; /* 过渡效果 */
}

.ispaid{
  color:green;
}
.unpaid{
  color:red;
}



</style>
