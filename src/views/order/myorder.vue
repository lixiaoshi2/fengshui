
<template>
    <!-- <div>
      <div>当前位置</div>
    </div> -->
    <van-nav-bar title="邻家网 - 我的订单" left-text="返回" @click="router.go(-1);" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
      
    
    
    <div class="containerRef"  ref="containerRef"   > 
   <!-- 通过上面的ref来定位一个html 元素，通过它来绑定一个scroll事件，这个事件需要单独绑定 -->
      <van-list style="margin-bottom: 50px;" >
        <van-cell>
          <span style="float: left;color:brown;" v-if="retnull === '无数据'">暂时没有您搜索的内容</span>
        </van-cell>
        
  
        
          <van-cell  class="custom-cell" v-for="(item) in listdata2" :key="item._id">
              <template #title>
                <span style="font-weight: bold;" @click="goToDetails(item.paid_url)">{{ item.title }}</span>
               
                <div style="display:flex ;">
                  <div style="font-size: 12px;width:30%; color: rgb(215, 140, 140);" > 付款金额： {{ item.paid_money }}  </div>
                    <div style="flex=60%;margin-left: 10px;">下单日期：{{ trucationdate(item.create_time) }}</div>
                 
                </div>

                <div style="display:flex ;">
                    <div style="flex=40%">开始日期：{{ trucationdate(item.paid_start_datetime) }}</div> 
                    <div style="flex=60%;margin-left: 10px;">截至日期：{{ trucationdate(item.paid_expired_datetime) }}</div>
                 
                </div>
                
              </template>
              <template #label>
              </template>
          </van-cell>
      </van-list>
    </div>
  
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
  import {  showFailToast, showSuccessToast,showToast, showConfirmDialog  } from 'vant';
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
  const listdata2 = ref([])
  const url = ref('')
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

  const goToDetails = (url)=>{
    router.push(url)
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

  const trucationdate = (datestr) =>{
    return datestr.substring(0,10)
  }

  // 当点击已支付后弹出一个对话框，让用户确认是否已经完成，
  const showDialog = () => {
  //  console.log('asdfe3')
      showConfirmDialog({
      // title: '标题',
      message:
        '请确认您已经付款，否则如果检查后没有付款，该发布广告会被删除，需要重新录入，如果付费后未显示请发邮件到',
    })
      .then(() => {
        payhandle()
      })
      .catch(() => {
        // on cancel
        console.log('没有付款')
      });
  }
    



  onMounted(() => {
  // 通过分类获取该分类的收费
  // 限流节流
  const user_id = localStorage.getItem("user_id");
  // console.log('userid', user_id)
    https.get(('/api/order/order/')).then(response => {
      // console.log('asdfas555111');
      console.log(response);
      responseData.value = response
      listdata2.value = response

      
      
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

:deep .van-cell__title{
  width:30%;
}
</style>
