
<template>
    <van-nav-bar title="付费页面" left-text="返回" @click=" router.go(-1);" left-arrow>
  <template #right>
    <van-icon name="search" size="18" />
  </template>
  </van-nav-bar>
  
      <!-- 在双括号里的router不要this，而在click里的参数则需要this变量 -->
    
      
    

      <van-field style="color:aqua" v-model="title" :to="url" readonly name="title"   />

      <div class="container" style=" margin-left: 15px; font-size: 1.2cap;">
          <div style="font-weight: bold;" >      您的广告链接：  </div> 
          <div class=""> {{ url }}</div>
      </div>

      <div class="container" style=" margin-left: 15px; margin-top: 15px;  font-size: 1.2cap;">
          <div style="font-weight: bold;" >      广告时长  </div> 
          <div style="color: red;margin-left: 10px;"> (优惠期不用付费，请选择平台提供的时长)</div>
      </div>

      <!-- <van-cell style="font-weight: bolder;" title="请选择支付的时长，"></van-cell> -->

    <div class="container">
      
    <div class="box">
      <div class="inner-box">
        <div class="content"><van-radio v-model="radio1" @click="radio1f" name="1" label="3个月">{{paymode1[0]}}个月</van-radio></div>
        <div class="content">{{paymode1[1]}}加币/{{paymode1[0]}}个月</div>
      </div>
    </div>
    <div class="box">
      <div class="inner-box">
        <div class="content"><van-radio v-model="radio2"  @click="radio2f" name="2"  label="6个月">{{paymode2[0]}}个月</van-radio></div>
        <div class="content">{{paymode2[1]}}加币/{{paymode2[0]}}个月</div>
      </div>
    </div>
    <div class="box">
      <div class="inner-box">
        <div class="content"><van-radio v-model="radio3"  @click="radio3f"  name="3" label="12个月">{{paymode3[0]}}个月</van-radio></div>
        <div class="content">{{paymode3[1]}}加币/{{paymode3[0]}}个月</div>
      </div>
    </div>
  </div>

  <van-cell style="font-weight: bolder;" :title="guanggaourl"></van-cell>
  
  <van-cell style="font-weight: bolder;" title="请选择付费的方式"></van-cell>
<div class="container">
  
<div class="box2">
  <div class="inner-box2">
    <div class="content"><van-radio v-model="radio21" readonly name="1" label="3个月">目前只支持e-transfer转账</van-radio></div>
   
  </div>
</div>

</div>
<van-cell style="font-weight: bolder;" title="转账电子邮件：lixiaoshi101@gmail.com"></van-cell>
<van-cell style="font-weight: bolder;" title="转账账户名：XIAOSHI LI,   手机号码：4373406137"></van-cell>
<!-- <van-cell style="font-weight: bolder;" title="注意：请将安全问题的答案设置成转账的手机号码，您的信息点击已支付后将立即被展示。"></van-cell> -->

  <div class="buttoncontainer" > <van-button type="primary"  @click="showDialogbtn" style="width:80%">已支付（请完成支付后再点击）</van-button> </div>
     
  </template>
  
  <script setup>
  import axios from 'axios';
  import config from '@/global.config.js'
  import md5 from 'js-md5'
  // import apiFun from '@/utils/api.js'
  import https from '@/utils/request.js';
//   import { useStore } from 'vuex'
//   import { showToast } from 'vant';
  import { ref, onMounted, computed,reactive } from 'vue';
  import {  showFailToast, showSuccessToast,showToast, showConfirmDialog ,showDialog } from 'vant';
//   import textEditor  from "@/components/textEditor.vue"  
//   import weizhi from '@/components/weizhi.vue'
  import { useRouter,useRoute } from 'vue-router'
  const router = useRouter()
  const route = useRoute()
// order_add?postbiao_id=44&fenleibiao_id=55&title
  const postbiao_id = route.query.postbiao_id;
  const fenleibiao_id = route.query.fenleibiao_id;
  const title = route.query.title;
  const fenlei_name = route.query.fenlei_name;
  const url = ref('')
  const errorinfo = ref('')
  const radio21=ref('1')
  const radio1=ref('0')
  const radio2=ref('')
  const radio3=ref('')
  const responseData = ref({})
  const paymode = ref([])
  const paymode1 = ref([])
  const paymode2 = ref([])
  const paymode3 = ref([])
  const guanggaourl = ref('')
  const fenlei_name2 = ref('')
  fenlei_name2.value = fenlei_name
  const order_money = ref('')
  const order_timelength = ref('')

//   _detail?id=55
  url.value = fenlei_name+'_detail/'+fenleibiao_id
  // console.log('adf22',postbiao_id)
  // console.log(route)
  // var userinfo = ref()
  guanggaourl.value = '您想要支付的广告页面地址是：'+ url.value

  const handle = (shichang,money)=>{
    // console.log('tongyi')
    order_money.value = money
    order_timelength.value = shichang
    // console.log(order_money.value)
    // console.log(order_timelength.value)
  }

  const radio1f=()=>{
    // console.log('radio1',radio1.value)
    // radio1.value=1
    radio2.value= 0
    radio3.value = 0
   
    handle(paymode1.value[0],paymode1.value[1])
  }
  const radio2f=()=>{
    // console.log('radio2',radio2.value)
    radio1.value=''
    // radio2.value= 2
    radio3.value = ''
    // order_money.value = paymode2[1].value
    // order_timelength.value = paymode2[0].value
    // console.log('444',order_money.value)
    handle(paymode2.value[0],paymode2.value[1])
  }

  const radio3f=()=>{
    // console.log('radio3',radio3.value)
    radio1.value=''
    // radio2.value= 2
    radio2.value = ''
    order_money.value = paymode3[1]
    order_timelength.value = paymode3[0]
    handle(paymode3.value[0],paymode3.value[1])
  }

  // 获取时间的字符串并转化成
  const datetimetostring = () => {
    // 创建一个 Date 对象，表示当前时间
    var currentDate = new Date();

    // 获取当前的年、月、日、小时、分钟和秒
    var year = currentDate.getFullYear();    // 获取年份
    var month = currentDate.getMonth() + 1;   // 获取月份（注意月份是从 0 开始的，需要加 1）
    var day = currentDate.getDate();         // 获取日期
    var hours = currentDate.getHours();      // 获取小时
    var minutes = currentDate.getMinutes();  // 获取分钟
    var seconds = currentDate.getSeconds();  // 获取秒钟
    var randomDigit = Math.floor(Math.random() * 10);

    // 将年、月、日、小时、分钟、秒钟和随机数格式化为指定的格式
    var formattedTime = `${year}${month < 10 ? '0' + month : month}${day < 10 ? '0' + day : day}${hours < 10 ? '0' + hours : hours}${minutes < 10 ? '0' + minutes : minutes}${seconds < 10 ? '0' + seconds : seconds}${randomDigit}`;

    // 打印格式化后的时间
    // console.log('当前时间：', formattedTime);
    return formattedTime
  }

  // 当点击已支付后弹出一个对话框，让用户确认是否已经完成，
  const showDialogbtn = () => {
  //  console.log('asdfe3')
      showConfirmDialog({
      // title: '标题',
      message:
        '请确认您已经付款，如果点击上线后，不能显示，请发邮件到lixiaoshi101@gmail.com,同时告知付款的黄页分类及id，请截图告知',
    })
      .then(() => {
        payhandle()
      })
      .catch(() => {
        // on cancel
        console.log('没有付款')
      });
  }
    

  // 处理已支付的按钮
  const payhandle=()=>{
    if (order_timelength.value=='' || order_money.value =='')
    {
      // showSuccessToast({ message: '密码修改成功', background: '#ff4444', duration: 5000,color: '#ff0000' });
      showFailToast({ message:'没有选择支付方式' , background: '#ff4444', duration: 3000,color: '#ff0000' });
    }
    else{
    
    console.log(order_timelength.value,order_money.value)
    // console.log(datetimetostring)
    const orderid = datetimetostring()
    
    // const orderid = 

    // 打印当前时间的字符串表示形式
    // console.log('当前时间：', datetimetostring());
      // console.log('name',responseData.value.nameEng)
      // console.log('xinxi',fenleibiao_id )
      // console.log('postbiaoid',postbiao_id )
      // console.log('asdf',orderid)
      // console.log('postbiaoid',orderid.substring(0, 14) )
      // 202405111159252
    const values2 =   {
    "orderid": orderid, //这个数据可以在服务器端填写
    // "is_delete": false,
    "xinxi_fenlei": responseData.value.nameEng,
    "xinxi_id": fenleibiao_id,
    "all_post_id": postbiao_id,
    "paid_datetime": orderid.substring(0,14), //这个数据可以在服务器端填写
    "paid_money": order_money.value,
    "paid_expired_datetime": "", //这个数据可以在服务器端填写
    "paid_img": null,
    "is_paid": false,
    "paid_url":url.value ,
    "title":title,
    "fenleizhongwen":responseData.value.name

}
// home_hotel_detail?id=55
// home_hotel_detail?id=55
// http://192.168.1.127:5173/home_hotel_detail?id=55

  console.log("values2",values2)

  https.post('/api/order/order/',values2).then(response => {
    console.log('添加订单成功');
    console.log(response);
    // listdata2.value.splice(index, 1);
    // listdata2.valuesplice(id, 1);;
    // console.log('asdfdd',listdata2);
    // listdata2 = this.mainList.filter(item=>item.id != data.id);
    // showToast('添加成功');
    if (response[0]=="订单间隔太短，明天再下订单"){
      showDialog({message:'尊敬的客户，您下订单间隔太短，请明天再下订单'});
    }
    else{
      showDialog({message:'添加订单成功'});
      router.push( '/my_post');
    }
  
  }).catch(error => {
    console.log('出错了2');
    console.error(error);
    
  });

  }
  }
  


  onMounted(() => {
  // 通过分类获取该分类的收费
  // 限流节流
  const user_id = localStorage.getItem("user_id");
  // console.log('userid', user_id)
    https.get(('/api/category/search/?nameEng='+fenlei_name2.value)).then(response => {
      // console.log('asdfas555111');
      // console.log(response);
      responseData.value = response
      console.log(responseData.value)
      paymode.value = response.paymode.split(',');
      console.log(paymode.value)
      // console.log(paymode.value[0])
      // console.log(paymode.value[0].substring(0,1))
      paymode1.value = paymode.value[0].split('-')
      paymode2.value = paymode.value[1].split('-')
      paymode3.value = paymode.value[2].split('-')

      
      
      // console.log(paymode1.value)
      // console.log(paymode2.value)

      // console.log('223'.paymode.value)
      // paymode1.value[0] = paymode.value[0].substring(0, 2)
      // console.log('asdfas222' ,paymode1)
      // console.log(paymode)
      
      // const email.value = response.email;
      // username.value = response.username;
      // mobile.value = response.mobile;
      // last_name.value = response.last_name;
      // listdata2.value.splice(index, 1);
      // // listdata2.valuesplice(id, 1);;
      // // console.log('asdfdd',listdata2);
      // // listdata2 = this.mainList.filter(item=>item.id != data.id);
      // showToast('删除成功');
      // this.reload;
      // listdata2.value = 
      // router.push( '/activitys_liebiao_geren');
  
    }).catch(error => {
      console.log('出错了2');
      console.error(error);
      error.value = error;
      showToast('请重新登录');
    });
  } );
  
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
