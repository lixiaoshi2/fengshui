
<template>
  <!-- <van-nav-bar title="抢单" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar> -->

  <van-nav-bar title="可抢工作任务" left-text="返回"  @click-left="router.go(-1)" left-arrow>
    <template #right>
     
      <van-icon name="question-o" size="18" @click="showImage = true" />
    </template>
  </van-nav-bar>

   <!-- 弹出图片窗口 -->
   <van-popup v-model:show="showImage" position="center" closeable round>
    <img
      src="/images/help2/qiangdan.jpg"
      alt="帮助图片"
      style="max-width: 90vw; max-height: 80vh; border-radius: 8px"
    />
   </van-popup>


  <div class="max-w-2xl mx-auto mt-10 mb-12">
    <!-- <h2 class="text-2xl font-bold mb-4 ml-4">可抢工作任务</h2> -->
    <div v-if="loading" class="text-gray-500">加载中...</div>
    <div v-else-if="orders.length === 0" class="text-gray-500 ml-4">暂无可抢订单</div>
    <div v-else class="space-y-4">
      <div v-for="order in orders" :key="order.id" class="border p-4 rounded-lg shadow-md bg-white">

        <p><strong>订单ID：</strong> {{ order.id }}</p>
        <p><strong>距您：</strong><span class="text-red-500"> {{ order.distance }}公里</span></p>
        <p><strong>保洁类型：</strong> {{ order.cleantype }}</p>
        <p><strong>房屋位置：</strong> {{ order.houseaddr }}</p>
        <!-- <p><strong>价格：</strong> ¥{{ order.price }}</p> -->
        <p><strong>备注：</strong> {{ order.beizhu }}</p>
        <p><strong>下单时间：</strong> {{ formatDateTime(order.create_time) }}</p>

        <button  @click="roomImg(order.houseid)"
          class="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ml-4 mr-4">
          相关照片
        </button>

        <!-- <button v-if="order.order_status === '待处理' || order.order_status === '执行中'" @click="grabOrder(order.id)" -->
        <button v-if="order.order_status === '待处理' || order.order_status === '执行中'" @click="grabOrder(order.id, order.distance)"
          class="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          抢单
        </button>

        <span v-if="order.order_status === '已抢单' " @click="grabOrder(order.id,order.distance)"
          class="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          已抢单
        </span>

        <span class="ml-4"> </span>


      </div>
    </div>
  </div>






</template>

<script setup>
import axios from 'axios';
import config from '@/global.config.js'
import md5 from 'js-md5'
// import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';
import funcs from '@/utils/common_func.js';
import report from '../../components/report.vue';
import { useStore } from 'vuex'
import { showToast, showDialog } from 'vant';
import { ref, onMounted, computed,reactive } from 'vue';
// import { useToast } from "vue-toastification";
import textEditor  from "@/components/textEditor.vue"  
import weizhi from '@/components/weizhi.vue'
import { useRouter,useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

const router = useRouter()
const route = useRoute()

// const toast = useToast();
const orders = ref([]);
const loading = ref(false);

const showImage = ref(false)
const fetchOrders = async () => {
  loading.value = true;
  try {
    const response = await https.get("/api/minsubaojie/available-orders/");
    orders.value = response;
    console.log("as ",response)
  } catch (error) {
    // toast.error("获取订单失败");
    alert('获取订单失败')
  } finally {
    loading.value = false;
  }
};

// 查看房子的照片
const roomImg=(houseid)=>{
  router.push('/housedetail2/'+houseid)

}

const formatDateTime = (dateTime) => {
  if (!dateTime) return '';
  const date = new Date(dateTime);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
};


const grabOrder = async (orderId,distance) => {
  try {
    console.log("抢单juli",distance)
    // alert
    if (confirm('请认真核对自己是否符合雇主要求，如果不符合不要抢单，否则会被差评，如果符合请清单。')) {
      await https.post(`/api/minsubaojie/grab-order/${orderId}/`,{
        distance: distance
      });
      alert("抢单成功！，您现在就可以马上和雇主电话联系，先抢先得");
      router.push('/mygraborder')
    }
    
    // fetchOrders();
  } catch (error) {

    alert('抢单结束，请刷新页面')
    
  }
};

onMounted(fetchOrders);



</script>


<style scoped>
 :deep(img) {
  max-width: 100%; /* 图片最大宽度为父元素宽度的100% */
  height: auto; /* 高度自动调整，保持宽高比 */
}

:deep(.van-cell__value) {
    position: relative;
    overflow: hidden;
    color: #140114;
    text-align: left;
    font-size: 18px;
    vertical-align: middle;
    word-wrap: break-word;
}
:deep(p){
  line-height: 35px;
}

</style>