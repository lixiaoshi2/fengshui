
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

      <van-field v-model="orders_id" name="buyname" label="订单号"  readonly />
      <!-- 收货人信息 -->
      <van-field v-model="guest_name" name="buyname" label="收货人" placeholder="点击获取收货人信息"
        readonly />
      <van-field  v-model="guest_phone" name="guest_phone" label="收货电话" @click="phoneClick" placeholder="请输入收货人电话" readonly />
      <van-field  v-model="guest_addr" name="guest_addr" label="收货地址" placeholder="请输入收货人地址" readonly  @click="loadGoogleMap1" />
      <!-- 商家信息 -->
      <van-field v-model="yizhan_name"  name="biaoti" style="color:blue" label="购买商店"
        readonly />
      <van-field v-model="yizhan_addr" name="biaoti" style="color:blue" @click="loadGoogleMap2" label="取货地址" readonly />
      <van-field v-model="yizhan_phone" name="biaoti" @click="phoneClick2" style="color:blue" label="商店电话" readonly />
      <van-field v-model="zongdian_phone" name="biaoti" @click="phoneClick3" style="color:blue" label="总店电话" readonly />
      <van-field v-model="email" name="email" label="商家邮件" readonly />
      <van-field v-model="weixin" name="email" label="商家微信" readonly />
      <!--购买物品信息  -->
      <van-list style="margin-bottom: 10px;">

        <van-cell style="margin-top: -10px;">
          <span style=" float: left;color:brown;" v-if="retnull === '无数据'">暂时没有您搜索的内容</span>
        </van-cell>

        <!-- 这是购物车的内容 -->
        <div class="goodslist" v-for="(item, index) in listdata2" :key="item.id">

          <div class="full-screen-layout">

            <!-- 左侧图片 -->
            <div class="image" @click.prevent="goToDetails(item)">
              <img :src="item.imgurl || defaultImgUrl" class="thumb-img" alt="产品图片">
            </div>

            <!-- 右侧信息 -->
            <div class="info" @click.prevent="goToDetails(item)"
              style="margin-top: 5px;  position: relative;   height: 100px;  ">
              <div class="info-item">
                <!-- <span class="label">订单号：</span> -->

                <span style="font-size: 15px; color:black"> <a style="color: black;" :href="`/${item.id}`"
                    @click.prevent="goToDetails(item)">
                    {{ item.goodsname }}
                  </a> </span>
              </div>

              <div class="info-item">
                <span style="font-size: 15px; color:black">  单价：{{ item.price }}             </span>

              </div>

              <div class="info-item">
                <!-- <span class="label">订单号：</span> -->

                   <span style="font-size: 15px; color:black">数量：{{ item.shuliang }}</span>  


              </div>

              <div class="info-item">
               
                  <span style="margin-right: 5px;font-size: 14px;"> 小计： {{ xiaoji(item) }}</span>
              </div>
            
              
            </div>


          </div>
          <div style="width: 100%; height: 3px; background-color:aliceblue;"></div>
        </div> <!-- 上边图片和信息的内容结束 -->

      </van-list>
      <!-- 购物车下面的汇总主句 -->
      <div style="margin-left: 15px; ">
        <span style="font-size: 14px;"> 总数量： </span>                   <span style="font-size: 14px;"> {{ totalquantity }}</span>
        <span style="font-size: 14px;margin-left: 10px; "> 餐费： </span>  <span style="font-size: 14px;"> {{ totalmoney }}</span>
        <span style="font-size: 14px;margin-left: 10px; "> 运费： </span>  <span style="font-size: 14px;"> {{yunfei }}</span>
        <span style="font-size: 14px;margin-left: 10px; "> 总金额： </span><span style="font-size: 14px;"> {{ totalyunfei }}</span>
      </div>

      <div style="margin-left: 15px; margin-top: 20px;">

        <span style="font-size: small; margin-left: 0px; margin-top:25px "> 取货方式(请查看此店是否提供配送)： </span>   <span style="font-size:13px ;"> 
          <template v-if="paymode === '1'">送货</template>
          <template v-else-if="paymode === '2'">自取</template>
          <template v-else>未知</template>

        </span>
      </div>

      <van-field style="" v-model="orderbeizhu" name="beizhu" label="备注" placeholder="添加额外的信息" />


      <div style="margin: 16px; margin-bottom: 70px; font-size: small;">
        <span style="margin-right: 15px; color: brown;">  {{ status }} </span>
        
        <button  class="order-btn detail-btn">已处理</button>
        <button class="order-btn detail-btn"  @click="myfoodorder_done(myfoodorder_id);">已完成</button>
        <!-- <button class="order-btn detail-btn"> 哈哈哈 </button> -->
        <button class="order-btn detail-btn" @click="router.go(-1);" > 返回列表 </button>

      </div>


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
  import { showToast,showDialog,showConfirmDialog } from 'vant';
  import { ref, onMounted, computed,reactive,watch,onActivated } from 'vue';


  // import textEditor  from "@/components/textEditor5.vue"  
  // import weizhi from '@/components/weizhi.vue'
  import userFunc from '../../utils/userfunc';
  // var userinfo = ref()
  // 购买者信息
  const myfoodorder_id =ref('')
  var guest_user= ref('');
  var guest_name= ref('');
  var guest_phone= ref('');
  var guest_addr= ref('');
 
  const moneyandyunfei= ref(0)
  
  // stripe 支付
    
  
  var status = ref('')

// 打开电话
  const phoneClick = ()=>{
  var callUrl = "tel:" + encodeURIComponent(guest_phone.value);

 window.location.href = callUrl;
}
// 拨打电话
const phoneClick2 = ()=>{
  var callUrl = "tel:" + encodeURIComponent(yizhan_phone.value);

 window.location.href = callUrl;
}
// 拨打电话
const phoneClick3 = ()=>{
  var callUrl = "tel:" + encodeURIComponent(zongdian_phone.value);
 window.location.href = callUrl;
}

// 打开收货人地图
const loadGoogleMap1 = () =>{
 
    // https://www.google.com/maps/dir/Finch+Ave+East+at+Victoria+Park+Ave,
    let url = 'https://www.google.com/maps/place/' +guest_addr.value
    window.open(url)
  }

  const loadGoogleMap2 = () =>{
 
 // https://www.google.com/maps/dir/Finch+Ave+East+at+Victoria+Park+Ave,
 let url = 'https://www.google.com/maps/place/' +yizhan_addr.value
 window.open(url)
}
  
 
  // 运费
  const yunfei = computed(() => {
    if (paymode.value=='1'){
      return totalquantity.value >= 4 ? totalquantity.value * 1.5 : 0;
    }
    return  0
  });
  // 获取运费加餐费
  const totalyunfei = computed(() => {
    moneyandyunfei.value = totalmoney.value + yunfei.value;
    return totalmoney.value + yunfei.value;
  });
  // 小于4就不允许送餐，要自取
  const isDeliveryDisabled = computed(() => totalquantity.value < 4);
  // 商店信息
  var title= ref('');
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
  var email= ref('');
  var weixin = ref('')
 
  // 订单信息
  const orderbeizhu = ref('')
  var paymode = ref('2')
  const totalquantity = ref(0)


  const totalmoney = ref(0)

  
  const shop_id = ref('')   // 这个用于商店的url定位 ，商店的id

  

  const selectedImage = ref('')
  const productid = ref('')
  const color = ref('')
  const cost = ref('')
  var radio21 = ref('')
  const radio22 = ref('1')
  var beizhu = ref('')
  const orders_id = ref('')
  const listdata2=ref([])   //这个变量定义了提供数据到
  const retnull = ref('')
// import Editor from '@tinymce/tinymce-vue'
//

import { useRouter,useRoute } from 'vue-router'
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
  console.log('id',item.goodspage,item.goodsid);
  
  route.meta.isPush = false; //这段代码让
  router.push({
    path: `/${item.goodspage}_detail/${item.goodsid}` , 
    // query: {
    //   id
    // }
  });
  // router.push({ name: 'kitchen_detail', params: { id } });
}

// myfoodorder_done 订单已处理完
const myfoodorder_done = (myfoodorder_id) => {
  console.log('ads',myfoodorder_id);
  
  https.put(`/api/myfood/myfoodorder_done/${myfoodorder_id}/`).then(response => {
    // console.log('asdfas555111');
    console.log(response);
    status.value = "已完成"
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

// 加一的计算
const jiayi = (item) =>{
  if (item.shuliang >= 0) {
        item.shuliang++;
      }
}



const zongheji = () =>{
  
}

const jianyi = (item) =>{
  if (item.shuliang >0) {
        item.shuliang--;
      }
}
const heji = (data) =>{
  let total = 0
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const subtotal = item.shuliang * item.price;  // 计算小计
    total += subtotal;  // 累加小计到合计数
  }
  return total
}
// 进入myfood的购买页面
const goumaiyemian = ()=>{
  console.log("goumaiyemian")
  if (Array.isArray(listdata2.value) && listdata2.value.length > 0){
    buypage.value = listdata2.value[0].goodspage
    const buypageurl = buypage.value.split("_")[0]
    console.log(buypageurl)
    router.push({
      path: `/${buypageurl}_buypage` , 
      // query: {
      //   id
      // }
    });
    }
}

const xiaoji = (item ) =>{
    // return 1*2
  // return item.price
    return Number(item.price)*Number(item.shuliang )
}



  // console.log(route.params.img)
  console.log(route.query.img)

  
  selectedImage.value = config.backendserver +'/'+ route.query.img;
  
  productid.value =  route.query.productid;
  color.value =  route.query.color;
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
  console.log('producturl',producturl.value)

    // 获取中心仓的位置

  //   let subWarehouseToFind = route.query.pickaddr
  //   // centwarehouse.value = userFunc.findCentralWarehouse(subWarehouseToFind)
  //   centwarehouse.value = 'userFunc.findCentralWarehouse(subWarehouseToFind)'
  //   console.log('asdfasd22222')
  //   console.log('中心仓',centwarehouse.value)
  //   const selectaddr = () =>{
  //   console.log('请选择地址后返回')
  //   router.push('/address/')
  // }

  // // 实际付款动作，将付款写入订单系统
  const payaction = ()=>{
    console.log("实际写入订单表",listdata2.value)
    const params = listdata2.value.map(item => ({
      // 首先是店的信息
      "shopname": yizhan_name.value,   //商店名字
      "goodspage": shop_fenlei.value,  //商店页面分类
      "goodsid": goodsid.value,   //商店页面id

      // 具体的订单信息，包含商品名和数量等
      // id: item.id, // 如果需要字符串格式的 id 店内商品id，没必要了，用名字就可以了
      'shuliang': item.shuliang, // 商品的数量数量值
      'goodsname': item.goodsname, // 
      "price":item.price ,//价格
      // "is_paid":selleruserid.value ,//支付状态
      "paymode":paymode.value ,//支付方法
      // "status":selleruserid.value ,//订单状态
      // "ordersid":selleruserid.value ,//订单共同id，代表是一同付款的
      // "paidmoney":selleruserid.value ,//订单共同id，代表是一同付款的
      "orderbeizhu":orderbeizhu.value ,//订单备注


      // 购买者包含收货人信息
      "buyeruserid": guest_user.value,   //购买用户id
      "shouhuoname": guest_name.value,   //收货人名字
      "shouhuoaddr": guest_addr.value,  // 收货人地址
      "shouhuophone": guest_phone.value,  //收货人电话
      // 驿站信息
      "yizhanuserid": yizhanuserid.value,  // 驿站用户id
      "phone": yizhan_phone.value,  // 驿站电话
      "yizhanaddr" : yizhan_addr.value,   //驿站也是取货地址
      // "city": content.value,   //驿站城市
      // 经营者信息
      "jingyingzheid": jingyingzheid.value,     //经营者id
      "phone2":zongdian_phone.value,   //经营者电话
      "email":email.value,   //经营者email
      "weixin":weixin.value,   //经营者微信

    }));

  console.log('adf',params)

  // if (localStorage.getItem("is_postorder")==null){
 

  https.post('/api/myfood/addorder/',params).then(response => {
    console.log('已经成功在数据库中提交订单');
    console.log('提交数据库的数据',response);
    // 提交数据以后就不能再反复提交了，除非重新保存了购物车
    localStorage.setItem("is_postorder","1")
    // 先提交到数据库形成点单记录
    // 
    console.log('返回的长度', response.length)
    if (response.length>0){
      console.log("大于0可以")
      console.log( response[0].ordersid)
      const order_id = response[0].ordersid
      // 暂时不需要了
      //  handlePayment(order_id) ; // 在这里形成支付。
    }
    



  }).catch(error => {
    console.log('出错了2');
    console.error(error);
    
  });

    
   
  }

  


  
  // 使用 router.go(-1);已经不能用onmounted来激活新的页面 ，页面需要保活在app.vue 设置
  onActivated(() => {
    console.log('激活了')
    guest_name.value = localStorage.getItem('username2')
    guest_phone.value = localStorage.getItem('userphone2')
    guest_addr.value = localStorage.getItem('fulladdr2')

    // getdata()
    localStorage.setItem("getaddr",0)  


  });
  
  const getdata = () => {
    var a = `/api/myfood/myfoodorder_detail/${myfoodorder_id.value}/`
    console.log("a",a)
    https.get((`/api/myfood/myfoodorder_detail/${myfoodorder_id.value}/`)).then(response => {

      console.log('huoqushuju')

      listdata2.value = response.data
      response = response.data

      // yizhan_name.value = response[0].shopname
      console.log('assssss',response)
      // // console.log('assssss1',response[0])
      
      if (Array.isArray(response) && response.length > 0) {
        console.log("数组有数据");
        orders_id.value = response[0].ordersid
        yizhan_name.value = response[0].shopname
        status.value = response[0].status
        yizhan_addr.value = response[0].yizhanaddr
        yizhan_phone.value = response[0].phone
        guest_addr.value = response[0].shouhuoaddr
        guest_phone.value = response[0].shouhuophone
        guest_name.value = response[0].shouhuoname
        paymode.value = response[0].paymode
        jingyingzheid.value = response[0].jingyingzhe_id
        zongdian_phone.value = response[0].phone2
        email.value = response[0].email
        weixin.value = response[0].weixin
        goodsid.value = response[0].goodsid
        guest_user.value = response[0].user
        yizhanuserid.value = response[0].yizhan_ownerid
        orderbeizhu.value = response[0].orderbeizhu
        for (let i = 0; i < response.length; i++) {
          totalquantity.value += response[i].shuliang;
          totalmoney.value += response[i].shuliang * response[i].price;
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
   //获取订单参数
   console.log('adfasdf1111')
   myfoodorder_id.value = route.params.id;
  console.log('myfoodorder_id', myfoodorder_id.value)


  //  guest_name.value = localStorage.getItem('username2')
  //   guest_phone.value = localStorage.getItem('userphone2')
  //   guest_addr.value = localStorage.getItem('fulladdr2')
  //  console.log('进入购买页面')
  // const user_id = localStorage.getItem("user_id") 
  // if (user_id== null){
  //   console.log('还没有登录')
  //   router.push('/user_login')
  // }

  getdata()

  });
  
  
  
  </script>

  <style scoped>
.van-form{
  background-color: white;
}

.text-content {
  text-align: center;
 padding-left: 10px;
 padding-right: 10px;
  font-size: 14px;
  color: #333;
  background-color: white;
  color:rgb(77, 80, 241)

}

/* :deep(#van-field-10-label){ */
:deep(.van-cell__title){
  width: 60px;
}
.w-e-textarea-2{
 height: 100px;
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
  margin:10px;
  justify-content: center; /* 水平居中 */
  height: 100px;
}
.box2 {
  /*width: calc(32.33% - 10px);  每个盒子占据 1/3 宽度 */
  width:95%;
  /* border: 1px solid black; */
  box-sizing: border-box; /* 让边框计算在内 */
  border: 1px solid rgb(107, 210, 159);
  margin:5px;
  margin-top:-5px;
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
:deep(#van-field-1-input) {
  font-weight: bold;
  
  color: purple;
}



/* 从mycar 拷贝过来的数据 */

.foot-container{
    display: flex;
    background-color: bisque;
    /* justify-content: center;  */
    height: 40px; 
    width:100%;
    /* height: 100vh;    */
    position: fixed;            /* 固定在页面 */
    bottom:45px;                  /* 紧贴页面底部 */    
}

.quanxuan{   
   width: 15%;
   margin: 0 10px; /* 为两个元素之间添加一些间距 */
   margin-left: 8px;
   align-items: center;     /* 垂直居中 */
   height: 100%;  
   margin-top: 5px;       
 
}
 .jiage{   
   width: 25%;
   margin: 0 10px; /* 为两个元素之间添加一些间距 */
   margin-right: 10px;
   align-items: center;     /* 垂直居中 */
   height: 100%;  
   margin-top: 5px;       
 
}
.tijiao{   
   /* width: 15%; */
   margin: 0 10px; /* 为两个元素之间添加一些间距 */
   margin-right: 10px;
   align-items: center;     /* 垂直居中 */
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
    width:765px;
  }
}
/* 针对小屏幕 (如手机) 的样式 */
@media (max-width: 764px) {
  .foot-container {
    width: 100%; /* 让容器宽度占满屏幕宽度 */
  }
}

:deep .van-button{
    margin-top: 0px;
    height: 25px;
}

:deep(.van-cell__title){
 width:20%;
}
.info-item .van-button{
    width:30px;
    margin:10px;
    height: 25px;
    line-height: 20px; 
}

.container {
 width: 100%; /* 容器占满全部宽度 */
 display: flex; /* 使用 Flexbox 布局 */
 /*flex-wrap: wrap;  允许换行 */
 margin: 5px;
 margin-bottom: 0px;
}



.thumb-img {
 cursor: pointer; /* 鼠标指针样式为手型 */
 width: 100%; /* 缩略图宽度100% */
 height: auto; /* 自动调整高度 */
}


:deep(.van-card-desc) {
 white-space: pre-line; /* 允许文本根据需要自动换行 */
}


.goodslist{

 height: auto;
 padding-top: 10px;
 align-items: center; /* 垂直居中 */
 
 /* background-color: white; */
}

.full-screen-layout {
 display: flex;
 margin-bottom: 0px;

 height: auto;
 padding-top: 0px;
 align-items: center; /* 垂直居中 */
 justify-content: center; /* 水平居中 */
 background-color: white;
}

.image {
 margin-left: 5px;
 flex: 0 0 28%; /* 左侧图片固定宽度为屏幕宽度的一半 */
 /* max-width: 50%;  图片最大宽度为屏幕宽度的一半 */
 width: 30%; /* 设置容器宽度 */
  max-height: 170px; /* 设置容器高度 */
  overflow: hidden; /* 隐藏溢出的部分 */
}

.image img {
  width: 100%; /* 图片宽度适应容器宽度 */
  height: auto; /* 保持图片比例 */
  /* height: 150px; */
  object-fit: cover; /* 覆盖容器，并保持图片的比例 */
  object-position: center; /* 将图片的中心部分作为显示区域 */
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
 margin-top:-30px;
 padding-bottom: 5px;

 padding-right: 10px;
}



.label {
 font-weight: bold;
 font-size: 12px; /* 标签字体大小 */
}

.titleclass {
 font-size: 15px; /* 值字体大小 */
 /* font-size: bold; */
 font-weight: bold;
}
.titleclass2 {
 font-size: 13px; /* 值字体大小 */
 /* font-size: bold; */
 /* font-weight: bold; */
}
.value {
 font-size: 14px; /* 值字体大小 */
 /* font-weight: bold; */
 color: rgb(87, 84, 84);
}

.van-radio-group{
  font-size: 13px;
}


/* 按钮容器样式 */
.order-buttons {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 10px;
}

/* 按钮样式 */
.order-btn {
  padding: 3px 5px;
  border: none;
  margin-right:10px ;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  color: #fff;
}

/* 各按钮不同的颜色 */
.detail-btn {
  background-color: #3498db;
}

.delete-btn {
  background-color: #e74c3c;
}

.pay-btn {
  background-color: #2ecc71;
}

/* 按钮悬浮效果 */
.order-btn:hover {
  opacity: 0.8;
}

</style>