
<template>
    <!-- <div>
      <div>当前位置</div>
    </div> -->
    <van-nav-bar title="我经营的商品订单" left-text="返回" @click="router.go(-1);" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
      
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
        
    <div class="containerRef"  ref="containerRef"   > 
   

   <!-- 图片弹出框 -->
  <div v-if="showModal" class="modal" @click="closeModal">
    <span class="close" @click="closeModal">&times;</span>
    <img class="modal-content" :src="currentImg" @click.stop="">
  </div>


  <van-list style="margin-bottom: 50px;" >
    <van-cell>
      <span style="float: left;color:brown;" v-if="retnull === '无数据'">暂时没有您搜索的内容</span>
    </van-cell>
  
    <div class="goodslist" v-for="(item, index) in listdata2" :key="item.id">   
     
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
          <span class="label">支付状态: <span :class="{'paid': item.is_paid, 'unpaid': !item.is_paid}">{{ item.is_paid ? '已支付' : '未支付' }}</span></span>
        </div>
        <div class="info-item">
          <span class="label">物流状态: <span style=" margin-left:10px; font-weight: normal;color:darkgreen" >  {{ item.status }}</span></span> 
           <span style="margin-left:15px;"> 
              <select v-model="status"  class="custom-select"  @change="updateOrderStatus(item.id,index)" >
                <option value="待处理">待处理</option>
                <option value="已处理">已处理</option>
                <option value="已发货">已发货</option>
                <option value="到总仓">到总仓</option>
                <option value="到驿站">到驿站</option>
                <option value="已完成">已完成</option>
              </select>
            </span>
        </div>
      </div>
     
    </div>  <!-- 上边图片和信息的内容结束 -->
    

    <div class="bottom-row">
      <span class="mybutton" @click="addbeizhu_window(item)">备注</span>
      <span class="mybutton" @click="gobuypage(item.productid)">购买页面</span>
      <span class="mybutton" @click="godetail(item)">订单详情</span>
      <span class="mybutton" @click="confirm_paid(item.id,index)">确认支付</span>
      <span class="mybutton" @click="unconfirm_paid(item.id,index)">未支付</span>
    </div>
  
    </div> 
  
  </van-list>

</div>
  
  </template>
  
  <script setup>
  import axios from 'axios';
  import config from '@/global.config.js'
  import md5 from 'js-md5'
  // import apiFun from '@/utils/api.js'
  import https from '@/utils/request.js';
  import userFunc from '@/utils/userfunc.js'
  import funcs from '@/utils/common_func.js'
  
  //   import { useStore } from 'vuex'
  //   import { showToast } from 'vant';
  import { ref, onMounted, computed,reactive } from 'vue';
  import {  showToast, showDialog, showConfirmDialog,ImagePreview   } from 'vant';
  //   import textEditor  from "@/components/textEditor.vue"  
  //   import weizhi from '@/components/weizhi.vue'
  import { useRouter,useRoute } from 'vue-router'
  const router = useRouter()
  const route = useRoute()
  const listdata2 = ref({})
  // order_add?postbiao_id=44&fenleibiao_id=55&title
  const retnull = ref({})
  const showPopup = ref(false);
  
  onMounted(() => {
  // 通过分类获取该分类的收费
  // 限流节流
  // const user_id = localStorage.getItem("user_id");
  // console.log('userid', user_id)
    https.get(('/api/order/goodsorder_guanli/')).then(response => {
      // console.log('asdfas555111');
      console.log('fanhuizhi', response);
      // responseData.value = response.results
      listdata2.value = response.results
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

  // const formatDateTime = (dateTimeString) => {
  //     const match = dateTimeString.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})/);
  //     return match ? match[1].replace('T', ' ') : dateTimeString;
  //   };

  
  let placeholderImageUrl = 'http://192.168.1.127:8000/media/uploads/glasses/U3_I16_121760.jpg'
  let status = ref('')
  const updateOrderStatus = (id,index)=>{
    let data = {
      "status":status.value
    }
    https.put((`/api/order/goodsorder_guanli/status/${id}/`), data).then(response => {
      console.log('修改状态成功');
      console.log('fanhuizhi', response);
      listdata2.value[index].status = status.value
     
    }).catch(error => {
      console.log('出错了2');
      console.error(error);
      // showToast('请重新登录');
    });
  }

const onImageError = (event) => {
      event.target.src = placeholderImageUrl;
};

// 删除订单
const delorder = (id) =>{
  https.delete((`/api/order/goodsorder/${id}/`)).then(response => {
  // console.log('asdfas555111');
  console.log('fanhuizhi', response);
  
}).catch(error => {
  console.log('出错了2');
  console.error(error);
  // showToast('请重新登录');
});
}

  

const show_delorder = (id) =>{
    console.log("显示订单的确认对话框")
    // router.push( `/product_order_list?&userid=${productid.value}&allmoney=${allmoney.value}`)
    showConfirmDialog({
      // title: '标题',
      message:
        '请确定您是否要删除该订单'   })
      .then(() => {
        
          delorder(id)
          for (let i = 0; i < responseData.value.length; i++) {
        // console.log('i:',i)
            if(responseData.value[i].id==id){
                responseData.value.splice(i, 1) 
            }      
        }
        // responseData.value.splice(id, 1);
      })
      .catch(() => {
        // on cancel
        console.log('下线处理错误')
      });
  }

 const confirm_paid = (id,index) =>{
  console.log("确认已经支付了")
  https.put((`/api/order/goodsorder_guanli/is_paid/${id}/`)).then(response => {
      // console.log('asdfas555111');
      console.log('fanhuizhi', response);
      listdata2.value[index].is_paid = true
     
    }).catch(error => {
      console.log('出错了2');
      console.error(error);
      // showToast('请重新登录');
    });
 }

 const unconfirm_paid = (id,index) =>{
  console.log("确认未支付了")
  https.put((`/api/order/goodsorder_guanli/un_paid/${id}/`)).then(response => {
      // console.log('asdfas555111');
      console.log('fanhuizhi', response);
      listdata2.value[index].is_paid = false
    }).catch(error => {
      console.log('出错了2');
      console.error(error);
      // showToast('请重新登录');
    });
 }


  const gobuypage = (productid)=>{
    console.log('进入购买此商品的页面，可以确认此采购')
    let url = userFunc.separateLettersAndNumbers(productid)
    console.log(url.letters,url.numbers)
    // let productDetailUrl = glasses_detail?id=16
    let url2 = `${url.letters}_detail?id=${url.numbers}`
    // console.log('url2',url2)
    router.push(url2)
  }

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
  // 点击获取订单详情，进入订单详情页
  const godetail = (item) =>{
    // router.push(`/goodsorderdetail?id=${orderid}`)
    console.log('某个订单所有内容', item)
    console.log('id',item.id)
    // let url = userFunc.separateLettersAndNumbers(item.productid)
    
    let target_url =  `/goodsorder_guanli_detail?order_detail=${item.id}`
    console.log('url',target_url)
    router.push(target_url)
  }

  </script>

<style scoped>

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




:deep(.van-card-desc) {
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
.paid{
  color:green;
}
.unpaid{
  color:red;
}

.custom-select {
  display: inline-block;
  width: auto;
  height: 1.5rem;
  padding: 0.2rem 1.2rem;
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.0;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
 
}

.custom-select:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.custom-select option {
  color: #495057;
}

</style>
