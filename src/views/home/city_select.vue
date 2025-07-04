<template>
    <!-- <weizhi v-model:fieldValue="weizhizhi" ref="weizhiref" ></weizhi> -->
    <van-nav-bar title="邻家网-就近找" left-text="返回" @click="router.go(-1);"  left-arrow>
<template #right>
  <van-icon name="search" size="18" />
</template>
</van-nav-bar>
   
 
   <div style="margin:20px; margin-top: 20px; font-size: 14px; ">请输入您所在城市</div>

   <div style="margin-top:20px; " >
    
    <!-- <city_select></city_select> -->
    <van-field style="margin-bottom: 10px;" v-model="city" label="城市名：" placeholder="请输入英文的城市名字"  />
    
    <div style="margin: 16px; width: 100%; display: flex; justify-content: center;  align-items: center;">
        <van-button round style="width: 40%; " type="success" @click="choosecity" >保存</van-button>
    </div>
    
   </div>

   <!-- {{ geolocation }} -->

</template>
     
<script setup>
import { ref} from 'vue';
import { useRouter,useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()



const city = ref('');

// city.value = localStorage.getItem('city');
// const location = ref([])


const choosecity = () =>{
    console.log('adf');
    localStorage.setItem('city',city.value)
    router.push({path:"/home"})
}





</script>
     
<style>

</style>