
<template>
  <van-nav-bar title="修改房源" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>




  <div class="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg">
    <form @submit.prevent="updateHouse">
      <div class="mb-4">
        <label for="houseaddr" class="block font-medium">地址：</label>
        <input v-model="form.houseaddr" id="houseaddr" type="text" class="border rounded p-2 w-full" />
      </div>
      <div class="mb-4">
        <label for="city" class="block font-medium">城市：</label>
        <input v-model="form.city" id="city" type="text" class="border rounded p-2 w-full" />
      </div>
      <div class="mb-4">
        <label for="owner" class="block font-medium">房主：</label>
        <input v-model="form.owner" id="owner" type="text" class="border rounded p-2 w-full" />
      </div>
      <div class="mb-4">
        <label for="phone" class="block font-medium">电话：</label>
        <input v-model="form.phone" id="phone" type="text" class="border rounded p-2 w-full" />
      </div>
      <div class="mb-4">
        <label for="weixin" class="block font-medium">微信：</label>
        <input v-model="form.weixin" id="weixin" type="text" class="border rounded p-2 w-full" />
      </div>
      <div class="mb-4">
        <label for="price" class="block font-medium">价格：</label>
        <input v-model="form.price" id="price" type="number" class="border rounded p-2 w-full" />
      </div>
      <div class="mb-4">
    

        <label class="block mb-2">
          备注：
          <span class="text-gray-500 text-sm">(请详细列出工作内容时间和价格，最多 120 字)</span>
        </label>

        <textarea v-model="form.beizhu" rows="4" class="w-full p-2 border rounded-md mb-1"
          placeholder="请输入备注内容，最多200字" />

        <div class="text-right text-sm text-gray-500">
          {{ form.beizhu.length }}/120 字
        </div>

      </div>

      <h2 class="font-medium">房源图片：</h2>
      <div v-if="form.images.length" class="grid grid-cols-2 gap-4">
        <div v-for="(image, index) in form.images" :key="index" class="relative">
          <img :src="image.image" alt="房源图片" class="w-full h-auto rounded" />
          <button @click="removeImage(image.id,index)" type="button"
            class="absolute top-0 right-0 bg-red-500 text-white p-1 rounded">
            删除
          </button>
        </div>
      </div>

      <div class="mt-4">
        <label class="block font-medium">添加新图片：</label>
        <input type="file" @change="handleFileUpload" multiple />
      </div>

      <button style="margin-bottom: 50px;" type="submit"
        class="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        保存修改
      </button>
    </form>
  </div>

</template>

<script setup>
import axios from 'axios';
import config from '@/global.config.js'
import md5 from 'js-md5'
// import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';
import funcs from '@/utils/common_func.js';

import { showToast, showDialog } from 'vant';
import { ref, onMounted, computed,watch } from 'vue';

import { useRouter,useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

const router = useRouter()
const route = useRoute()

const category_url = ref('')
const house = ref('')
const form = ref({
  houseaddr: '',
  city: '',
  owner: '',
  phone: '',
  weixin: '',
  price: '',
  beizhu: '',
  images: [], // 现有图片
  newImages: [] // 新上传的图片
})
onMounted(() => {
  console.log('rout',route.params)
  var id =route.params.id
  console.log('id',id)
  https.get(('/api/minsubaojie/housedetail/'+id+'/')).then(response => {
     
      console.log(response);

      form.value = response
    }).catch(error => {
      console.log('出错了2');
      console.error(error);
      showToast('请重新登录');
    });

})

const handleFileUpload = (event) => {
  form.value.newImages = Array.from(event.target.files)
}

// 监听并限制 beizhu 长度为 200 字
watch(
  () => form.value.beizhu,
  (val) => {
    if (val && val.length > 120) {
      form.value.beizhu = val.slice(0, 120)
    }
  }
)

const removeImage = async (imageId, index) => {
  console.log('id',imageId)
  try {
    // 发送 DELETE 请求到后端
    await https.delete(`/api/minsubaojie/imgdel/${imageId}/`);
    
    // 从现有图片列表中删除（前端同步更新）
    form.value.images.splice(index, 1);
    
    console.log('图片删除成功');
  } catch (error) {
    console.error('删除图片失败:', error);
  }
};



const updateHouse = async () => {
  const formData = new FormData()
  formData.append('houseaddr', form.value.houseaddr)
  formData.append('city', form.value.city)
  formData.append('owner', form.value.owner)
  formData.append('phone', form.value.phone)
  formData.append('weixin', form.value.weixin)
  formData.append('price', form.value.price)
  formData.append('beizhu', form.value.beizhu)

  // 添加新上传的图片
  if (form.value.newImages){
    form.value.newImages.forEach((file) => {
  formData.append('new_images', file);  // 不要使用 new_images[0]
});
  }

  
  for (let [key, value] of formData.entries()) {
    console.log(key, value)
  }

  try {

    // await https.put2(`http://192.168.1.127:8000/api/minsubaojie/housedetail/${route.params.id}/`, formData,{
    await https.put2(`/api/minsubaojie/housedetail/${route.params.id}/`, formData,{
  headers: { 'Content-Type': 'multipart/form-data' }
});
    alert('修改成功！')
    // router.go(-1)
    router.push('/housedetail/'+route.params.id);

  } catch (error) {
    console.error('更新房源失败：', error)
  }

  //   // await axios.put(`/api/houses/${route.params.id}/`, formData)
  //   await https.put(`/api/minsubaojie/housedetail/${route.params.id}/`, formData)
  //   alert('修改成功！')
  //   router.go(-1)
  // } catch (error) {
  //   console.error('更新房源失败：', error)
  // }
}





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