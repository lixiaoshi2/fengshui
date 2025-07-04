<template>
  <div class="p-4">
    <h2 class="text-lg font-bold mb-4">📍 我的地址</h2>

    <van-cell-group>
      <van-cell
        v-for="item in addresses"
        :key="item.id"
        :title="item.label"
        :label="item.detail"
        is-link
        @click="editAddress(item)"
      >
        <template #right-icon>
          <van-icon name="delete" @click.stop="deleteAddress(item)" />
        </template>
      </van-cell>
    </van-cell-group>

    <div class="mt-6 text-center">
      <van-button type="primary" @click="openAddDialog">➕ 添加新地址</van-button>
    </div>

    <!-- 地址表单弹窗 -->
    <van-dialog v-model:show="showDialog" title="地址信息" show-cancel-button @confirm="saveAddress">
      <van-field v-model="form.label" label="标签" placeholder="如 家 / 公司" />
      <van-field v-model="form.detail" label="详细地址" />
      <van-field v-model="form.contact_name" label="联系人" />
      <van-field v-model="form.contact_phone" label="电话" />
    </van-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import https from '@/utils/request'
import { showToast, Dialog } from 'vant'

const addresses = ref([])
const showDialog = ref(false)
const form = ref({})

const loadAddresses = async () => {
  const res = await https.get('/api/fengshui/addresses/')
  addresses.value = res.addresses
}

const openAddDialog = () => {
  form.value = {}
  showDialog.value = true
}

console.log(Dialog)

// Dialog.confirm({
//   message: '确认删除这个地址吗？'
// }).then(() => {
//   // 用户确认
// })


const editAddress = (addr) => {
  form.value = { ...addr }
  showDialog.value = true
}

const saveAddress = async () => {
  if (form.value.id) {
    await https.put(`/api/fengshui/addresses/${form.value.id}/`, form.value)
    showToast('修改成功')
  } else {
    await https.post('/api/fengshui/addresses/', form.value)
    showToast('添加成功')
  }
  showDialog.value = false
  loadAddresses()
}

const deleteAddress = async (addr) => {
  if (window.confirm('确认删除这个地址吗？')) {
    await https.delete(`/api/fengshui/addresses/${addr.id}/`)
    showToast('删除成功')
    loadAddresses()
 }


//   Dialog.confirm({ message: '确认删除这个地址吗？' }).then(async () => {
//     await https.delete(`/api/fengshui/addresses/${addr.id}/`)
//     showToast('删除成功')
//     loadAddresses()
//   })
}

onMounted(loadAddresses)
</script>
