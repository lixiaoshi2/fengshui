<template>
    <!-- <weizhi v-model:fieldValue="weizhizhi" ref="weizhiref" ></weizhi> -->
    <van-nav-bar title="邻家网 - 分类选择" left-text="返回" @click=" this.$router.go(-1);" left-arrow>
        <template #right>
        <van-icon name="search" size="18" />
        </template>
    </van-nav-bar>
    
   
    <!-- <van-field v-model="text" label="全站查找" placeholder="请输入要查询的关键字" /> -->
    
   
    <category></category>

</template>
     
<script setup>
import { ref, watch, onMounted, defineEmits, defineProps } from 'vue';
import { useRouter,useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
import category  from '@/components/category.vue' 
var weizhizhi= ref('');
const columns = [
      { text: '多伦多', value: 'Toronto' },
      { text: '温哥华', value: 'Vancouver' },
      { text: '温州', value: 'Wenzhou' },
      { text: '绍兴', value: 'Shaoxing' },
      { text: '湖州', value: 'Huzhou' },
    ];
    const fieldValue = ref('');
    const showPicker = ref(false);


    const onConfirm = ({ selectedOptions }) => {
      showPicker.value = false;
      fieldValue.value = selectedOptions[0].value;
      localStorage.setItem("city",fieldValue.value);
      console.log(fieldValue.value)
    };

    const handleEnter = ({  }) => {
        router.push({
        name: 'parent', // 路由的名称
        params: { inputText: this.inputText } // 传递的参数
      });
        // search_position = localStorage.getItem("search_position")
        localStorage.setItem("search_position",)
    };

    onMounted(() => {
        fieldValue.value =  localStorage.getItem("city")
    })


</script>
     
<style>

</style>