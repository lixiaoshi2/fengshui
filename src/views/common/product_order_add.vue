
<template>
  <van-nav-bar title="付费页面" left-text="返回" @click=" router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <!-- 在双括号里的router不要this，而在click里的参数则需要this变量 -->




  <van-field style="color:aqua" v-model="title" :to="url" readonly name="title" />

  <div class="container" style=" margin-left: 15px; font-size: 1.2cap;">
    <div style="font-weight: bold;"> 您的广告链接： </div>
    <div class=""> {{ url }}</div>
  </div>


  <van-cell style="font-weight: bolder;" title="请选择支付的时长"></van-cell>

  <div class="container">


  </div>

  <van-cell style="font-weight: bolder;" :title="guanggaourl"></van-cell>


  <van-cell style="font-weight: bolder;" title="请选择付费的方式"></van-cell>
  <div class="container">
    <div class="box2">
      <div class="inner-box2">
        <div class="content"><van-radio v-model="radio21" readonly name="1" label="3个月">目前只支持e-transfer转账</van-radio>
        </div>

      </div>
    </div>
  </div>

  <van-cell style="font-weight: bolder;" title="转账电子邮件：lixiaoshi101@gmail.com"></van-cell>
  <van-cell style="font-weight: bolder;" title="转账账户名：XIAOSHI LI,   手机号码：4373406137"></van-cell>
  <van-cell style="font-weight: bolder;" title="注意：请将安全问题的答案设置成转账的手机号码，您的信息点击已支付后将立即被展示。"></van-cell>

  <div class="buttoncontainer"> <van-button type="primary" @click="showDialogbtn"
      style="width:80%">已支付（请完成支付后再点击）</van-button> </div>

</template>
  
  <script setup>
  import axios from 'axios';
  import config from '@/global.config.js'
  import md5 from 'js-md5'
  // import apiFun from '@/utils/api.js'
  import https from '@/utils/request.js';
  // import https from '@/utils/userfunc.js';
//   import { useStore } from 'vuex'
//   import { showToast } from 'vant';
  import { ref, onMounted, computed,reactive } from 'vue';
  import {  showFailToast, showSuccessToast,showToast, showConfirmDialog ,showDialog } from 'vant';
//   import textEditor  from "@/components/textEditor.vue"  
//   import weizhi from '@/components/weizhi.vue'
  import { useRouter,useRoute } from 'vue-router'
import userFunc from '../../utils/userfunc';
  const router = useRouter()
  const route = useRoute()
// order_add?postbiao_id=44&fenleibiao_id=55&title
  const productid = route.query.productid;
  let producturl = ref('')
  producturl.value = userFunc.separateLettersAndNumbers(productid)
  // // glasses_detail?id=14
  const url = `/${producturl.letters}_detail?id=${producturl.numbers}`
  producturl.value = url
 
  const guanggaourl = ref('')
  guanggaourl.value = '您想要支付的广告页面地址是：'+ producturl.value

  // const handle = (shichang,money)=>{
  //   // console.log('tongyi')
  //   order_money.value = money
  //   order_timelength.value = shichang
  //   // console.log(order_money.value)
  //   // console.log(order_timelength.value)
  // }


  </script>

<style scoped>

:deep .van-field__control{
    color: rgb(13, 110, 78);
}


.container {
  width: 100%; /* 容器占满全部宽度 */
  display: flex; /* 使用 Flexbox 布局 */
  flex-wrap: wrap; /* 允许换行 */
  margin: 5px;


}

.box {
  width: calc(32.33% - 10px); /* 每个盒子占据 1/3 宽度 */
  
  /* border: 1px solid black; */
  box-sizing: border-box; /* 让边框计算在内 */
  border: 1px solid rgb(107, 210, 159);
  margin:5px;
  justify-content: center; /* 水平居中 */
  height: 100px;
}

.inner-box {
  display: flex; /* 使用 Flexbox 布局 */
  flex-direction: column; /* 子元素垂直排列 */
  height: 100%; /* 让内部容器占据父容器的全部高度 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 内部盒子水平居中 */
  
}

.content {
  flex-grow: 1; /* 让内容均分高度 */
  height: 100%;
  display: flex; /* 使用 Flexbox 布局 */
  align-items: center; /* 内容垂直居中 */
}
.buttoncontainer {
  margin-top: 0px;
  margin-bottom: 50px;
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  /* align-items: center; 垂直居中 */
  /* height: 100vh; 填满整个视口高度 */
}

.box2 {
  /*width: calc(32.33% - 10px);  每个盒子占据 1/3 宽度 */
  width:95%;
  /* border: 1px solid black; */
  box-sizing: border-box; /* 让边框计算在内 */
  border: 1px solid rgb(107, 210, 159);
  margin:5px;
  justify-content: center; /* 水平居中 */
  height: 70px;
}
.inner-box2 {
  padding: 10px;
  padding-top: 0px;
  display: flex; /* 使用 Flexbox 布局 */
  flex-direction: column; /* 子元素垂直排列 */
  height: 100%; /* 让内部容器占据父容器的全部高度 */
  justify-content: center; /* 水平居中 */

}
.content2 {
  flex-grow: 1; /* 让内容均分高度 */
  height: 100%;
  display: flex; /* 使用 Flexbox 布局 */
  align-items: center; /* 内容垂直居中 */
}
</style>
