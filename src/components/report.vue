<template>
     <div v-if="isFormVisible" style="margin-bottom: 20px;">
        
        
        <h5 style="display: flex;   justify-content: center; align-items: center;">请在这里提交举报的内容</h5>
        
        <van-field  v-model="message" placeholder="请输入留言" type="textarea" input-class="custom-textarea" autosize rows="3" show-word-limit maxlength="200" />
        <div style="display: flex;   justify-content: center; align-items: center; ">
            <van-button style="width:20%; height: 30px;" size="media" @click="showDialog"  type="primary">提 交</van-button>
        </div>
        
   
    </div>
    <div class="wrapper2"
        style="display: flex; padding: 10px;margin-top:20px; margin-bottom:60px;  color: chocolate; font-size: 13px;">
        <div style="flex:  0 0 75%;">
            申明：本网的信息由信息发布者提供，信息的合法性和真实性由信息发布者负责，请自行辨别信息真伪，并谨慎决策！
        </div>
        <div style="flex:  0 0 25%; color: chocolate;margin-right:8px; ">
            <van-button  style="width:75%" type="danger" size="media" @click="handleClick">举报</van-button>
        </div>
       
    </div>
 
       
    <div>
        
        <!-- 使用 Teleport 在全局插槽中渲染 Dialog -->
        <teleport to="body">
        <!-- <van-dialog v-model:show="dialogVisible" title="提示" message="这是一个消息框" /> -->
        <van-dialog v-model:show="dialogVisible"  message="举报已提交，平台核实后做进一步处理。" />
        </teleport>
    </div>

        <!-- <div style="margin-bottom: 30px" v-if="!isFormVisible"></div> -->


</template>

<script setup>

import { ref, onMounted, computed, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { Dialog } from 'vant';

const category2 = ref([])
const message = ref('')
const isFormVisible = ref(false)
// 这段程序获取
const handleClick = () => {
    // 1. 获取当前的网址，标志着可以找到这篇文章
    const currentUrl = window.location.href;
    const currentUrl2 = window.location.origin;
    const length = currentUrl2.length;
    const length2 = currentUrl.length;
    const truncatedStr = currentUrl.slice(length, length2);
    console.log(truncatedStr)

    // console.log(currentUrl);
    // console.log(window.location)
    // 2. 弹出一个表单可以输入举报的内容
    isFormVisible.value = true;

}

// const contentClick = () =>{
//     isFormVisible.value = true;
//     console.log('已经提交到服务器了')
//     // showDialog

// }

const contentClick = () => {
    console.log('已经提交到服务器了')
}

const dialogVisible = ref(false);

const showDialog = () => {
  // 设置 dialogVisible 为 true 来显示 Dialog
  dialogVisible.value = true;
  isFormVisible.value = false;
}

</script>


<style scoped>
:deep .van-field__body {
  border: 1px solid #cec1c1;
  border-radius: 5px;
}
.custom-textarea .van-field__control {
  border: 1px solid #383030;
  border-radius: 5px;
  padding: 5px;
}

:deep #van-field-1-input{
    padding: 5px;
}

</style>