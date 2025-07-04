
<template>
  <van-nav-bar title="我的驿站订单" left-text="返回" @click=" router.go(-1);" left-arrow>
<template #right>
  <van-icon name="search" size="18" />
</template>
</van-nav-bar>

<!-- 添加备注，是隐藏的，点击时才可见 -->
<van-popup v-model:show="showPopup" style="padding: 20px;">
    <van-form  style="margin-bottom:10px; margin-top:10px;">
      {{ item_selected.beizhu }}
      <van-field v-model="beizhu" name="name" label="添加备注" placeholder="请输入备注"
          :rules="[{ required: true, message: '请输入备注' }]" />

      <div style="display: flex;        justify-content: center; /* 水平居中 */    ">
          <van-button @click="add_note(item_selected)" style="width: 100px;height: 30px; margin: 10px;" plain
              size="small" type="success">添加备注</van-button>
          
      </div>
  </van-form>
</van-popup>

    <div style="display: flex; margin-top: 6px; justify-content: center; font-weight: bold;"> {{ full_addr }} </div>

    <div class="goodslist" v-for="(item,index) in listdata3" :key="item.id">   
        <div class="full-screen-layout"   >
          <!-- 左侧图片 -->
          <div class="image" >
            <img :src="item.imgurl" @click="showImage(item.imgurl)"  @error="onImageError" class="thumb-img" alt="产品图片">
          </div>
          
          <!-- 右侧信息 -->
          <div class="info">
            <div class="info-item">
              <span class="label">订单号：</span>
              <span class="value">G{{item.id}}</span> 
              <span class="label" style="margin-left:20px">日期：</span>
              <span class="value">{{funcs.formatDateTime(item.create_time)}}</span> 
            </div>
            <div class="info-item">
              <span class="label"></span>
              <span class="value">您的产品:{{item.product_type}}，选择型号:{{ item.color }},价格:{{ item.price }},数量：{{ item.shuliang }},小计：{{ item.total_amount }} </span>
            </div>
            <div class="info-item">
              <!-- <span class="label">支付状态： </span>
              <span class="value">{{item.color}}</span> -->
              <span class="label">状态: <span :class="{'paid': item.is_paid, 'unpaid': !item.is_paid}">{{ item.is_paid ? '已支付' : '未支付' }}</span></span>
              <span class="label" style="font-size: 12px; margin-left:20px;">物流状态：</span>
               <span class="label" style="font-weight: normal; font-size: 12px; margin-left:0px;">{{item.status}}</span>
            </div>
          </div>      
        </div>  <!-- 上边图片和信息的内容结束 -->
        <div class="bottom-row">
          <span class="mybutton" @click="addbeizhu_window(item)">备注</span>
          <span class="mybutton" @click="gobuypage(item.productid)">购买页面</span>
          <span class="mybutton" @click="godetail(item)">订单详情</span>
          <span class="mybutton" @click="yidaohuo(item,index)">已到驿站</span>
          <span class="mybutton" @click="yishouhuo(item,index)">已取货</span>
        </div>
      
      </div>



   
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
const showPopup = ref(false)


const full_addr = ref('')
onMounted(() => {

// const user_id = localStorage.getItem("user_id");
// console.log('userid', user_id)
 const yizhan_id = route.query.yizhan_id
 full_addr.value = route.query.addr
// 找到一个驿站的所有商品
  // yizhan_selected.value = address
  https.get(`/api/order/goodsorder_guanli_yizhan2/${yizhan_id}/`).then(response => {
      console.log('asdfas555111');
      console.log(response);
      listdata3.value = response
      // router.push('/my_post')
    }).catch(error => {
      console.log('出错了2');
      console.error(error);
      
  });

});

const gobuypage = (productid)=>{
    console.log('进入购买此商品的页面，可以确认此采购')
    let url = userFunc.separateLettersAndNumbers(productid)
    console.log(url.letters,url.numbers)
    // let productDetailUrl = glasses_detail?id=16
    let url2 = `${url.letters}_detail?id=${url.numbers}`
    // console.log('url2',url2)
    router.push(url2)
  }

  // const status = ref('')

// 点击获取订单详情，进入订单详情页
const godetail = (item) =>{
    // router.push(`/goodsorderdetail?id=${orderid}`)
    console.log('某个订单所有内容', item)
    console.log('id',item.id)
    // let url = userFunc.separateLettersAndNumbers(item.productid)
    
    let target_url =  `/goodsorder_detail?order_detail=${item.id}`
    console.log('url',target_url)
    router.push(target_url)
  }
// 货已到驿站，驿站将货收好放在指定位置，位置可以设置在备注
  const yidaohuo = (item,index) => {
    const data = {
      "status":"到驿站"
    }
    // status.value = "到驿站"
    const id = item.id
    https.put((`/api/order/goodsorder_guanli/status/${id}/`), data).then(response => {
      console.log('修改状态成功');
      console.log('fanhuizhi', response);
      listdata3.value[index].status = "到驿站"
     
    }).catch(error => {
      console.log('出错了2');
      console.error(error);
      // showToast('请重新登录');
    });
  }
    
// 可任意取货，完成订单
  const yishouhuo = (item,index) => {
    const data = {
      "status":"已完成"
    }
    const id = item.id
    https.put((`/api/order/goodsorder_guanli/status/${id}/`), data).then(response => {
      console.log('修改状态成功');
      console.log('fanhuizhi', response);
      listdata3.value[index].status = "已完成"
     
    }).catch(error => {
      console.log('出错了2');
      console.error(error);
      // showToast('请重新登录');
    });
  }


// 添加备注的内容
const item_selected = ref({})
  const beizhu = ref('')  //这是添加一个备注
  // 添加备注

  const addbeizhu_window = (item) =>{
    
    showPopup.value = true;
    item_selected.value = item
    console.log('item_select',item_selected.value)

  }

  const add_note = (item)=>{
    let data = {
      "beizhu":beizhu.value
    }
    console.log('ad',item.id)

    https.put((`/api/order/goodsorder_guanli/beizhu/${item.id}/`), data).then(response => {
      console.log('添加备注成功');
      console.log('fanhuizhi', response);
      showPopup.value = false
     
    }).catch(error => {
      console.log('出错了2');
      console.error(error);
      // showToast('请重新登录');
    });
  }


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
