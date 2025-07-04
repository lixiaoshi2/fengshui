<template>
  <van-nav-bar title="萝卜保洁" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
    <template #title>
      <label class="block text-lg font-medium text-gray-700">萝卜保洁</label>
    </template>
  </van-nav-bar>


  <div class="max-w-3xl mx-auto p-4 mb-10">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold">已抢单的家政人员</h2>

    </div>

    <span class="block text-sm font-medium text-gray-700">
      <strong>订单编号：</strong>{{ order_id }}
    </span>

    <!-- 提示信息 -->
    <span class="block text-sm font-medium text-gray-700">
      注：
    </span>


    <div v-if="candidates.length > 0">
      <div v-for="(candidate, index) in candidates" :key="candidate.cleaner_id"
        class="p-4 mb-4 border rounded shadow relative">
        <h3 class="text-lg font-semibold">
          {{ candidate.name || "未知" }}
        </h3>
        <p class="text-gray-600">
          <strong>家政编号：</strong> {{ candidate.cleaner_id || "未填写" }}
        </p>
        <p class="text-gray-600">
          <strong>年龄：</strong> {{ candidate.age || "未填写" }}
        </p>
        <!-- <p class="text-gray-600">
          <strong>电话：</strong> {{ candidate.phone || "未填写" }}
        </p> -->

        <p><strong>电话：</strong> <a :href="'tel:' + candidate.phone" class="text-blue-600 ">
          {{ candidate.phone || "未填写"}} </a>
        </p>
        <p class="text-gray-600">
          <strong>距离：</strong> <span class="text-red-500">{{ candidate.distance || "未填写" }} km </span> 

        </p>

        <p class="text-gray-600">
          <strong>性别：</strong> {{ candidate.gender || "未填写" }}
        </p>
        <p class="text-gray-600">
          <strong>地址：</strong> {{ candidate.addr || "未填写" }}
        </p>
        <p class="text-gray-600">
          <strong>备注：</strong> {{ candidate.beizhu || "无备注" }}
        </p>

        <button @click="viewDetails(order_id,candidate.cleaner_id)"
          class="text-sm mt-2 px-6 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 ">
          详情
        </button>

        <button @click="router.push(`/rating/${order_id}/${candidate.cleaner_id}`)"
          class="text-sm mt-2 ml-2 px-6 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 ">
          写评分
        </button>

        <button @click="openConfirm(order.id)"
          class="bg-blue-500 ml-2 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-600">
          选择此人
        </button>

        <div>
          <!-- <div v-if="Number(localCleanerId) === order.cleaner">
              <div class="bg-blue-500 text-white px-3 py-1 text-sm rounded-md">
                已确定
              </div>
            </div> 
            <div v-else>  -->

          <div>

          </div>
        </div>



      </div>
    </div>
    <p v-else class="text-gray-500">暂无备选清洁工</p>

  </div>






</template>

<script setup>
import axios from 'axios';
import config from '@/global.config.js'
import md5 from 'js-md5'
// import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';
import funcs from '@/utils/common_func.js';

import { useStore } from 'vuex'
// import { showToast, showDialog } from 'vant';

import { ref, onMounted, computed,  } from 'vue';

import { useRouter, useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

const router = useRouter()
const route = useRoute()

// 到详情页
const bid_detail =(order_id,cleaner_id)=>{

  router.push(`/candidate_detail/?order_id={order_id}&cleanerid={cleaner_id}`)

}


// const order_id = route.query.order_id;
const order_id = route.params.id; ;
const cleaners = ref([]);
const loading = ref(true);
const errorMsg = ref("");
const candidates = ref({})

const showDialog = ref(false);
const selectedCleanerIds = ref([]);

// 确认派单,先保存备选人员，然后系统后台自行派单
const confirmAssign = () => {
  showDialog.value = false;
  saveCandidates();
};


// 打开和关闭弹窗
const openDialog = () => {
  showDialog.value = true;
};

const closeDialog = () => {
  showDialog.value = false;
};

// 确认重新发起抢单
const confirmReassign = async () => {
  try {
    const response = await https.post(`/api/orders/${orderId}/reassign/`);
    alert(response.data.message || '重新发起抢单成功！');
    closeDialog();
  } catch (error) {
    alert(error.response?.data?.error || '发生错误，请稍后再试。');
  } finally {
    closeDialog();
  }
};

// 通过抢单寻找下一个保洁人员
const nextCleaner = async() =>{
  if (hasConfirmedOrder.value) {
    alert('目前有人抢单，无法重新发起抢单，请先进入被选人页面拒接此人。');
    return;
  }
  console.log('orderid',order_id)
  try {
      const response = await https.post("/api/minsubaojie/candidate_next/"+order_id+"/");
      console.log('houduan', response)
      if(response.error){
        alert(response.error)
      }
      closeDialog();
      alert("发起抢单成功，抢单成功者将与您联系，您也可以刷新页面查看是否有人抢单成功，您可以主动联系")
      
    } catch (error) {
      console.error("获取保洁员失败:", error);
      errorMsg.value = "获取保洁员失败，请检查网络或稍后再试！";
      alert("请不要频繁发起抢单，请过10分钟后，刷新查看是否有人抢单，如果没有再发起下一轮抢单")
      closeDialog();
    } finally {
      // alert("response.error2")
      closeDialog();
    }
}


// 判断是否有已抢单的人，有的话不能提请抢单的申请
// 判断是否存在已抢单的情况
const hasConfirmedOrder = computed(() =>
candidates.value.some((item) => item.status === '已抢单')
);


// 获取保洁人员的详情

const viewDetails = async (order_id,cleanerid) => {

  console.log('orderid',order_id)
  console.log("cleanerid",cleanerid)

  router.push({ path: "/candidate_detail/", query: { order_id: order_id, cleanerid:cleanerid} });

  // console.log("orderid",order_id)
  // console.log("cleanid",cleanerid)
  // try {
  //   const response = await https.get("/api/minsubaojie/candidate_detail/"+order_id+"/"+cleanerid+"/");
  //   console.log('houduan', response)

  //   if (response.length>0) {
  //     cleaners.value = response;
  //     candidates.value = response
  //     console.log('houduan', response)
  //   } else {
  //     errorMsg.value = "未找到合适的家政人员，请稍后重试！";
  //   }
  // } catch (error) {
  //   console.error("获取保洁员失败:", error);
  //   errorMsg.value = "获取保洁员失败，请检查网络或稍后再试！";
  // } finally {
  //   loading.value = false;
  // }
}

// 分配最近的家政人员
const fetchCleaners = async () => {
  console.log('orderid',order_id)
  try {
    const response = await https.get("/api/minsubaojie/bidcleaner-info/"+order_id+"/");
    console.log('houduan', response)
    console.log('houduan', response.cleaners)
    candidates.value = response.cleaners

    // if (response.cleaners) {
    //   cleaners.value = response;
    //   candidates.value = response.cleaners
    //   console.log('dfgasef222',candidates.value)

    //   // 将 status=已抢单 的排在最前面
    //   candidates.value = response.sort((a, b) => {
    //     if (a.status === "已抢单" && b.status !== "已抢单") {
    //       return -1;
    //     } else if (b.status === "已抢单" && a.status !== "已抢单") {
    //       return 1;
    //     }
    //     return 0;
    //   });

    //   console.log('houduan', response)
    // } else {
    //   errorMsg.value = "未找到合适的家政人员，请稍后重试！";
    // }
  } catch (error) {
    console.error("获取保洁员失败:", error);
    errorMsg.value = "获取保洁员失败，请检查网络或稍后再试！";
  } finally {
    loading.value = false;
  }
};





onMounted(() => {
  fetchCleaners()
})


</script>


<style scoped>
:deep(img) {
  max-width: 100%;
  /* 图片最大宽度为父元素宽度的100% */
  height: auto;
  /* 高度自动调整，保持宽高比 */
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



</style>