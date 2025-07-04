<template>

  <!-- 顶栏 -->
  <van-nav-bar title="我抢到的工作" left-text="返回" @click-left="router.go(-1)" left-arrow>
    <template #right>
      <van-icon name="question-o" size="18" @click="showImage = true" />
    </template>
  </van-nav-bar>

  <!-- 帮助图片弹窗 -->
  <van-popup v-model:show="showImage" position="center" closeable round>
    <img src="/images/help2/qiangdan.jpg" alt="帮助图片" style="max-width: 90vw; max-height: 80vh; border-radius: 8px" />
  </van-popup>

  <!-- 订单列表区域 -->
  <div class="max-w-2xl mx-auto mt-10 mb-10">
    <!-- 首次加载/无数据提示 -->
     <div class="p-4 text-red-500"> 最早抢单的人将最早获得雇主联系方式，最有机会获得此工作，但最终取决于雇主的决定。 </div>
    <div v-if="loading && orders.length === 0" class="text-gray-500 ml-4">
      加载中...
    </div>
    <div v-else-if="orders.length === 0" class="text-gray-500 ml-4">
      暂无可抢订单
    </div>
    

    <!-- 订单列表 + 无限滚动 -->
    <van-list v-else v-model:loading="loadingMore" :finished="!nextPage" finished-text="—— 没有更多了 ——" @load="loadMore">
      <div v-for="order in orders" :key="order.id" class="border p-4 rounded-lg shadow-md bg-white mb-4">
        <div class="flex justify-between items-center">
          <p><strong>订单id：</strong> {{ order.id }}</p>
          <button class="text-blue-600 hover:underline text-sm" @click="viewComments(order.id)">
            查看评论
          </button>
        </div>

        <p><strong>房屋地址：</strong> {{ order.houseaddr }}</p>
        <p><strong>业主称呼：</strong> {{ order.contact_name }}</p>

        <p>
          <strong>业主电话：</strong>
          <a :href="'tel:' + order.contact_phone" class="text-blue-600 underline">
            {{ order.contact_phone }}
          </a>
          <span class="text-red-500 px-2">快打雇主在等</span>
        </p>

        <p><strong>保洁类型：</strong> {{ order.cleantype }}</p>
        <p><strong>备注：</strong> {{ order.beizhu }}</p>
        <p><strong>发布时间：</strong> {{ formatDate(order.create_time) }}</p>

        <!-- 房屋详情按钮 -->
        <p class="flex items-center space-x-4 mb-2">
          <strong class="text-sm">房屋详情：</strong>
          <button @click="router.push('/housedetail2/' + order.houseid)"
            class="bg-blue-500 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-600">
            点击查看
          </button>
        </p>

        <!-- 被选中逻辑 -->
        <div class="flex items-center space-x-4">
          <p class="text-sm">
            被选中(对评分积分 <strong class="text-red-500">极有用</strong> )：
          </p>

          <div v-if="Number(localCleanerId) === order.cleaner">
            <div class="bg-blue-500 text-white px-3 py-1 text-sm rounded-md">
              已确定
            </div>
          </div>
          <div v-else>
            <button @click="openConfirm(order.id)"
              class="bg-blue-500 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-600">
              是的
            </button>
          </div>
        </div>
      </div>
    </van-list>
  </div>

  <!-- 确认弹窗 -->
  <div v-if="showConfirm" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded shadow-md w-80">
      <h2 class="text-lg font-semibold mb-2">请确认</h2>
      <p class="text-sm mb-4 text-gray-600">
        只有被选中才算有效，临时替补不算。故意乱点会影响您的评分。
        <br />如被别人确认，可以请雇主帮忙确认。
        <br />是否确定您已被选中？
      </p>
      <div class="flex justify-end space-x-3">
        <button @click="showConfirm = false" class="text-gray-600 hover:text-black text-sm">
          取消
        </button>
        <button @click="confirmSelected(currentOrderId)"
          class="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600">
          确定
        </button>
      </div>
    </div>
  </div>

</template>

<script setup>


import https from '@/utils/request.js';


import { ref, onMounted, computed,reactive } from 'vue';


import { useRouter,useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

// const toast = useToast();
const orders = ref([]);

const currentOrderId = ref(null)


const loading = ref(false)      // 首屏加载
const loadingMore = ref(false)  // 加载下一页
const nextPage = ref(1)         // 下一页页码，null 代表没有更多
const showImage = ref(false)    // 帮助图
const showConfirm = ref(false)  // 确认弹窗

const localCleanerId = ref(null)


// const fetchOrders = async () => {
//   loading.value = true;
//   try {
//     const response = await https.get("/api/minsubaojie/mygrab-orders/");
//     orders.value = response.results;
//     console.log("as ",response)
//   } catch (error) {
//     // toast.error("获取订单失败");
//     alert('获取订单失败')
//   } finally {
//     loading.value = false;
//   }
// };



/* ---------- 获取订单（分页） ---------- */
const fetchOrders = async (page = 1) => {
  page === 1 ? (loading.value = true) : (loadingMore.value = true)

  try {
    const res = await https.get(`/api/minsubaojie/mygrab-orders/?page=${page}`)
    // 后端分页返回结构示例：{ count, next, previous, results }
    const data = res // 如果你的 axios 拦截器已返回 data，可直接用 res
    if (page === 1) {
      orders.value = data.results
    } else {
      orders.value.push(...data.results)
    }
    // 解析下一页
    nextPage.value = data.next
      ? Number(new URL(data.next).searchParams.get('page'))
      : null
  } catch (err) {
    alert('获取订单失败')
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}





// 点击右边箭头返回
const click_left= () =>{
  
   router.go(-1)
}


const viewComments= (order_id) =>{
  const user_id = localStorage.getItem("user_id")
   router.push(`/rating3/${order_id}/${user_id}`)
}

/* ---------- 无限滚动触发 ---------- */
const loadMore = () => {
  // alert('heaa')
  console.log('nextPage',nextPage.value,'loadingmore',loadingMore.value)
  
  if (nextPage.value && loadingMore.value) {
    // alert("chufale ")
    fetchOrders(nextPage.value)
  }
}

function openConfirm(orderId) {
  currentOrderId.value = orderId
  showConfirm.value = true
}


// 格式化时间
const formatDate = (isoString) => {
  if (!isoString) return "时间不可用";
  const date = new Date(isoString);
  return date.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
};


const rejectOrder = async (orderId) => {
  try {
    await https.post(`/api/minsubaojie/grab-order/${orderId}/`);
    alert("抢单成功！");
    fetchOrders();
  } catch (error) {
    alert(error.response.data.error || "抢单失败");
  }
};




// 假设这两个变量已从父组件或 props 获得
// const orderId = 123  // 当前订单 ID
const cleanerId = 456  // 当前登录用户对应的 cleaner ID

const confirmSelected = async (orderId) => {
  try {
    const res = await https.post(`/api/minsubaojie/select_cleaner/${orderId}/`)
    alert('确认成功')
    showConfirm.value = false
    // 可选：刷新页面或更新状态
  } catch (err) {
    alert('确认失败，可能您不是被选中的人或已确认过')
    showConfirm.value = false
  }
}





onMounted(()=>{

  fetchOrders()
  localCleanerId.value = localStorage.getItem('cleaner_id')
}
);



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