<template>
  <van-nav-bar title="萝卜保洁" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
    <template #title>
      <label class="block text-lg font-medium text-gray-700">小萝卜保洁</label>
    </template>
  </van-nav-bar>


  <div style="margin-bottom: 35px;" class="container mx-auto p-4 ">
    <div class="flex items-center justify-center space-x-4 mt-4 mb-5">
      <h2 class="text-xl font-bold">选择想要的家政人员</h2>
      <button @click="paidan" class="px-6 py-2 bg-blue-500 text-white rounded-md text-base">
        派单
      </button>
    </div>



    <div class="flex items-center mb-4">
      <span>订单id：{{ order_id }}</span>

      <!-- 全选复选框 -->
      <div class="flex items-center ml-4">
        <input type="checkbox" id="selectAll" v-model="selectAll" @change="toggleSelectAll"
          class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
        <label for="selectAll" class="ml-2 cursor-pointer">全选/取消全选</label>
      </div>
    </div>


    <div v-if="loading" class="text-gray-500">正在加载...</div>
    <div v-if="errorMsg" class="text-red-500">{{ errorMsg }}</div>

    <ul v-if="cleaners.length > 0">
      <li v-for="cleaner in cleaners" :key="cleaner.id" class="border p-4 rounded-lg mb-2">

        <!-- 复选框 -->

        <p><strong>姓名：</strong>{{ cleaner.name }}</p>
        <p><strong>人员id：</strong>{{ cleaner.id }}</p>
        <p><strong>年龄：</strong>{{ cleaner.age }}</p>
        <p><strong>性别：</strong>{{ cleaner.gender }}</p>
        <p class="text-blue-600"><strong>距离：</strong>{{ cleaner.distance }} 公里</p>
        <p> <strong>地址：</strong>{{ cleaner.addr }} </p>
        <p><strong>备注：</strong>{{ cleaner.beizhu }} </p>


        <!-- 复选框和 label 使用 flex 布局对齐 -->
        <div class="flex items-center mr-4">
          <input type="checkbox" :id="'cleaner_' + cleaner.id" :value="cleaner.id" v-model="selectedCleanerIds"
            class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
          <label :for="'cleaner_' + cleaner.id" class="ml-2 cursor-pointer">
            设为备选
          </label>
        </div>
      </li>
    </ul>



    <!-- 确认选择按钮 -->
    <div class="flex justify-center space-x-4 mt-4 mb-5">
      <button @click="$router.push('/getcleanorder')" class="px-4 py-2 bg-blue-500 text-white rounded-md">
        返回订单列表
      </button>

      <button @click="paidan" class="px-4 py-2 bg-blue-500 text-white rounded-md">
        派单
      </button>

    </div>


    <!-- 自定义确认对话框 -->
    <div v-if="showDialog" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg">
        <h2 class="text-lg font-semibold mb-4">确认发布任务</h2>
        <p class="text-gray-700 mb-4">
          请按照**由近到远**的方式选择您觉得合适的10个家政人员推送，如一段时间无人抢单时，再选择更多的家政人员推送。
        </p>
        <p class="text-gray-700 mb-4">
          每次只有一人抢单成功，细节由您与家政人员协商。
        </p>
        <p class="text-gray-700 mb-4">
          您总共有5次匹配成功的机会，当有人抢单，才会减少一次。
        </p>

        <div class="flex justify-end space-x-4">
          <button @click="showDialog = false" class="px-4 py-2 bg-gray-400 text-white rounded-md">
            取消
          </button>
          <button @click="confirmAssign()" class="px-4 py-2 bg-green-500 text-white rounded-md">
            确认发布
          </button>
        </div>
      </div>
    </div>
    <!-- 派单对话框结束 -->

    <!-- 没有付费的提示框 -->
    <div v-if="showPayDiallog" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg">
        <!-- <h2 class="text-lg font-semibold mb-4">确认分配任务</h2> -->
        <p class="text-gray-700 mb-4">
          您还未付费，请先付费，付费前查看3公里以内是否有足够的服务人员，如果没有，请不要付费，平台不退款。
        </p>


        <div class="flex justify-end space-x-4">
          <button @click="showPayDiallog = false" class="px-4 py-2 bg-gray-400 text-white rounded-md">
            确认
          </button>

        </div>
      </div>
    </div>


    <!-- 没有付费的提示框 -->


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
import { ref, onMounted, computed, watch ,reactive } from 'vue';

import { useRouter, useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

const router = useRouter()
const route = useRoute()


const order_id = route.query.order_id;
const cleaners = ref([]);
const loading = ref(true);

const errorMsg = ref("");
const showPayDiallog = ref(false)
const selectAll = ref(false);
const showDialog = ref(false);
const selectedCleanerIds = ref([]);

// 确认派单,先保存备选人员，然后系统后台自行派单
const confirmAssign = () => {
  showDialog.value = false;
  saveCandidates();
};



//   showDialog = true
const paidan = ()=>{
  const pay_status = localStorage.getItem("pay_status")
  if (pay_status=="已支付"){
    showDialog.value = true
  }
  else{
    showPayDiallog.value = true
  }

}


const closePayDialog=()=>{
  closePayDialog.value = false
}
const page = ref(1);

const noMoreData = ref(false);



// 分配最近的家政人员
const fetchCleaners = async () => {
  
  try {
    const response = await https.post("/api/minsubaojie/find_nearest_cleaners/", {
      order_id,
    });
    console.log('houduan', response.cleaners)

    if (response.cleaners) {
      cleaners.value = response.cleaners;
      console.log('houduan', response.cleaners)
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
    const response = await https.post('/api/minsubaojie/save_candidates/', {
      order_id: order_id,
      selectedCandidates: selectedCandidates
      
    });
    if (response.success) {
      alert('备选保洁员已记录！');
      router.push("/getcleanorder")
    } else {
      alert('提交失败：' + response.message);
    }
  } catch (error) {
    alert('提交失败，请检查网络或稍后再试！');
  }
};


 // 全选/取消全选
 const toggleSelectAll = () => {
      if (selectAll.value) {
        selectedCleanerIds.value = cleaners.value.map(cleaner => cleaner.id);
      } else {
        selectedCleanerIds.value = [];
      }
    };

    // // 如果手动勾选或取消，更新selectAll状态
    watch(selectedCleanerIds, (newVal) => {
      selectAll.value = newVal.length === cleaners.value.length;
    });



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

:deep(p) {
  line-height: 35px;
}
</style>