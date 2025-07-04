<template>
  <div>
    <van-field v-model="fieldValue" is-link readonly label="地区" placeholder="请选择所在地区" @click="show = true" />
    <van-popup v-model:show="show" round position="bottom">
      <van-cascader v-model="cascaderValue" title="请选择所在地区" :options="options" @close="show = false" @finish="onFinish" />
    </van-popup>
  </div>
</template>

<script setup >
  import { ref,  watch,onMounted,defineEmits,defineProps  } from 'vue';

  import config from '@/global.config.js'
  
    const show = ref(false);
    const fieldValue = ref('');
    const cascaderValue = ref('');
    // 选项列表，children 代表子选项，支持多级嵌套
    const options = [
      {
        text: 'ON',
        value: '330000',
        children: [{ text: 'Toronto', value: '330100' },{ text: 'Ottawa', value: '330200' },
        { text: 'Hamilton', value: '330100' },{ text: 'London', value: '330100' }],
      },
      {
        text: 'BC',
        value: '320000',
        children: [{ text: 'Vancouver', value: '320100' }],
      },
    ];
   
    
     // 全部选项选择完毕后，会触发 finish 事件
     const onFinish = ({ selectedOptions }) => {
      show.value = false;
      fieldValue.value = selectedOptions.map((option) => option.text).join('/');
      emit('update:fieldValue',fieldValue.value);
    };

    const props = defineProps({
      fieldValue:{
        type:String
      }
     });
     const emit = defineEmits(['update:fieldValue']);
   
    watch(props, (newVal) => fieldValue.value = newVal.fieldValue)

 
   

  //     showlocation: false,  // 这一段是获取地址的配置 活动地址区域控制显示
  //     // 活动区域位置，选择输入
  //     cascaderValue: '',

  //     region: '',  //活动区域
  //     // 选项列表，children 代表子选项，支持多级嵌套
  //     options: [
  //       {
  //         text: '大多地区',
  //         value: '330000',
  //         // 这是自选项，如果有则不断会触发选择，没有的话则直接选择
  //         children: [
  //           { text: '多市中心', value: '330100' },
  //           { text: '北约克', value: '330100' },
  //         ],
  //       },
  //       {
  //         text: '温哥华',
  //         value: '320000',
  //         // children: [{ text: '南京市', value: '320100' }],
  //       },
  //     ],
 


</script>

<style></style>