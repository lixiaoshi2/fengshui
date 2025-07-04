<template>
  <van-nav-bar title="购物车(只保存一家店)" left-text="返回" @click=" router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>


  <div v-if="insufficient_stock.length > 0" class="stock-warning">
    <h3 style="color: red;">库存不足提示：(删减商品后，请上下滑动页面刷新)</h3>
    <ul>
      <!-- 遍历库存不足的项 -->
      <li v-for="(item, index) in insufficient_stock" :key="index">
        商品名: {{ item.item_name }}，需要数量: {{ item.required }}，库存量: {{ item.available }}
      </li>

    </ul>
  </div>

  <div  class="stock-warning">
    <h3 style="color:black">现有库存：</h3>
    <ul>
      <!-- 遍历现在的库存 -->
      <!-- <li v-for="(item, index) in inventory" :key="index"> -->

        <li v-for="(quantity, product) in inventory" :key="product">
          {{ product }}: {{ quantity }}份
        </li>

    </ul>
  </div>

  <div class="containerRef" ref="containerRef">


    <!-- 通过上面的ref来定位一个html 元素，通过它来绑定一个scroll事件，这个事件需要单独绑定 -->
    <van-list style="margin-bottom: 50px;">



      <van-cell style="margin-top: -10px;">
        <span style=" float: left;color:brown;" v-if="retnull === '无数据'">暂时没有您搜索的内容</span>
      </van-cell>
      <!-- <div style="margin-top: 0px;margin-left: 10px; height: 20px;">
        <span style=" font-weight: bold ;font-size: medium;  color:brown;" v-if="shopname != ''">{{ shopname }}</span>
      </div> -->

      <div class="goodslist" v-for="(item, index) in listdata2" :key="item.id">
        <div class="full-screen-layout">
          <!-- 最左侧 -->
          <!-- <div class="checkbox1" style="">

            <van-checkbox v-model="item.zhuangtai" icon-size="15px" shape="square"></van-checkbox>

          </div> -->
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
            <div><span style="font-size: small;"> 库存：{{ item.kucun }}</span></div>

            <div @click="delitem(index,item)"
              style="position: absolute; align-items: center;  bottom: 40px;    width: 96%; display: flex; justify-content: flex-end; ">
              <van-button style="text-align: right;">删除</van-button>
            </div>

            <div style="position: absolute; align-items: center;  bottom: 0;    width: 100%; display: flex; ">
              <div class="info-item " style=" width:20%">
                <!-- <span class="titleclass2"></span> -->
                <span class="value">单价:{{ item.price }}</span>
              </div>

              <div class="info-item" style="display: flex ; align-items: center;">
                <span><van-button type="primary" size="middle" @click="jianyi(item)"> - </van-button></span>
                <span class="value">{{ item.shuliang }}</span>
                <span><van-button type="primary" size="middle" @click="jiayi(item,listdata2)"> + </van-button></span>
                <span style="margin-right: 5px;font-size: 14px;"> $ {{ xiaoji(item) }}</span>

              </div>
            </div>
          </div>


        </div>
        <div style="width: 100%; height: 3px; background-color:aliceblue;"></div>

      </div> <!-- 上边图片和信息的内容结束 -->

    </van-list>

  </div>



  <div style="height: 50px; background-color: white;">

  </div>


  <div class="foot-container" style="font-size: 14px;">
    <!-- <div class="quanxuan">
      <van-checkbox icon-size="15px" shape="square" v-model="allchecked">全选</van-checkbox>
    </div> -->
    <div style="margin-top: 8px; margin-left: 12px; flex: 1;" class="jiage">
      <span style="font-size: 14px;">合计：</span>
      <span style="font-size: 14px;">{{ heji(listdata2)}}</span>
    </div>
    <div class="tijiao" style="display: flex; height: 40px;  margin-top: 0px; justify-content: space-around; ">
      <span>
        <van-button @click="save_cart" style="font-size: 14px; display: flex; align-items: center;" size="small"
          type="success">先保存</van-button>
      </span>
      <span>
        <van-button style="font-size: 14px; margin-left: 20px; display: flex; align-items: center;"
          @click="goumaiyemian" type="success" size="small">订单处理</van-button>
      </span>

    </div>

  </div>
</template>

<script setup>

import config from '@/global.config.js'

import funcs from '@/utils/common_func.js'
import https from '@/utils/request.js';

import { showDialog } from 'vant';

// import { useMeta } from 'vue-meta';
import { useHead } from '@vueuse/head'
import { ref, onMounted, computed,reactive,onActivated,onUnmounted } from 'vue';

// var userinfo = ref()
const listdata2=ref([])   //这个变量定义了提供数据到
const retnull = ref('')
// import Editor from '@tinymce/tinymce-vue'
let content = ref('')
let content_id = ref('')

import { useRouter,useRoute } from 'vue-router'
//  import { KeepAlive } from 'vue';
const router = useRouter()
const route = useRoute()
const inventory = ref({})
const shopname = ref('')

const buypage = ref('')
var insufficient_stock = ref([])
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
// 删除订单
const delitem = (index,item)=>{
  // console.log('删除其中此条记录',index)
  // console.log('shanchushuju',listdata2.value[index].id)
  // console.log('listdata2',listdata2.value)
  listdata2.value.splice(index,1);
  // console.log('aa',item.id)
  https.delete(('/api/mycart/delete/'+ item.id + '/')).then(response => {
  
    listdata2.value = listdata2.value.filter(item => item.id !== id);
  
  }).catch(error => {
    console.log('删除发布的信息出错');
    console.error(error);
    showToast('请重新登录');
  });


}


//
// 加一的计算

const jiayi = (item, itemList) => {
  item.shuliang = item.shuliang + 1
//   const stockKey = item.goodsname.split(" ")[1];

//   // 获取对应的共享库存
//   const sharedStock = itemList.find((i) => i.goodsname.endsWith(stockKey))?.kucun;

//   if (sharedStock === undefined) {
//     console.error(`共享库存 "${stockKey}" 未找到`);
//     return;
//   }

// // 计算当前已使用的共享库存
// const currentUsedStock = itemList
//   .filter((i) => i.goodsname.endsWith(stockKey))
//   .reduce((total, i) => total + i.shuliang, 0);

// // 判断是否可以增加购买数量
// if (currentUsedStock < sharedStock) {
//   item.shuliang++; // 增加购买数量
//   console.log(`已增加 ${item.goodsname} 的购买数量为 ${item.shuliang}`);
// } else {
//   console.warn(`共享库存不足，无法增加 ${item.goodsname} 的购买数量！`);
// }
 

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

// 现在在mycart我的购物车里面，在进入myfood的购买页面前需要处理一下保存购物车
const goumaiyemian = async ()=>{
  console.log("goumaiyemian")
  // ***首先检验数据是否有，购物车要有数据才能进入购买页面
  if (Array.isArray(listdata2.value) && listdata2.value.length > 0) {
    buypage.value = listdata2.value[0].goodspage
    const buypageurl = buypage.value.split("_")[0]
    console.log(buypageurl)

    //*** * 在进入购买页面之前的时候，需保存现在的购物车，这样可以返回数据检查是否有足够的库存
    // await save_cart();
    console.log('保存购物车', listdata2)
    console.log('ads', listdata2.value);

    const params = listdata2.value.map(item => ({
      id: item.id, // 如果需要字符串格式的 id
      shuliang: item.shuliang // 自定义数量值
    }));
    console.log('inadsf', params)
    https.put('/api/mycart/update/', params).then(response => {

      console.log('进入购买也面前，修改了修改和保存了购物车的数据');

      // 因为修改了购物车所以才可以重新提交订单
      localStorage.removeItem("is_postorder")

      // ****保存数据后，需要检查是否超过库存，

      var url = '/api/mycart/list/'
      https.get(url).then(response => {
        insufficient_stock.value = response.insufficient_stock
        if (insufficient_stock.value.length > 0) {
          console.log("超过库存不能进入下一步")
          showDialog({"message":"库存不够,请检查购物车页面返回的数据"})
        }else{
          // 保存购物车以后进入购买业务，购买页面可以选择送货地址
          console.log("检查了购物车和库存数据可以下单")
          router.push({  path: `/${buypageurl}_buypage`,  });
        }

      }).catch(error => {
        console.log('获取数据出错了2');
        console.error(error);
        showDialog({ message: '您要么没有登陆，要么访问次数过多，请一分钟后再访问' })
        // showToast('请重新登录');
      });


    }).catch(error => {
      // console.log('需要添加用户详细信息');

      // showDialog("")
      console.error(error);

    });








    // if (insufficient_stock.value.length > 0) {
    //   console.log("超过库存不能进入下一步23")
    //   showDialog({"message":"订单中部分商品超出库存，请检查"})
    // } else {

    //   // 保存购物车以后进入购买业务，购买页面可以选择送货地址
    //   router.push({  path: `/${buypageurl}_buypage`,  });
    // }

  }
}

const xiaoji = (item ) =>{
    // return 1*2
  // return item.price
    return Number(item.price)*Number(item.shuliang )
}

// 保存购物车 ，其实就是修改数量就可以了呀
const save_cart = () =>{
  console.log('保存购物车',listdata2)
  console.log('ads',listdata2.value);

  const params = listdata2.value.map(item => ({
    id: item.id, // 如果需要字符串格式的 id
    shuliang: item.shuliang // 自定义数量值
  }));
  console.log('inadsf',params)
  https.put('/api/mycart/update/',params).then(response => {
    
    console.log(response);
    
    // 因为修改了购物车所以才可以重新提交订单
    localStorage.removeItem("is_postorder")
    
    // 保存数据后，需要检查是否超过库存，

    var url = '/api/mycart/list/'
    https.get(url).then(response => {


      insufficient_stock.value = response.insufficient_stock
      
      if (insufficient_stock.value.length > 0) {
        console.log("超过库存不能进入下一步")
      }

    }).catch(error => {
      console.log('获取数据出错了2');
      console.error(error);
      showDialog({ message: '您要么没有登陆，要么访问次数过多，请一分钟后再访问' })
      // showToast('请重新登录');
    });


  }).catch(error => {
      console.log('需要添加用户详细信息');
      
      // showDialog("")
      console.error(error);
     
  });
  
}

// 首先是系统加载页面，加载页面的时候加载scroll事件检测
onMounted(() => {
  var url = '/api/mycart/list/'
  https.get(url).then(response => {
    console.log('aaaa');
    console.log(response);

    listdata2.value = response.cart_info
    insufficient_stock.value = response.insufficient_stock
    inventory.value = response.inventory
      console.log('库存',inventory)
//     if (Array.isArray(response) && response.length > 0) {
//       console.log("数组有数据");
//       shopname.value = response.cart_info[0].shopname
//     } else {
//       console.log("数组为空");
//     }
// // 
//     if (window.location.protocol == "http:"){
//       console.log('访问的协议是http')

//     }else{
//       // console.log('访问的协议是https,此时需要将http协议，将图片地址换成')
//       // let needtochange = config.backendserver1
//       // if 
//       for (let i = 0; i < listdata2.value.length; i++) {
//           console.log('aaa', listdata2.value[i].goodsimg);
//           listdata2.value[i].goodsimg = listdata2.value[i].goodsimg.replace(config.backendserver1, config.backendserver2);
//           console.log('bbb',listdata2.value[i].goodsimg)
//       }
//     }

  }).catch(error => {
    console.log('获取数据出错了2');
    console.error(error);
    showDialog({ message: '您要么没有登陆，要么访问次数过多，请一分钟后再访问' })
    // showToast('请重新登录');
  });

})


</script>

<style scoped>

.foot-container{
    display: flex;
    background-color: bisque;
    /* justify-content: center;  */
    height: 40px; 
    width:100%;
    
    position: fixed;            /* 固定在页面 */
    bottom:50px;                  /* 紧贴页面底部 */    
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
 width:30%;
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
 width: 70px; /* 设置容器宽度 */
  height: 70px; /* 设置容器高度 */
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

.stock-warning {
  
  padding: 5px;
  padding-left: 10px;
  border-radius: 5px;
}
h3 {
  font-size: 12px;
  color: #ff4d4f;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 5px 0;
  font-size: 14px;
  color: #333;
}


</style>