
<template>
  <!-- <van-nav-bar title="萝卜保洁" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
    <template #title>
      <label class="block text-lg font-medium text-gray-700">萝卜家政</label>
    </template>
  </van-nav-bar> -->


  <van-nav-bar title="我的查找任务" left-text="返回"  @click-left="router.go(-1)" left-arrow>
    <template #right>
     
      <van-icon name="question-o" size="18" @click="showImage = true" />
    </template>
  </van-nav-bar>

   <!-- 弹出图片窗口 -->
   <van-popup v-model:show="showImage" position="center" closeable round>
    <img
      src="/images/help2/getcleanerorder.jpg"
      alt="帮助图片"
      style="max-width: 90vw; max-height: 80vh; border-radius: 8px"
    />
   </van-popup>




  <div class="max-w-3xl mx-auto p-4 mb-10">
    <!-- <h2 class="text-xl font-bold mb-4">我的查找记录</h2> -->
    <div v-if="orders.length === 0">
      <p>暂无订单</p>
    </div>
    <div v-else class="space-y-4">
      <div v-for="order in orders" :key="order.id" class="p-4 border rounded-md">

        <div class="flex items-center justify-between">
          <p><strong>编号：</strong>{{ order.id }}</p>
          <button @click="openEditModal(order)"
            class="ml-4 px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600 text-sm">
            编辑
          </button>
        </div>


        <p><strong>房屋地址：</strong>{{ order.city }}{{ order.houseaddr }}</p>
        <!-- <p><strong>城市：</strong>{{ order.city }}</p> -->
        <p><strong>家政类型：</strong>{{ order.cleantype }}</p>
        <p><strong>信息费：</strong>{{ order.price }} 元</p>
        <p><strong>联系人：</strong>{{ order.contact_name }}，电话:{{ order.contact_phone }}</p>
        <!-- <p><strong>联系人电话：</strong>{{ order.contact_phone }}</p> -->
        <p><strong>下单时间：</strong>{{ formatDate(order.create_time) }}</p>
        <p><strong>备注：</strong>{{ order.beizhu || '无备注' }}</p>


        <!-- 订单状态 -->
        <p><strong>订单状态：</strong> {{ order.order_status }}</p>

        <!-- 显示所有投标人员 -->

        <p><strong>响应人员：</strong>
          <button @click="biders(order.id)"
            class="text-sm px-4 py-1 ml-6 text-white rounded-md bg-blue-500 hover:bg-blue-600">
            查找结果
          </button>
        </p>



        <!-- 显示所有匹配人员 -->

        <!-- 显示分配的保洁员信息 -->
        <!-- <p v-if="order.cleaner">
          <strong>保洁员：</strong> {{ order.cleaner_name }} ({{ order.contact_phone }})
        </p> -->


        <!-- 编辑弹窗 -->
        <div v-if="showModal"
          class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto px-4">
          <div class="bg-white p-6 rounded-md w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <h3 class="text-lg font-semibold mb-4">编辑工作详情</h3>

            <label class="block mb-2">房屋地址：</label>
            <input readonly v-model="editForm.houseaddr" class="w-full p-2 border rounded-md mb-4" />

            <label class="block mb-2">城市：</label>
            <input readonly v-model="editForm.city" class="w-full p-2 border rounded-md mb-4" />

            <!-- 服务类型 -->
            <div class="mb-2">
              <label class="block text-lg font-medium mb-2">服务类型：</label>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <label class="flex items-center" v-for="(price, type) in servicePrices" :key="type">
                  <input type="radio" name="cleantype" :value="type" v-model="editForm.cleantype"
                    class="text-blue-600 focus:ring-blue-500" />
                  <span class="ml-2 text-gray-700 text-sm">{{ type }}</span>
                </label>
              </div>

              <div class="mt-4 text-gray-700">
                <p>平台收取费用：<strong>{{ servicePrice }}</strong> 元</p>
                <p>可获得 <strong>{{ contactCount }}</strong> 人的联系方式</p>
              </div>


            </div>



            <label class="block mb-2">联系人：</label>
            <input v-model="editForm.contact_name" class="w-full p-2 border rounded-md mb-4" />

            <label class="block mb-2">联系电话：</label>
            <input v-model="editForm.contact_phone" class="w-full p-2 border rounded-md mb-4" />

            <label class="block mb-2">备注：(请详细列出工作内容、时间和价格，最多150)</label>


            <textarea v-model="editForm.beizhu" rows="4" class="w-full p-2 border rounded-md mb-1" maxlength="1200"
              placeholder="请输入备注内容，最多50字"></textarea>

            <div class="text-right text-sm text-gray-500">
              {{ editForm.beizhu.length }}/120 字
            </div>

            <div class="flex justify-end gap-4">
              <button @click="closeModal" class="px-4 py-2 bg-gray-400 text-white rounded-md">取消</button>
              <button @click="saveOrder" class="px-4 py-2 bg-blue-500 text-white rounded-md">保存</button>
            </div>
          </div>
        </div>

        <!-- 编辑弹窗 -->

        <div class="flex justify-center gap-4 mt-4">

          <button v-if="order.order_status === '执行中' " @click="matched(order.id)"
            class="text-sm px-2 py-1 text-white rounded-md"
            :class="order.order_status === '待处理' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-yellow-500 hover:bg-yellow-600'">
            查找中...
          </button>


          <button v-if="order.order_status === '待处理' " @click="assignCleaner(order)"
            class="px-4 text-sm py-1 text-white rounded-md"
            :class="order.order_status === '待处理' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-yellow-500 hover:bg-yellow-600'">
            正式查找
          </button>

          <button v-if="order.order_status === '已抢单' " @click="matched(order.id)"
            class="text-sm px-2 py-1 text-white rounded-md"
            :class="order.order_status === '待处理' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-yellow-500 hover:bg-yellow-600'">
            处理匹配
          </button>

          <button v-if="order.order_status === '已确认' " @click="matched(order.id)"
            class="text-sm px-2 py-1 text-white rounded-md bg-blue-500 hover:bg-blue-600">
            查看匹配
          </button>

          <template v-if="order.pay_status === '未支付'">

            <button @click="showConfirmfun(order) "
              class="text-sm px-2 py-1 text-white rounded-md bg-blue-500 hover:bg-blue-600">
              去支付
            </button>
          </template>

          <template v-else>
            <p class="h-7 text-sm py-0  items-center font-semibold text-green-600">
              ✅ 已支付
            </p>
          </template>

          <button @click="assignCleaner(order)" v-if="order.order_status == '待处理' || order.order_status == '执行中'"
            class="text-sm px-2 py-1 text-white rounded-md bg-blue-500 hover:bg-blue-600">
            重新查找
          </button>

        </div>

      </div>
    </div>
  </div>


  <!-- 支付确认框 -->
  <!-- 自定义弹窗 -->
  <div v-if="showConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <p class="text-lg mb-4">支付前请查看周围是否有足够的人选，如果没有请不要支付，平台不退款</p>
      <div class="flex justify-end space-x-4">
        <button @click="confirmPay()" class="px-4 py-2 bg-blue-500 text-white rounded-lg">确定</button>
        <button @click="showConfirm = false" class="px-4 py-2 bg-gray-300 rounded-lg">取消</button>
      </div>
    </div>
  </div>

  <!-- 支付确认框 -->



</template>

<script setup>

import config from '@/global.config.js'

// import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';

import { ref, onMounted, computed,watch } from 'vue';

import { useRouter,useRoute } from 'vue-router'


const router = useRouter()
const route = useRoute()



const orders = ref([])
const showImage =ref(false)
const fetchOrders = async () => {
  try {
    const response = await https.get('/api/minsubaojie/my-orders/')
    orders.value = response

  } catch (error) {
    console.error('获取订单列表失败:', error)
  }
}

// 获取所有已抢单的人员表
const biders = (orderid) =>{
  console.log('orderid',orderid)
  router.push("/bids/"+orderid)

}

// 直接让雇主可以查询到周围的家政人员
const assignCleaner = (order) => {
  console.log('paystatus',order.pay_status)
  localStorage.setItem("pay_status",order.pay_status)
  localStorage.setItem("order_id",order.id)
  localStorage.setItem("order_money",order.price)
  // localStorage.setItem("pay_status","未支付")
  router.push({ path: "/getcleaner/", query: { order_id: order.id , price:order.price } });
  
};


// // 定义服务类型与价格的映射

const servicePrices =config.servicePrices


const servicePrice = computed(() => {
  return servicePrices[editForm.value.cleantype] || 0
})

const contactCount = computed(() => {
  const price = servicePrice.value
  if (price === 100) return 3
  if (price === 20) return 1
  return 0
})


const showConfirm = ref(false);

const confirmAction = () => {
  console.log("用户点击了确定");
  showConfirm.value = true;
};

const currentOrderId = ref('')
const currentPrice = ref('')

const showConfirmfun = (order)=>{

  showConfirm.value = true
  currentOrderId.value = order.id
  currentPrice.value = order.price
  

}


// // 实际支付
const confirmPay = async() => {

  console.log('支付了',currentOrderId.value)

 router.push({ path: "/show_erweima", query: { order_id: currentOrderId.value ,price:currentPrice.value} })

  

  
};



// 直接让雇主可以查询到周围的家政人员
const matched = (orderid) => {
  console.log("orderid",orderid)
  router.push({ path: "/getselectcleaner/", query: { order_id: orderid } });
  
};

// 直接让雇主可以查询到周围的家政人员
const rematched = (orderid) => {
  console.log("orderid",orderid)
  router.push({ path: "/getselectcleaner/", query: { order_id: orderid } });
  
};



// 分配最近的家政人员
const assignCleaner2 = async (order) => {

  if(order.pay_status=="未支付"){
    console.log("adsfasd支付信息")
    alert('请先付费，才能发起家政人员分配')
  }
else{

  try {
    const response = await https.post("/api/minsubaojie/find_nearest_cleaners/", {
      order_id: order.id,
    });

    if (response.data.success) {
      order.cleaner = response.data.cleaner;
      order.status = "已分配";
      alert("家政人员分配成功！");
    } else {
      alert("未找到合适的家政人员，请稍后重试！");
    }
  } catch (error) {
    console.error("派单失败:", error);
    alert("派单失败，请检查网络或稍后再试！");
  }
}
};




// 格式化时间
const formatDate = (isoString) => {
  if (!isoString) return "时间不可用";
  const date = new Date(isoString);
  return date.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
};

// 编辑处理

const showModal = ref(false);
// const editForm = ref({});
const editForm = ref({
  beizhu: ''
})

const openEditModal = (order) => {
  editForm.value = { ...order };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

watch(
  () => editForm.value.beizhu,
  (val) => {
    if (val && val.length > 120) {
      editForm.value.beizhu = val.slice(0, 120)
    }
  }
)

const saveOrder = async () => {
  console.log('orderdata',editForm.value)
  try {
    // const response = await https.put(`/api/minsubaojie/orderUpdate/${editForm.value.id}/`, {
    //   body: JSON.stringify(editForm.value),
    // });
    const response = await https.put(`/api/minsubaojie/updateOrder/${editForm.value.id}/`, editForm.value);

    // if (!response.ok) throw new Error('保存失败');

    const index = orders.value.findIndex(order => order.id === editForm.value.id);
    if (index !== -1) orders.value[index] = { ...editForm.value };

    closeModal();
    alert('订单已更新');
  } catch (error) {
    alert(error.message);
  }
};

// 编辑处理



onMounted(() => {
  fetchOrders()
})


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