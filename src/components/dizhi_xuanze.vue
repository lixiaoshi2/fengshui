<template>
 地址选择
    <van-field
     v-model="fieldValue"
     is-link
     readonly
     label="地址"
     placeholder="请选择地址"
     @click="showPicker = true"
   />
  
   <van-popup v-model:show="showPicker" round position="bottom">
     <van-picker
       :columns="columns"
       @cancel="showPicker = false"
       @confirm="onConfirm"
     />
   </van-popup>
     
   </template>
     
<script setup>
import { ref, watch,onMounted } from 'vue';
import https from '@/utils/request.js';
import { showToast } from 'vant';
const columns = ref([
    { text: '活动', value: '01' },
    { text: '分销', value: '02' },
    { text: '家厨预售', value: '03' },

]);

const fieldValue = ref('');
const showPicker = ref(false);

const user_id = ref();
const wanzhengdizhimoren = ref('');
const props = defineProps({
fieldValue:{
    type:String
}
});
const emit = defineEmits(['update:fieldValue'])
watch(props, (newVal) => fieldValue.value = newVal.fieldValue)
const onConfirm = ({ selectedOptions }) => {
    showPicker.value = false;
    fieldValue.value = selectedOptions[0].text;
    emit('update:fieldValue',fieldValue.value); //当选项发生变化发送出去
};


onMounted(() => {
    console.log('时间mouted');
   
    const id = localStorage.getItem("id");
    user_id.value = localStorage.getItem("user_id");

    
    var values2 = {
        "user_id": user_id.value,
    }
    const list2 = ref([]);
    https.get('/my/info/addresses', values2).then(response => {
        console.log('asdfas555111');
        console.log('fanhuizhi', response);
        console.log('length', response.length);
        // list2.value[0].id = response[0]._id;
        for (let i = 0; i < response.length; i++) {
            var item = {}
            item.value = response[i]._id;
            // item.tel = response[i].postcode;
            // item.name = response[i].name;
            // item.wanzheng = response[i];
            item.text = response[i].name +' ' + response[i].address_1 + ' ' + response[i].city + ' ' + response[i].state;

            list2.value.push(item);

            // list2.value[i].address = 
            // list2.value[i].tel = response[i].postcode;
            // list2.value[i].name = response[i].name;

        }
        console.log('list2', list2.value);
        columns.value = list2.value;
        // list = list2.value;
    }).catch(error => {
        console.log('出错了2');
        console.error(error);
        showToast('请重新登录');
    });

});




</script>

<style>

</style>

