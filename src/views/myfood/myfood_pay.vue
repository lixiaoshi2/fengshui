
<template>
    <van-nav-bar title="美食支付" left-text="返回" @click=" this.$router.go(-1);" left-arrow>
        <template #right>
            <van-icon name="search" size="18" />
        </template>
    </van-nav-bar>


    <div>

      支付页面

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
    import { loadStripe } from '@stripe/stripe-js';
  
    // import textEditor  from "@/components/textEditor5.vue"  
    // import weizhi from '@/components/weizhi.vue'
    import userFunc from '../../utils/userfunc';
    // var userinfo = ref()
    // 购买者信息
    // 测试
    var guest_user= ref('');
    var guest_name= ref('');
    var guest_phone= ref('');
    var guest_addr= ref('');
    const processing = ref(false);
    const error = ref(null);
    const amount = 50;
    // stripe 支付
    // const stripePromise = loadStripe('pk_live_51QSNgTLrY4OYG7KKhv7jjjOvLOazy5Jn1DmD8rsQfAGDKowdbynLK7hE4T03PDZdnesLfD1aU6zuU5UusiYUNAdj00P9JwfICd'); // Replace with your Stripe publishable key
   
    const stripePromise = loadStripe('pk_test_51QSNgTLrY4OYG7KK5xOq3kNJzFC78ka4NBvLuLU8pmOOTMDUO1m9Qt2Aw7ze34tEn3zjXZPY4lDShAcgS4FDkPlb00aDuNUh2H'); 
    
    console.log( 'stripe2',stripePromise)
    
    const paymentMessage = ref('');
    let card = null
    const handlePayment = async () => {
      const stripe = await stripePromise; // 等待 Stripe 实例加载完成
      processing.value = true;
      error.value = null;
      try {
        var params = {
          'amount': 5 * 100
        }
  
        const response2 = await https.post('/api/myfood/create-payment-intent/', params)
  
        
  
        //  const elements = stripe.elements();
        //   const card = elements.create("card");
        //   card.mount("#card-element");
  
  
        const { client_secret } = await response2;
        console.log('ad', client_secret)
  
        const elements = stripe.elements();
  
        if (!card) {
        card = elements.create("card");
        card.mount("#card-element"); // 确保 #card-element 存在
      }
  
     
  
       
        const { error: stripeError } = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card,
          },
        });
  
        if (stripeError) {
          error.value = stripeError.message;
        } else {
          alert("支付成功！");
        }
  
  
      } catch (error) {
        console.error('Error during payment:', error);
        paymentMessage.value = 'Payment initiation failed.';
      }
  
  
    };
  
  
  
  
    // 运费
    const yunfei = computed(() => {
      if (paymode.value=='1'){
        return totalquantity.value >= 4 ? totalquantity.value * 1.5 : 0;
      }
      return  0
    });
    // 获取运费加餐费
    const totalyunfei = computed(() => {
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
  
    const getbuyerinfo = ()=>{
      console.log('获取您的信息')
      localStorage.setItem('getaddr',1)
      router.push({path: `/address`})
    }
  
    const selectedImage = ref('')
    const productid = ref('')
    const color = ref('')
    const cost = ref('')
    var radio21 = ref('')
    const radio22 = ref('1')
    var beizhu = ref('')
  
    const listdata2=ref([])   //这个变量定义了提供数据到
    const retnull = ref('')
  // import Editor from '@tinymce/tinymce-vue'
  
  
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
      path: `/${item.goodspage}/${item.goodsid}` , 
      // query: {
      //   id
      // }
    });
    // router.push({ name: 'kitchen_detail', params: { id } });
  }
  
  
  // 加一的计算
  const jiayi = (item) =>{
    if (item.shuliang >= 0) {
          item.shuliang++;
        }
  }
  
  // 可以不在
  // const zongshuliang = () =>{
  //   var totalQuantity
  //   for (let i = 0; i < listdata2.value.length; i++) {
  //     totalQuantity += listdata2.value[i].quantity;
  //   }
  //   return totalQuantity
  // }
  
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
    
    
  
    if (localStorage.getItem("is_postorder")==null){
  
        https.post('/api/myfood/addorder/',params).then(response => {
          console.log('asdfas555111');
          console.log(response);
          // 提交数据以后就不能再反复提交了，除非重新保存了购物车
          localStorage.setItem("is_postorder","1")
          // 提交订单以后要返回订单列表
          // router.push('/mygoodsorder')
  
        }).catch(error => {
          console.log('出错了2');
          console.error(error);
          
        });
      }
      else{
        showDialog({message:"已经提交了订单，除非重新保存购物车"})
      }
    }
  
    
    // // 显示付款对话框
    const show_payaction = () =>{
      console.log("显示订单的确认对话框")
      // router.push( `/product_order_list?&userid=${productid.value}&allmoney=${allmoney.value}`)
      showConfirmDialog({
        // title: '标题',
        message:
          '确定订单后，系统将形成订单，如果线上支付请尽快支付，线下支付，直接按约定时间取货'   })
        .then(() => {
          // tongju.value="20"
          // content.value = content.value
          console.log('确认下单')
          // console.log("实际写入订单表",listdata2.value)
          payaction()
         
        })
        .catch(() => {
          // on cancel
          console.log('线下处理错误')
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
    
    const getdata = ()=>{
      https.get((`/api/mycart/list/`)).then(response => {
        
        console.log('huoqushuju')
       
      listdata2.value = response
  
      yizhan_name.value = response[0].shopname
  
      if (Array.isArray(response) && response.length > 0) {
        console.log("数组有数据");
        yizhan_name.value = response[0].shopname
        yizhan_addr.value = response[0].pickaddr
        yizhan_phone.value = response[0].phone
  
        jingyingzheid.value = response[0].jingyingzhe_id
        zongdian_phone.value = response[0].phone2
        email.value = response[0].email
        weixin.value = response[0].weixin
        goodsid.value = response[0].goodsid
        guest_user.value = response[0].user
        yizhanuserid.value = response[0].yizhan_ownerid
  
        for (let i = 0; i < response.length; i++) {
        totalquantity.value += response[i].shuliang;
        totalmoney.value += response[i].shuliang*response[i].price;
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
    if (user_id== null){
      console.log('还没有登录')
      router.push('/user_login')
    }
  
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
   padding-top: 10px;
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
  
  </style>