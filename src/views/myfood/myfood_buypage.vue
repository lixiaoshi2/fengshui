<template>
  <van-nav-bar title="美食购买订单" left-text="返回" @click=" router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>


  <div>

    <div>
      <!-- <van-form @submit="onSubmit" style="margin-bottom:65px; "> -->
      <!-- 在双括号里的router不要this，而在click里的参数则需要this变量 -->

      <!-- {{ id }} --><!-- 这个id来源于data里的this.$route.query.id,从url里获取 -->
      <div @click="router.push(producturl)" style="background-color: white;width: 70%;">
        <img :src="selectedImage" alt="" />
      </div>


      <!-- 收货人信息 -->
      <van-field v-model="guest_name" name="buyname" label="收货人" @click="getbuyerinfo" placeholder="点击获取收货人信息"
        readonly />
      <van-field v-model="guest_phone" name="guest_phone" label="收货电话" placeholder="请输入收货人电话" readonly />
      <van-field v-model="guest_addr" name="guest_addr" label="收货地址" placeholder="请输入收货人地址" readonly />
      <!-- 商家信息 -->
      <van-field v-model="yizhan_name"  name="biaoti" style="color:blue" label="购买商店"
        readonly />
      <van-field v-model="yizhan_addr" name="biaoti" style="color:blue" label="取货地址" readonly />
      <van-field v-model="yizhan_phone" name="biaoti" style="color:blue" label="商店电话" readonly />
      <van-field v-model="zongdian_phone" name="biaoti" style="color:blue" label="总店电话" readonly />
      <van-field v-model="email" name="email" label="商家邮件" readonly />
      <van-field v-model="weixin" name="email" label="商家微信" readonly />
      <!--购买物品信息  -->
      <van-list style="margin-bottom: 10px;">

        <van-cell style="margin-top: -10px;">
          <span style=" float: left;color:brown;" v-if="retnull === '无数据'">暂时没有您搜索的内容</span>
        </van-cell>
        <div style="margin-top: 0px;margin-left: 10px; height: 20px;">
          <span style=" font-weight: bold ;font-size: medium;  color:brown;" v-if="yizhan_name != ''">{{ yizhan_name
            }}</span>
        </div>
        <!-- 这是购物车的内容 -->
        <div class="goodslist" v-for="(item, index) in listdata2" :key="item.id">

          <div class="full-screen-layout">

            <!-- 左侧图片 -->
            <div class="image" @click.prevent="goToDetails(item)">
              <img :src="item.goodsimg || defaultImgUrl" class="thumb-img" alt="产品图片">
            </div>

            <!-- 右侧信息 -->
            <div class="info" style="margin-top: 5px;  position: relative;   height: 100px; ">
              <div class="info-item">
                <!-- <span class="label">订单号：</span> -->

                <span style="font-size: 15px; color:black"> <a style="color: black;" :href="`/${item.id}`"
                    @click.prevent="goToDetails(item)">
                    {{ item.goodsname }}
                  </a> </span>
              </div>

              <!-- <div @click="delitem(index)"
                style="position: absolute; align-items: center;  bottom: 40px;    width: 96%; display: flex; justify-content: flex-end; ">
                <van-button style="text-align: right;">删除</van-button>
              </div> -->

              <div style="position: absolute; align-items: center;  bottom: 20px;    width: 100%; display: flex; ">
                <div class="info-item " style="margin-right: 10px;">
                  <!-- <span class="titleclass2"></span> -->
                  <span style="font-size: small;" class="value">单价: {{ item.price }}</span>
                </div>

                <div class="info-item" style="display: flex ; align-items: center;">
                  <!-- <span><van-button type="primary" size="middle" @click="jianyi(item)"> - </van-button></span> -->
                  <span class="value" style="margin-right: 10px;;font-size: small;"> 数量：{{ item.shuliang }}</span>
                  <!-- <span><van-button type="primary" size="middle" @click="jiayi(item)"> + </van-button></span> -->
                  <span style="margin-right: 5px;font-size: 14px;"> 小计 {{ xiaoji(item) }}</span>

                </div>
              </div>
            </div>


          </div>
          <div style="width: 100%; height: 3px; background-color:aliceblue;"></div>
        </div> <!-- 上边图片和信息的内容结束 -->

      </van-list>
      <!-- 购物车下面的汇总主句 -->
      <div style="margin-left: 15px; ">
        <span style="font-weight: bolder; font-size: small;"> 总数量： </span> <span> {{ totalquantity }}</span>
        <span style="font-weight: bolder;font-size: small;margin-left: 15px; "> 餐费： </span> <span> {{ totalmoney
          }}</span>
        <span style="font-weight: bolder;font-size: small;margin-left: 15px; "> 运费： </span> <span> {{ yunfei }}</span>
        <span style="font-weight: bolder;font-size: small;margin-left: 15px; "> 总金额： </span> <span> {{ totalyunfei
          }}</span>
      </div>


      <van-cell style="font-weight: bolder;" title="请选择取货方式(部分驿站不提供配送请看清楚)"></van-cell>
      <div class="container">
        <div class="box2">
          <div class="inner-box2">

            <van-radio-group v-model="paymode">
              <van-radio style="margin-bottom: 5px;" name="1" :disabled="isDeliveryDisabled">
                送餐(不超过2公里，每份加收1.5元，3份起送)
              </van-radio>
              <van-radio name="2">自取</van-radio>
            </van-radio-group>
          </div>
        </div>
      </div>

      <van-field style="" v-model="orderbeizhu" name="beizhu" label="备注" placeholder="请标注提餐时间及不吃的佐料" />


      <div style="margin: 16px; margin-bottom: 70px;">
        <van-button round block type="primary" @click="show_payaction">提交订单</van-button>
        <!-- <van-button round block type="primary" native-type="submit">添加到购物车</van-button> -->
      </div>


      <!-- <div id="card-element"></div>
      
      <div style="margin: 16px; margin-bottom: 70px;">
            <van-button round block type="primary" @click="handlePayment(order_id)">提交订单支付</van-button>
           
        
      </div>  -->


    </div>

  </div>
</template>

<script setup>


import axios from 'axios';
import config from '@/global.config.js'
import md5 from 'js-md5'
import userfunc from '@/utils/api.js'
import https from '@/utils/request.js';
// import { useStore } from 'vuex'
import { showToast, showDialog, showConfirmDialog } from 'vant';
import { ref, onMounted, computed, reactive, watch, onActivated } from 'vue';
import { loadStripe } from '@stripe/stripe-js';

// import textEditor  from "@/components/textEditor5.vue"  
// import weizhi from '@/components/weizhi.vue'
import userFunc from '../../utils/userfunc';
// var userinfo = ref()
// 购买者信息
// 测试
var guest_user = ref('');
var guest_name = ref('');
var guest_phone = ref('');
var guest_addr = ref('');
const processing = ref(false);
const error = ref(null);
const amount = 50;
const moneyandyunfei = ref(0)
const shuliang2 = ref(0)
// stripe 支付


const paymentMessage = ref('');
let card = null

//  处理真实的银行卡付款过程
const handlePayment = async (order_id) => {

  console.log('zongjine', moneyandyunfei.value)
  // 先在自己的服务器生成订单
//
  const stripePromise = loadStripe(config.strip_pk);
  // const stripePromise = loadStripe('pk_test_51QSNgTLrY4OYG7KK5xOq3kNJzFC78ka4NBvLuLU8pmOOTMDUO1m9Qt2Aw7ze34tEn3zjXZPY4lDShAcgS4FDkPlb00aDuNUh2H');
  // const stripePromise = loadStripe('pk_live_51QSNgTLrY4OYG7KKhv7jjjOvLOazy5Jn1DmD8rsQfAGDKowdbynLK7hE4T03PDZdnesLfD1aU6zuU5UusiYUNAdj00P9JwfICd');
  try {
    // 调用后端 API 获取支付会话 URL
    const stripe = await stripePromise;

    if (!stripe) {
      throw new Error("Stripe 初始化失败！");
    }

    const amount = moneyandyunfei.value * 100; // 动态金额（单位：美分）
    const shuliang = totalquantity.value; // 订单包含的购买商品的数量
    // const order_id2 = order_id
    const response = await https.post('/api/myfood/create-payment-intent/', { amount, shuliang, order_id });
    const { url } = await response
    console.log('url222', url)

    // const response = await https.post('/api/myfood/create-payment-intent/');
    // const { url } = response.data;

    // 跳转到 Stripe 支付页面
    if (url) {
      console.log('here')
      // window.location.href = 'www.google.com';
      window.location.href = url;

    }
  } catch (error) {
    console.error("Error during payment initiation:", error);
    alert("无法启动支付，请稍后再试。");
  }
};


// 运费
const yunfei = computed(() => {
  if (paymode.value == '1') {
    return totalquantity.value >= 4 ? totalquantity.value * 1.5 : 0;
  }
  return 0
});
// 获取运费加餐费
const totalyunfei = computed(() => {
  moneyandyunfei.value = totalmoney.value + yunfei.value;
  return totalmoney.value + yunfei.value;
});
// 小于4就不允许送餐，要自取
const isDeliveryDisabled = computed(() => totalquantity.value < 3);
// 商店信息
var title = ref('');
var yizhan_name = ref('');
const shop_fenlei = ref('myfood')   // 这个用于商店的url定位，商店分类
const goodsid = ref('')


// 驿站信息
const yizhanuserid = ref('')
var yizhan_addr = ref('');
var yizhan_phone = ref('');

// 经营者信息
const jingyingzheid = ref('')
var zongdian_phone = ref('');
var email = ref('');
var weixin = ref('')

// 订单信息
const orderbeizhu = ref('')
var paymode = ref('2')
const totalquantity = ref(0)


const totalmoney = ref(0)


const shop_id = ref('')   // 这个用于商店的url定位 ，商店的id

const getbuyerinfo = () => {
  console.log('获取您的信息')
  localStorage.setItem('getaddr', 1)
  router.push({ path: `/address` })
}

const selectedImage = ref('')
const productid = ref('')
const color = ref('')
const cost = ref('')
var radio21 = ref('')
const radio22 = ref('1')
var beizhu = ref('')

const listdata2 = ref([])   //这个变量定义了提供数据到
const retnull = ref('')
// import Editor from '@tinymce/tinymce-vue'
//

import { useRouter, useRoute } from 'vue-router'
//  import { KeepAlive } from 'vue';
const router = useRouter()
const route = useRoute()


const buypage = ref('')

const defaultImgUrl = "/nopic.jpg"
// const defaultImgUrl = "@/assets/icon/logo3.png"
//                        @/assets/icon/logo3.png
// const defaultImgUrl = "/src/assets/icon/logo3.png"
// 获取详情
const goToDetails = (item) => {
  console.log('id', item.goodspage, item.goodsid);

  route.meta.isPush = false; //这段代码让
  router.push({
    path: `/${item.goodspage}/${item.goodsid}`,
    // query: {
    //   id
    // }
  });
  // router.push({ name: 'kitchen_detail', params: { id } });
}


// 加一的计算
const jiayi = (item) => {
  if (item.shuliang >= 0) {
    item.shuliang++;
  }
}



const zongheji = () => {

}

const jianyi = (item) => {
  if (item.shuliang > 0) {
    item.shuliang--;
  }
}
const heji = (data) => {
  let total = 0
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const subtotal = item.shuliang * item.price;  // 计算小计
    total += subtotal;  // 累加小计到合计数
  }
  return total
}
// 进入myfood的购买页面
const goumaiyemian = () => {
  console.log("goumaiyemian")
  if (Array.isArray(listdata2.value) && listdata2.value.length > 0) {
    buypage.value = listdata2.value[0].goodspage
    const buypageurl = buypage.value.split("_")[0]
    console.log(buypageurl)
    router.push({
      path: `/${buypageurl}_buypage`,
      // query: {
      //   id
      // }
    });
  }
}

const xiaoji = (item) => {
  // return 1*2
  // return item.price
  return Number(item.price) * Number(item.shuliang)
}



// console.log(route.params.img)
console.log(route.query.img)


selectedImage.value = config.backendserver + '/' + route.query.img;

productid.value = route.query.productid;
color.value = route.query.color;
cost.value = route.query.cost

// 这是获取
const pickaddr = route.query.pickaddr
title.value = route.query.title

// import Editor from '@tinymce/tinymce-vue'
let content = ref('')
let content_id = ref('')
let centwarehouse = ref('')   //中心仓的位置
const selleruserid = ref('')
let producturl = ref('')
// console.log()
// const a = userFunc.separateLettersAndNumbers(productid.value) 
const a = "userFunc.separateLettersAndNumbers(productid.value) "
// // // // myfood_detail?id=14
const url = `/${a.letters}_detail?id=${a.numbers}`
producturl.value = url
console.log('producturl', producturl.value)


// // 实际付款动作，将付款写入订单系统
const payaction = () => {
  console.log("实际写入订单表", listdata2.value)
  const params = listdata2.value.map(item => ({
    // 首先是店的信息
    "shopname": yizhan_name.value,   //商店名字
    "goodspage": shop_fenlei.value,  //商店页面分类
    "goodsid": goodsid.value,   //商店页面id

    // 具体的订单信息，包含商品名和数量等
    // id: item.id, // 如果需要字符串格式的 id 店内商品id，没必要了，用名字就可以了
    'shuliang': item.shuliang, // 商品的数量数量值
    'goodsname': item.goodsname, // 
    "price": item.price,//价格
    "imgurl": item.goodsimg,//价格
    // "is_paid":selleruserid.value ,//支付状态
    "paymode": paymode.value,//支付方法
    // "status":selleruserid.value ,//订单状态
    // "ordersid":selleruserid.value ,//订单共同id，代表是一同付款的
    // "paidmoney":selleruserid.value ,//订单共同id，代表是一同付款的
    "orderbeizhu": orderbeizhu.value,//订单备注

    // 购买者包含收货人信息
    "buyeruserid": guest_user.value,   //购买用户id
    "shouhuoname": guest_name.value,   //收货人名字
    "shouhuoaddr": guest_addr.value,  // 收货人地址
    "shouhuophone": guest_phone.value,  //收货人电话
    // 驿站信息
    "yizhanuserid": yizhanuserid.value,  // 驿站用户id
    "phone": yizhan_phone.value,  // 驿站电话
    "yizhanaddr": yizhan_addr.value,   //驿站也是取货地址
    // "city": content.value,   //驿站城市
    // 经营者信息
    "jingyingzheid": jingyingzheid.value,     //经营者id
    "phone2": zongdian_phone.value,   //经营者电话
    "email": email.value,   //经营者email
    "weixin": weixin.value,   //经营者微信

  }));

  console.log('订单参数', params)

  // if (localStorage.getItem("is_postorder")==null){


  https.post('/api/myfood/addorder/', params).then(response => {
    // console.log('已经成功在数据库中提交订单');
    console.log('提交数据库的数据', response);
    // console.log('提交数据库的数据', response.updated);
    // 提交数据以后就不能再反复提交了，除非重新保存了购物车
    localStorage.setItem("is_postorder", "1")
    // 先提交到数据库形成点单记录
    console.log("adsf111",response.insufficient_stock)
    console.log("adsf111",response.insufficient_stock.length)
    if (response.insufficient_stock && response.insufficient_stock.length>0){
      showDialog({message:'您的订单中包含超库存商品，请重新刷新购物车'});
    }

    // console.log('返回的长度', response.status.length)
    if (response.updated && response.updated.length > 0) {
      console.log("大于0可以",response.updated)
      console.log(response.updated[0].ordersid)
      const order_id = response.updated[0].ordersid
      console.log('order_id',order_id)
      // 线上支付从这里开始
     
      handlePayment(order_id) ; // 在这里形成支付。

      // showDialog({message:"下单成功请到我的美食订单里查看下单内容"})
      
    }

  }).catch(error => {
    console.log('出错了2');
    console.error(error);
  });

}

// 在这里确定是否线上支付

const onlineOrNot = (response)=>{
  showConfirmDialog({
    // title: '标题',
    message:
      '请核对您预定的商店和位置，确定采用线上支付，'
  })
    .then(() => {
    
      console.log('确认线上支付')
      console.log('返回的长度', response.length)
    if (response.length > 0) {
      console.log("大于0可以")
      console.log(response[0].ordersid)
      const order_id = response[0].ordersid
      // 线上支付从这里开始
      handlePayment(order_id) ; // 在这里形成支付。
    }
      
    })
    .catch(() => {
      // on cancel
      console.log('取消订单或线下购买')
    });
}

// // 显示付款对话框
const show_payaction = () => {
  // console.log('adsfa')
  // console.log('下单',orderbeizhu.value)
  if(orderbeizhu.value==''){
    showDialog({message:"请提交用餐的大概时间,或口味不吃的佐料等，客服也会在此回复您"})
  }
  else{  
  orderbeizhu.value
  console.log("显示订单的确认对话框")
  // router.push( `/product_order_list?&userid=${productid.value}&allmoney=${allmoney.value}`)
  showConfirmDialog({
    // title: '标题',
    message:
      '有的驿站不提供配送，请核对您采购的商店位置及其他信息，下单后，食物将准备，不退款退货，确认后进入支付环节'
  })
    .then(() => {
      // tongju.value="20"
      // content.value = content.value
      console.log('确认下单')
      // console.log("实际写入订单表",listdata2.value)
      payaction(); // 这段代码具体执行系统下单
    })
    .catch(() => {
      // on cancel
      console.log('取消订单或线下购买')
    });

  }
}


// 使用 router.go(-1);已经不能用onmounted来激活新的页面 ，页面需要保活在app.vue 设置
onActivated(() => {
  console.log('激活了')
  guest_name.value = localStorage.getItem('username2')
  guest_phone.value = localStorage.getItem('userphone2')
  guest_addr.value = localStorage.getItem('fulladdr2')

  // getdata()
  localStorage.setItem("getaddr", 0)


});

const getdata = () => {
  console.log('货物数据前')
  https.get((`/api/mycart/list/`)).then(response => {

    console.log('huoqushuju')

    listdata2.value = response.cart_info
    
    // yizhan_name.value = response.cart_info[0].shopname
    // yizhan_addr.value = response.cart_info[0].pickaddr
    // console.log('取货地址',yizhan_addr.value)
    // console.log('Array.isArray(response)',Array.isArray(response.cart_info))

    if (Array.isArray(response.cart_info) && response.cart_info.length > 0) {
      console.log("数组有数据");
      yizhan_name.value = response.cart_info[0].shopname
      yizhan_addr.value = response.cart_info[0].pickaddr
      console.log('取货地址',yizhan_addr.value)
      yizhan_phone.value = response.cart_info[0].phone

      jingyingzheid.value = response.cart_info[0].jingyingzhe_id
      zongdian_phone.value = response.cart_info[0].phone2
      email.value = response.cart_info[0].email
      weixin.value = response.cart_info[0].weixin
      goodsid.value = response.cart_info[0].goodsid
      guest_user.value = response.cart_info[0].user
      yizhanuserid.value = response.cart_info[0].yizhan_ownerid

      for (let i = 0; i < response.cart_info.length; i++) {
        totalquantity.value += response.cart_info[i].shuliang;
        totalmoney.value += response.cart_info[i].shuliang * response.cart_info[i].price;
      }
    } else {
      console.log("数组为空");
    }
  }).catch(error => {
    console.log('出错了2');
    console.error(error);

  });
}
// 
onMounted(() => {
  //
  guest_name.value = localStorage.getItem('username2')
  guest_phone.value = localStorage.getItem('userphone2')
  guest_addr.value = localStorage.getItem('fulladdr2')
  console.log('进入购买页面')
  const user_id = localStorage.getItem("user_id")
  if (user_id == null) {
    console.log('还没有登录')
    router.push('/user_login')
  }

  getdata()

});



</script>

<style scoped>
.van-form {
  background-color: white;
}

.text-content {
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;
  color: #333;
  background-color: white;
  color: rgb(77, 80, 241)
}

/* :deep(#van-field-10-label){ */
:deep(.van-cell__title) {
  width: 60px;
}

.w-e-textarea-2 {
  height: 100px;
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

:deep(#van-field-1-input) {
  font-weight: bold;

  color: purple;
}



/* 从mycar 拷贝过来的数据 */

.foot-container {
  display: flex;
  background-color: bisque;
  /* justify-content: center;  */
  height: 40px;
  width: 100%;
  /* height: 100vh;    */
  position: fixed;
  /* 固定在页面 */
  bottom: 45px;
  /* 紧贴页面底部 */
}

.quanxuan {
  width: 15%;
  margin: 0 10px;
  /* 为两个元素之间添加一些间距 */
  margin-left: 8px;
  align-items: center;
  /* 垂直居中 */
  height: 100%;
  margin-top: 5px;

}

.jiage {
  width: 25%;
  margin: 0 10px;
  /* 为两个元素之间添加一些间距 */
  margin-right: 10px;
  align-items: center;
  /* 垂直居中 */
  height: 100%;
  margin-top: 5px;

}

.tijiao {
  /* width: 15%; */
  margin: 0 10px;
  /* 为两个元素之间添加一些间距 */
  margin-right: 10px;
  align-items: center;
  /* 垂直居中 */
  height: 100%;
  margin-top: 5px;

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

:deep(.van-cell__title) {
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


:deep(.van-card-desc) {
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