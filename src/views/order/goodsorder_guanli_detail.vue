 
<template>
  <van-nav-bar title="眼镜代购" left-text="返回" @click=" router.go(-1);" left-arrow>
<template #right>
  <van-icon name="search" size="18" />
</template>
</van-nav-bar>


<div>


<van-form @submit="onSubmit" style="margin-bottom:65px; ">
    <!-- 在双括号里的router不要this，而在click里的参数则需要this变量 -->
  
    <!-- {{ id }} --><!-- 这个id来源于data里的this.$route.query.id,从url里获取 -->

    
  <van-field v-model="responseData.title"  @click="router.push(producturl)" name="biaoti" style="color:blue" label="眼镜标题"  readonly   />
  
  <van-field v-model="responseData.product_type" name="title" label="产品类型"  readonly      />

    <van-field v-model="responseData.color" name="title2" label="型号或颜色" readonly  />
    
   
    <van-field v-model="responseData.name" name="" label="收货人" readonly />

    <van-field v-model="responseData.phone" name="phone" label="收货人电话" placeholder="请输入备用电话电话" readonly />

    <van-field v-model="responseData.email" label="客户email" name="email" readonly />
    

    <van-field v-model="responseData.addr" @click="selectaddr" name="addr" label="收货人地址" :value="addr" readonly />
    <van-col span="24" class="text-content">
     
    </van-col>
    <van-field v-model="responseData.notes" name="tongju" label="瞳距" placeholder="请填写瞳距（单位厘米）" readonly />
    <van-col span="24" class="text-content">
      请将医生的验光的单子上传到这里，配镜片以此照片为准(必填),如果没有瞳距，可以自测，对着镜子用厘米的尺子取瞳孔正中心的距离,填写在此处。
    </van-col>
    
    <van-field  name="detail" label="内容:">  </van-field>
    <div id="id" style="margin-left: 10px;  margin-top:-20px; border: 2px solid #eee;  width: 100%" v-html="responseData.content"></div>
    
      <van-field v-model="responseData.pickaddr" name="title" label="取货驿站地址" readonly  />

    <van-field   v-model="responseData.shuliang"  label="购买数量" readonly="" >  </van-field>


    <van-field v-model="responseData.price" name="cost" label="单价(加币)" readonly  />
    <van-field v-model="responseData.total_amount" name="allmoney" label="应付(加币)" readonly  />

    
      <van-cell style="font-weight: bolder;" title="请选择付费的方式"></van-cell>
      <div class="container">
        <div class="box2">
          <div class="inner-box2">
            <div class="content"><van-radio v-model="radio21" readonly name="1" >目前只支持e-transfer转账</van-radio>
            </div>

          </div>
        </div>
      </div>
      <van-cell style="font-weight: bolder;" title="转账账户名：XIAOSHI LI,   手机号码：4373406137"></van-cell>
      <van-cell style="font-weight: bolder;" title="注意：您提交订单后，平台将形成订单记录，平台收款后在24小时内将您的订单信息设置成已付，
      如果您已付款但订单未在24小时内更改为已付款状态，
      请将您的订单及您的付款情况告知我们。如果您购买多个产品，在付款时，可以一次性支付所有订单，但转账时需把所有订单号提交给我们"></van-cell>
      <van-cell style="font-weight: bolder;" title="订单如未付款直接可以删除，如已支付想要退款与平台联系，如未开始快递到货可通过e-transfer退款，其他不能退款，请谅解"></van-cell>

    <div style="margin: 16px; ">
        <van-button round block type="primary" @click="router.push('/goodsorders_guanli');" >返回订单列表</van-button>
        <!-- <van-button round block type="primary" native-type="submit">添加到购物车</van-button> -->
    </div>




    </van-form>
  </div>
</template>

<script setup>
import axios from 'axios';
import config from '@/global.config.js'
import md5 from 'js-md5'
import userfunc from '@/utils/api.js'
import https from '@/utils/request.js';
import { useStore } from 'vuex'
import { showToast,showDialog,showConfirmDialog } from 'vant';
import { ref, onMounted, computed,reactive,watch } from 'vue';
import { useRouter,useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
import textEditor  from "@/components/textEditor4.vue"  
import weizhi from '@/components/weizhi.vue'
import userFunc from '../../utils/userfunc';
// var userinfo = ref()
var title= ref('');
var name = ref('');
var phone= ref('');
var phone2= ref('');
var email= ref('');

var addr= ref('');
var tongju = ref('')
var weizhizhi= ref('');
var detail= ref('');
const selectedImage = ref('')
const productid = ref('')
const color = ref('')
const cost = ref('')
const shuliang = ref('')
const default_addr = ref('')
const radio21 = ref('1')
let allmoney = ref(0)
const responseData = ref({})
const listdata2 = ref('')
// // console.log(route.params.img)
// console.log(route.query.img)


// selectedImage.value = config.backendserver +'/'+ route.query.img;

// productid.value =  route.query.productid;
// color.value =  route.query.color;
// cost.value = route.query.cost
// // 这是获取
// const pickaddr = route.query.pickaddr
//  title.value = route.query.title

// // import Editor from '@tinymce/tinymce-vue'
// let content = ref('')
// let content_id = ref('')
// let centwarehouse = ref('')   //中心仓的位置

// let producturl = ref('')
// // console.log()
// const a = userFunc.separateLettersAndNumbers(productid.value) 
// // // // // glasses_detail?id=14
// const url = `/${a.letters}_detail?id=${a.numbers}`
// producturl.value = url
// console.log('producturl',producturl.value)

//   // 获取中心仓的位置

//   let subWarehouseToFind = route.query.pickaddr
//   centwarehouse.value = userFunc.findCentralWarehouse(subWarehouseToFind)
//   console.log('asdfasd22222')
//   console.log('中心仓',centwarehouse.value)
// const selectaddr = () =>{
//   console.log('请选择地址后返回')
//   router.push('/address/')
// }
// // 实际付款动作，将付款写入订单系统
// const payaction = ()=>{
//   console.log("实际写入订单表")
//   const values2 = { //这里真实的
//         "title": title.value, 
//         "product_type": "眼镜",  //商品分类
//         "productid": productid.value,   //商品地址用简写的方式代替glasses14
//         "color": color.value,   //商品型号用颜色代替
//         "name": name.value,  // 取货人名字
//         "phone": phone.value,  //取货人电话
//         "email": email.value, 
//         "addr": default_addr.value,  // 取货人地址
//         "notes" : tongju.value,   //备注，用于记录瞳距
//         "content": content.value,
//         "pickaddr": pickaddr,     //驿站地址 ，提货地址 
//         "shuliang":shuliang.value,
//         "price":cost.value,   //单价
//         "total_amount":allmoney.value,   //总价
//         "user":localStorage.getItem("user_id"),
//         "imgurl":selectedImage.value //中心仓地址
//       }
//       console.log("values2",values2)
      
//       https.post('/api/order/goodsorder/',values2).then(response => {
//         console.log('asdfas555111');
//         console.log(response);
    
//         // router.push('/my_post')

//       }).catch(error => {
//         console.log('出错了2');
//         console.error(error);
        
//       });
// }
// // 显示付款对话框
// const show_payaction = () =>{
//   console.log("显示订单的确认对话框")
//   // router.push( `/product_order_list?&userid=${productid.value}&allmoney=${allmoney.value}`)
//   showConfirmDialog({
//     // title: '标题',
//     message:
//       '请确定您选择了正确的型号颜色及数量，并且提交了瞳距和确认后请及时付款。'   })
//     .then(() => {
//       // tongju.value="20"
//       // content.value = content.value
//       console.log('确认下单')
//       if(tongju.value=='' ||  !content.value.includes("img")  ){
//         showDialog({message:"请输入您的瞳距,并且上传验光照片"})
//       }
//       else{
//         payaction()
//       }
      

//     })
//     .catch(() => {
//       // on cancel
//       console.log('下线处理错误')
//     });
// }



// watch(shuliang, (newValue, oldValue) => {
//     console.log('值发生变化:', newValue);
//     // 在这里执行你想要的操作
//     allmoney.value = Number(shuliang.value)*Number(cost.value)
//   });



  onMounted(() => {
  // 通过分类获取该分类的收费
  // 限流节流
  // const user_id = localStorage.getItem("user_id");
  // console.log('userid', user_id)
  const goods_orderid = route.query.order_detail;
   console.log('id3333',goods_orderid)
   const url44 = `/api/order/goodsorder_detail/${goods_orderid}/`
   console.log('url44',url44)

    https.get((`/api/order/goodsorder_guanli/${goods_orderid}/`)).then(response => {
      // console.log('asdfas555111');
      console.log('fanhuizhi', response);
      responseData.value = response
      console.log('responseData',responseData.value)
      listdata2.value = response
      console.log('list2',listdata2.value)
      
      listdata2.value.forEach(product => {
        product.desc = `采购类别：${product.product_type} ，属性：${product.color} , 单价：${product.price} 订单号：啊手动阀手动阀`;
      });
      
      console.log('newdata',listdata2.value)
     
  
    }).catch(error => {
      console.log('出错了2');
      console.error(error);
      // showToast('请重新登录');
    });
  } );
  
  </script>

<style scoped>
.van-form{
  background-color: white;
}

:deep(p img){
  
  max-width: 100%; /* 图片最大宽度为父元素宽度的100% */
  height: auto; /* 高度自动调整，保持宽高比 */

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
</style>
