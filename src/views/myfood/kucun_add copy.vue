<template>
  <van-nav-bar title="美食购买订单" left-text="返回" @click=" this.$router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>


  <div>

    <div>



      <div style="display: flex; align-items: center;">
        <!-- 输入框 -->
        <van-field v-model="shop_id" name="shop_id" style="color: blue; flex: 1; margin-right: 8px;" label="商店id"
          placeholder="请输入您驿站的商品页面的id" />
        <!-- 按钮 -->
        <van-button type="primary" @click="getshopinf">
          查询
        </van-button>
      </div>

      <van-field v-model="retdata2.title" name="biaoti" style="color:blue" label="购买商店" readonly />
      <van-field v-model="retdata2.owner" name="biaoti" style="color:blue" label="业主" readonly />
      <van-field v-model="retdata2.yizhan_userid" name="biaoti" style="color:blue" label="业主id" readonly />

      <van-field style="" v-model="kucun" name="beizhu" label="备注" placeholder="添加额外的信息" />

      <div v-for="(item, index) in goods" :key="index" style="margin-bottom: 10px; display: flex; align-items: center;">
        <!-- 商品名称 -->
        <span style="width:300px;margin-left: 15px; font-size: small; margin-right: 8px;">{{ item.goodsname }}</span>
        <!-- 库存输入框 -->
        <van-field type="number" v-model="item.stock" placeholder="输入库存"
          style=" width: 50px; margin-right: 8px; padding: 4px; " />
      </div>

      <div style="display: flex; justify-content: center; margin: 16px; margin-bottom: 10px;">
        <van-button style="width: 100px;" @click="add_goods_kucun" round block type="primary">新增库存</van-button>
        <!-- <van-button round block type="primary" native-type="submit">添加到购物车</van-button> -->
      </div>

   
    </div>

    <van-field v-model="shopname" name="biaoti" style="color:blue" label="购买商店" readonly />
    <van-field v-model="yizhan_userid" name="biaoti" style="color:blue" label="业主id" readonly />
    <van-field v-model="goodsid" name="biaoti" style="color:blue" label="页面id" readonly />


    <div v-for="(item, index) in retdata4" :key="index" style="margin-bottom: 0px;">
      <!-- 第一行：商品名和库存输入框 -->
      <div style="display: flex; align-items: center;">
        <span style="width: 300px; margin-left: 15px; font-size: small; margin-right: 8px;">
          {{ item.goodsname }}
        </span>

        <van-field type="number" v-model="item.kucun" placeholder="输入库存"
          style="width: 50px; margin-right: 8px; padding: 4px;" />
      </div>

      <!-- 第二行：编辑和删除按钮 -->
      <div style="margin-top: 10px; display: flex; margin-right: 10px; margin-left: 10px; justify-content: center; border-bottom: 1px solid rgba(0, 0, 0, 0.1); padding-bottom: 10px;">
        <van-button size="small" type="primary" @click="editItem(item)" style="margin-right: 8px;">
          修改
        </van-button>

        <van-button size="small" type="danger" @click="deleteItem(item,index)">
          删除
        </van-button>
      </div>
    </div>

  </div>
  <div style="height: 10px; margin-bottom: 50px;"></div>
</template>

<script setup>


import axios from 'axios';
import config from '@/global.config.js'

import userfunc from '@/utils/api.js'
import https from '@/utils/request.js';

import { showToast, showDialog, showConfirmDialog } from 'vant';
import { ref, onMounted, computed, reactive, watch, onActivated, resolveComponent } from 'vue';


import { useRouter, useRoute } from 'vue-router'
//  import { KeepAlive } from 'vue';
const router = useRouter()
const route = useRoute()

const kucun = ref(0)
const shop_id = ref('')
// 驿站信息
const retdata3 = ref({})
const retdata4 = ref({})
const retdata2 = ref({})
const shopname =ref('')
const yizhan_userid =ref('')
const goodsid =ref('')
// 经营者信息
var goodsnames = ref({})
const jingyingzheid = ref('')
var goods = ref({})
//根据驿站用户的id获取商品名
const getshopinf = () => {

  https.get(('/api/myfood/detail2/' + shop_id.value + '/')).then(response => {

    retdata2.value = response;
    // shop_id.value = shop_id.value
    // console.log('response', retdata2.value)
    // goodsnames.value = [...retdata2.value.content.matchAll(/goodsname=([^&]*)/g)].map(match => decodeURIComponent(match[1]));
    // console.log('goodsnames', goodsnames)


    // // 转换为带 name 和 stock 属性的对象数组
    // goods.value = goodsnames.value.map((goodsname) => ({
    //   goodsname, // 设置 name 属性
    //   stock: 0, // 初始化 stock 属性为 0
    // }));
    // console.log('mapdata', goods)


  }).catch(error => {
    console.log('出错了2');
    showDialog({ message: '出错了，请一分钟后再访问，人有问题请联系客服' })
    console.error(error);
    // showToast('请重新登录');
  });
}

// 删除库存
const deleteItem = (item,index) =>{
  console.log('item',item)
  retdata4.value.splice(index,1);
 
  https.delete(('/api/myfood/delete_kucun/'+ item.id + '/')).then(response => {
  console.log("response",response)
  // listdata2.value = listdata2.value.filter(item => item.id !== id);

}).catch(error => {
  console.log('删除发布的信息出错');
  console.error(error);
  showToast('请重新登录');
});


  
}

// 修改库存
const editItem = (item) =>{
  console.log('item',item)

  https.put('/api/myfood/update_kucun/'+item.id+'/',item).then(response => {
    // console.log('asdfas555111');
    console.log(response);
    
    // 因为修改了购物车所以才可以重新提交订单
    localStorage.removeItem("is_postorder")
    // this.$router.push({ path: '/user_login' });
  }).catch(error => {
      console.log('需要添加用户详细信息');
      
      // showDialog("")
      console.error(error);
      // throw new Error('中断');
      // showToast('请重新登录');
  });
  

}

// 根据驿站用户的id获取商品名
const add_goods_kucun = () => {

  const params = goods.value.map(item => ({
    // 首先是店的信息
    "shopname": retdata2.value.title,   //商店名字
    "goodspage": 'myfood',  //商店页面分类
    "goodsid": retdata2.value.id,   //商店页面id

    'yizhanuserid': retdata2.value.yizhan_userid, // 商品的数量数量值
    'goodsname': item.goodsname, // 
    "kucun": item.stock,//价格

  }));

  console.log('params', params)

  https.post('/api/myfood/add_kucun/', params).then(response => {


    retdata3.value = response;
    shop_id.value = shop_id.value
    console.log('response', retdata2.value)
   


  }).catch(error => {
    console.log('出错了2');
    showDialog({ message: '您的访问次数过多，请一分钟后再访问' })
    console.error(error);
    // showToast('请重新登录');
  });
}


// 
onMounted(() => {
  https.get('/api/myfood/list_kucun/' ).then(response => {

    retdata4.value = response.results;
    shopname.value = response.results[0].shopname
    yizhan_userid.value = response.results[0].yizhanuserid
    goodsid.value = response.results[0].goodsid
  

  }).catch(error => {
    console.log('出错了2');
    showDialog({ message: '您不是驿站的owner，不能获取数据' })
    console.error(error);
    // showToast('请重新登录');
  });


});



</script>

<style scoped>
.van-form {
  background-color: white;
}


/* :deep(#van-field-10-label){ */
:deep .van-cell__title {
  width: 60px;
}



.container {
  width: 100%;
  /* 容器占满全部宽度 */
  display: flex;
  /* 使用 Flexbox 布局 */
  flex-wrap: wrap;
  /* 允许换行 */
  margin: 5px;


}

.box {
  width: calc(32.33% - 10px);
  /* 每个盒子占据 1/3 宽度 */

  /* border: 1px solid black; */
  box-sizing: border-box;
  /* 让边框计算在内 */
  border: 1px solid rgb(107, 210, 159);
  margin: 10px;
  justify-content: center;
  /* 水平居中 */
  height: 100px;
}

.box2 {
  /*width: calc(32.33% - 10px);  每个盒子占据 1/3 宽度 */
  width: 95%;
  /* border: 1px solid black; */
  box-sizing: border-box;
  /* 让边框计算在内 */
  border: 1px solid rgb(107, 210, 159);
  margin: 5px;
  margin-top: -5px;
  justify-content: center;
  /* 水平居中 */
  height: 70px;
}

.inner-box2 {
  padding: 10px;
  padding-top: 0px;
  display: flex;
  /* 使用 Flexbox 布局 */
  flex-direction: column;
  /* 子元素垂直排列 */
  height: 100%;
  /* 让内部容器占据父容器的全部高度 */
  justify-content: center;
  /* 水平居中 */

}

:deep #van-field-1-input {
  font-weight: bold;

  color: purple;
}


/* .quanxuan{
    line-height: 40;
    align-items: center;
    margin-top: 5px;
}
.van-button{
    height: 30px;
} */


@media (min-width: 765px) {
  .foot-container {
    width: 765px;
  }
}
/* 针对小屏幕 (如手机) 的样式 */
@media (max-width: 764px) {
  .foot-container {
    width: 100%;
    /* 让容器宽度占满屏幕宽度 */
  }
}

:deep .van-button {
  margin-top: 0px;
  height: 25px;
}

:deep .van-cell__title {
  width: 20%;
}

.info-item .van-button {
  width: 30px;
  margin: 10px;
  height: 25px;
  line-height: 20px;
}

.container {
  width: 100%;
  /* 容器占满全部宽度 */
  display: flex;
  /* 使用 Flexbox 布局 */
  /*flex-wrap: wrap;  允许换行 */
  margin: 5px;
  margin-bottom: 0px;
}



.thumb-img {
  cursor: pointer;
  /* 鼠标指针样式为手型 */
  width: 100%;
  /* 缩略图宽度100% */
  height: auto;
  /* 自动调整高度 */
}


:deep .van-card-desc {
  white-space: pre-line;
  /* 允许文本根据需要自动换行 */
}


.goodslist {

  height: auto;
  padding-top: 10px;
  align-items: center;
  /* 垂直居中 */

  /* background-color: white; */
}

.full-screen-layout {
  display: flex;
  margin-bottom: 0px;

  height: auto;
  padding-top: 10px;
  align-items: center;
  /* 垂直居中 */
  justify-content: center;
  /* 水平居中 */
  background-color: white;
}

.image {
  margin-left: 5px;
  flex: 0 0 28%;
  /* 左侧图片固定宽度为屏幕宽度的一半 */
  /* max-width: 50%;  图片最大宽度为屏幕宽度的一半 */
  width: 30%;
  /* 设置容器宽度 */
  max-height: 170px;
  /* 设置容器高度 */
  overflow: hidden;
  /* 隐藏溢出的部分 */
}

.image img {
  width: 100%;
  /* 图片宽度适应容器宽度 */
  height: auto;
  /* 保持图片比例 */
  /* height: 150px; */
  object-fit: cover;
  /* 覆盖容器，并保持图片的比例 */
  object-position: center;
  /* 将图片的中心部分作为显示区域 */
  border-radius: 12px;
  /* 圆角效果 */
}

.info {
  flex: 1;
  /* 右侧信息占据剩余空间 */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* 垂直顶部对齐 */
  align-items: flex-start;
  /* 左对齐 */
  padding-top: 5px;
  /* 右侧信息的内边距 */
  margin-left: 10px;
  margin-top: -30px;
  padding-bottom: 5px;

  padding-right: 10px;
}



.label {
  font-weight: bold;
  font-size: 12px;
  /* 标签字体大小 */
}

.titleclass {
  font-size: 15px;
  /* 值字体大小 */
  /* font-size: bold; */
  font-weight: bold;
}

.titleclass2 {
  font-size: 13px;
  /* 值字体大小 */
  /* font-size: bold; */
  /* font-weight: bold; */
}

.value {
  font-size: 14px;
  /* 值字体大小 */
  /* font-weight: bold; */
  color: rgb(87, 84, 84);
}

.van-radio-group {
  font-size: 13px;
}
</style>