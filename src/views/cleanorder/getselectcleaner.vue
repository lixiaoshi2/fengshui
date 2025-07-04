<template>
  <!-- <van-nav-bar title="萝卜保洁" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
    <template #title>
      <label class="block text-lg font-medium text-gray-700">萝卜保洁</label>
    </template>
  </van-nav-bar> -->

  <van-nav-bar title="小萝卜家政" left-text="返回"  @click-left="router.go(-1)" left-arrow>
    <template #right>
     
      <van-icon name="question-o" size="18" @click="showImage = true" />
    </template>
  </van-nav-bar>

   <!-- 弹出图片窗口 -->
   <van-popup v-model:show="showImage" position="center" closeable round>
    <img
      src="/images/help2/faburenwu.jpg"
      alt="帮助图片"
      style="max-width: 90vw; max-height: 80vh; border-radius: 8px"
    />
   </van-popup>




  <div class="max-w-3xl mx-auto p-4 mb-10">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold">备选家政人员</h2>
      <span class="block text-sm font-medium text-gray-700">
      <strong>订单编号：</strong>{{ order_id }}
    </span>
    </div>

    

    <!-- 提示信息 -->
    <span class="block text-sm font-medium text-gray-700">
      注：家政服务采用双向选择机制。只有当您和家政人员彼此确认后，系统才会提供对方联系方式。您可查看约定数量的最早接受订单的家政人员信息及详情。 
    </span>
    <!-- <span class="block text-sm font-medium text-gray-700">
      如果驾证人员接受您的工作机会，您将看到 对方的<strong>详情</strong>
    </span> -->


    <div v-if="candidates.length > 0">

      <div v-for="(candidate, index) in candidates" :key="candidate.id" class="p-4 mb-4 border rounded shadow relative">
        <h4 class=" font-semibold">
          {{ candidate.cleaner.name || "未知" }}，{{ candidate.cleaner.gender || "未填写" }}{{ candidate.cleaner.age || " " }}岁,
          编号 {{ candidate.cleaner.user_id || " " }},距您{{ candidate.distance || " " }}公里
        </h4>
        <!-- <p class="text-gray-600">
          <strong>年龄：</strong> {{ candidate.cleaner.age || "未填写" }}
        </p>
        <p class="text-gray-600">
          <strong>家政编号：</strong> {{ candidate.cleaner.id || "未填写" }}
        </p>
        <p class="text-gray-600">
          <strong>性别：</strong> {{ candidate.cleaner.gender || "未填写" }}
        </p> -->
        <p class="text-gray-600">
          <strong>地址：</strong> {{ candidate.cleaner.addr || "未填写" }}
        </p>
        <p class="text-gray-600">
          <strong>备注：</strong> {{ candidate.cleaner.beizhu || "无备注" }}
        </p>
        <p class="text-gray-600">
          <strong>状态：</strong> {{ candidate.status }}
        </p>


        <!-- "status": "已抢单", -->
        <button v-if="candidate.status === '已抢单' || candidate.status === '已确认'"
          @click="viewDetails(order_id, candidate.cleaner.id)"
          class="text-sm mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">
          详情
        </button>

        <button  @click="router.push(`/rating2/${order_id}/${candidate.cleaner.id}`)"
          class="text-sm  mt-2 ml-4 px-6 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 ">
          查看评分
        </button>

        <!-- <button v-if="candidate.status === '已抢单'" @click="viewDetails(order_id, candidate.cleaner.id)"
          class="mt-2 ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          确认并结束
        </button> -->

      </div>

    </div>
    <p v-else class="text-gray-500">暂无备选清洁工</p>

  </div>

  <!-- 弹出确认框 -->
  <div v-if="showDialog" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-xl w-96">
      <h3 class="text-lg font-semibold">确认操作</h3>
      <p class="my-4">确定要重新发起抢单吗？此操作将重新通知剩余清洁员。</p>

      <div class="flex justify-end space-x-4">
        <button @click="closeDialog" class="px-4 py-2 bg-gray-300 rounded">取消</button>
        <button @click="nextCleaner" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">确认</button>
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

import { useStore } from 'vuex'
// import { showToast, showDialog } from 'vant';
import { ref, onMounted, computed, reactive } from 'vue';

import { useRouter, useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

const router = useRouter()
const route = useRoute()
const order_id = route.query.order_id;

const showImage = ref(false)

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

  
}

// 分配最近的家政人员
const fetchCleaners = async () => {
  
  try {
    const response = await https.get("/api/minsubaojie/candidates/"+order_id+"/");
    console.log('houduan', response)

    if (response.length>0) {
      cleaners.value = response;
      candidates.value = response

      // 将 status=已抢单 的排在最前面
      candidates.value = response.sort((a, b) => {
        const priority = {
          "已抢单": 1,
          "已确认": 1,
          "其他": 2  // 其他状态的默认优先级
        };

        const aPriority = priority[a.status] || 2;
        const bPriority = priority[b.status] || 2;

        return aPriority - bPriority;
      });

      console.log('houduan', response)
    } else {
      errorMsg.value = "未找到合适的家政人员，请稍后重试！";
    }
  } catch (error) {
    console.error("获取保洁员失败:", error);
    errorMsg.value = "获取保洁员失败，请检查网络或稍后再试！";
  } finally {
    loading.value = false;
  }
};

// 保存备选的家政人员
const saveCandidates = async () => {
  if (selectedCleanerIds.value.length === 0) {
    alert('请选择至少一名备选家政人员！');
    return;
  }
  console.log('asdfasdf')

  // alert('zhixingbaocun')
  console.log('order_id',order_id)
  console.log('selectedCleanerIds',selectedCleanerIds.value)
  // 组合 cleaner_id 和 user_id
  const selectedCandidates = selectedCleanerIds.value.map(cleanerId => {
    const cleaner = cleaners.value.find(c => c.id === cleanerId);
    return cleaner ? { cleaner_id: cleaner.id, user_id: cleaner.user_id } : null;
  }).filter(Boolean);  // 过滤掉 null 值
  console.log('selectedCandidates',selectedCandidates)
  
  try {
    const response = await https.get('/api/minsubaojie/save_candidates/'+order_id, {
      order_id: order_id,
      selectedCandidates: selectedCandidates
    });
    if (response.success) {
      alert('备选保洁员已记录！');
    } else {
      alert('提交失败：' + response.message);
    }
  } catch (error) {
    alert('提交失败，请检查网络或稍后再试！');
  }
};

// 拒接候选人
const refuse = async (id) => {
  try {
    await https.post(`/api/minsubaojie/refusecleaner/${id}/`)
    candidates.value = candidates.value.filter(candidate => candidate.id !== id)
    alert('已成功拒接该候选人')
  } catch (error) {
    console.error('拒接失败:', error)
    alert('拒接失败，请稍后再试')
  }
}


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