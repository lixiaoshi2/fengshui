<template>
  <div class="p-4">
    <h2 class="text-lg font-semibold mb-3">举报管理</h2>

    <!-- 筛选区域 -->
    <div class="flex flex-wrap gap-2 items-center mb-4 text-sm">
      <label class="flex items-center gap-1">
        状态筛选：
        <select v-model="filterStatus" class="border px-2 py-1 rounded text-sm">
          <option value="">全部</option>
          <option value="pending">待审核</option>
          <option value="handled">已处理</option>
          <option value="rejected">无效举报</option>
        </select>
      </label>
      <input
        v-model="searchKeyword"
        type="text"
        placeholder="搜索被举报人/描述"
        class="border px-2 py-1 rounded text-sm"
      />
      <button @click="fetchReports" class="bg-blue-500 text-white px-3 py-1 rounded text-sm">
        搜索
      </button>
    </div>

    <!-- 表格模式（大屏） -->
    <div class="hidden md:block">
      <table class="w-full text-sm border">
        <thead>
          <tr class="bg-gray-100 text-left">
            <th class="p-2">举报人</th>
            <th  class="p-2">被举报人</th>
            <th class="p-2">理由</th>
            <th class="p-2">说明</th>
            <th class="p-2">状态</th>
            <th class="p-2">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in reports" :key="r.id" class="border-t">
            <td   class="p-2">{{ r.reporter }} ({{ r.reporter_phone }})</td>
            <td @click="showReportedUser(r.reported_user_id)" class="p-2">{{ r.reported_user }}({{ r.reported_phone }})</td>
            <td class="p-2">{{ r.reason }}</td>
            <td class="p-2 text-gray-600 truncate">{{ r.description }}</td>
            <td class="p-2">{{ statusText(r.status) }}</td>
            <td class="p-2">
              <button
                v-if="r.status === 'pending'"
                @click="handleReport(r.id, 'handled')"
                class="bg-green-500 text-white px-2 py-1 text-xs rounded mr-1"
              >标记处理</button>
              <button
                v-if="r.status === 'pending'"
                @click="handleReport(r.id, 'rejected')"
                class="bg-red-500 text-white px-2 py-1 text-xs rounded"
              >标记无效</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 卡片模式（小屏） -->
    <div class="md:hidden space-y-4">
      <div v-for="r in reports" :key="r.id" class="border rounded-lg p-3 shadow-sm bg-white text-sm">
        <p><span class="font-semibold">举报人：</span>{{ r.reporter }}({{ r.reporter_phone }})</p>
        <p><span @click="showReportedUser(r.reported_user_id)" class="font-semibold">被举报人：</span> <span>{{ r.reported_user }} ({{ r.reported_phone }})</span> </p>
        <!-- <p><span class="font-semibold">被举报人：</span> <span>{{ r.reported_user }} ({{ r.reported_phone }})</span> </p> -->
        <p><span class="font-semibold">理由：</span>{{ r.reason }}</p>
        <p><span class="font-semibold">说明：</span>{{ r.description }}</p>
        <p><span class="font-semibold">处理方法：</span>{{ r.remark }}</p>
        <p>
          <span class="font-semibold">状态：</span>
          <span
            :class="{
              'text-yellow-500': r.status === 'pending',
              'text-green-600': r.status === 'handled',
              'text-gray-500': r.status === 'rejected'
            }"
          >{{ statusText(r.status) }}</span>
        </p>
        <div v-if="r.status === 'pending'" class="mt-2 flex gap-2">
          <button @click="handleReport(r.id, 'handled')"
            class="bg-green-500 text-white px-3 py-1 rounded text-xs">标记处理</button>
          <button @click="handleReport(r.id, 'rejected')"
            class="bg-red-500 text-white px-3 py-1 rounded text-xs">标记无效</button>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="mt-4 text-sm flex justify-center items-center gap-2">
      <button @click="changePage(page - 1)" :disabled="page <= 1"
        class="px-3 py-1 border rounded disabled:opacity-50">上一页</button>
      <span>第 {{ page }} 页</span>
      <button @click="changePage(page + 1)" :disabled="!hasNext"
        class="px-3 py-1 border rounded disabled:opacity-50">下一页</button>
    </div>
  </div>


<!-- 用户详情弹窗 -->
<div v-if="selectedUser" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
  <div class="bg-white rounded-lg p-4 w-full max-w-xl shadow-lg relative">
    <h3 class="text-lg font-semibold mb-3">被举报人详情：{{ selectedUser.username }}</h3>
    
    <p><strong>用户名：</strong>{{ selectedUser.username }}</p>
    <p><strong>邮箱：</strong>{{ selectedUser.email || '无' }}</p>
    <p><strong>电话：</strong>{{ selectedUser.phone || '无' }}</p>

    <h4 class="mt-4 font-semibold">Ta 的被举报记录：</h4>
    <ul class="text-sm divide-y mt-1 max-h-40 overflow-auto">
      <li v-for="record in selectedUser.reports" :key="record.id" class="py-2">
        <p><strong>举报人：</strong>{{ record.reporter }}</p>
        <p><strong>理由：</strong>{{ record.reason }}</p>
        <p><strong>说明：</strong>{{ record.description }}</p>
        <p><strong>处理结果：</strong>{{ record.remark }}</p>
        <p><strong>状态：</strong>{{ statusText(record.status) }}</p>
        <p v-if="record.remark"><strong>备注：</strong>{{ record.remark }}</p>
      </li>
    </ul>

    <button class="absolute top-2 right-2 text-gray-500" @click="selectedUser = null">✕</button>
  </div>
</div>


</template>




  <script setup>

  import { ref, onMounted } from 'vue'
 
  import https from '@/utils/request.js';
  
  const reports = ref([])
const page = ref(1)
const hasNext = ref(false)
const filterStatus = ref('')
const searchKeyword = ref('')

const fetchReports = async () => {
  const res = await https.get('/api/minsubaojie/report_admin_list/', {
    params: {
      page: page.value,
      status: filterStatus.value,
      keyword: searchKeyword.value
    }
  })
  reports.value = res.results
  hasNext.value = res.has_next
}

const changePage = (newPage) => {
  if (newPage < 1) return
  page.value = newPage
  fetchReports()
}

const handleReport = async (id, status) => {
  const remark = prompt(`请输入处理备注：`)
  await https.post(`/api/minsubaojie/handle_report/`, { id, status, remark  })
  fetchReports()
}

const statusText = (status) => {
  return {
    pending: '待审核',
    handled: '已处理',
    rejected: '无效举报'
  }[status] || ''
}

// 查看被举报人详情
const selectedUser = ref(null)

const showReportedUser = async (userId) => {
  console.log('keyile ')
  const res = await https.get(`/api/minsubaojie/user_report_detail/${userId}/`)
  selectedUser.value = res
}


onMounted(() => fetchReports())



  </script>
  