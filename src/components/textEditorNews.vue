<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"  />
    <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" 
      @onCreated="handleCreated" />
  </div>
 <!-- 参数2从父组件传递过来的参数  {{ modelValue2 }} -->
</template>
<script setup lang="ts">
import { ref, watch, onMounted, watchEffect,onBeforeMount } from 'vue';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { onBeforeUnmount, shallowRef } from 'vue';

import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
// import config from '@/global.config.js';
import config from '../global.config.js';
import { Notify } from 'vant';

// import { showToast } from 'vant';
// import { Dialog } from 'vant';
// const appname = ref('')
var appname2 = ''
// // 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const url2 = ref('')
// const url3= 'app01cleaning'
const appname= localStorage.getItem('appname')

// 因为在打开这个组件的时候，my_post也就是提交页面已经打开，这时候已经经过了选择发布内容，发布内容


var backurl = ''
var frontend = window.location.hostname   //获取前端的地址
console.log('frontend', frontend)

// // 这里是根据前端的地址，设置后端的地址 
// if (!isNaN(Number(frontend[0]))){
  if (window.location.protocol == "http:"){
  // console.log('前端是数字，则用第一个backendserver1')
  backurl = config.backendserver1;
}else{
  backurl = config.backendserver2;
}

const toolbarConfig = {}
const editorConfig = { 
  placeholder: '先点击此处，然后才能点击上传图片，图片不能大于7M，如果采购多个眼镜可以合并在这里，以一个订单下单，在这里把数量、型号、验光单、瞳距等提交到这里就可以了，总金额也自己修改。...' ,
  MENU_CONF: {
    uploadImage: {
      // server: 'http://192.168.1.165:8000/api/hotel/upload/?uid=22', //这是后台上传文件的处理地址
      // server: 'http://192.168.1.165:8000/api/app01cleaning/upload/?uid=22', //这是后台上传文件的处理地址
      server: backurl + 'api/news/upload/?uid='+localStorage.getItem('user_id'), //这是后台上传文件的处理地址
      // server: config.backendserver + 'api/app01cleaning/upload/?uid=22', //这是后台上传文件的处理地址
      // server: url2.value, //这是后台上传文件的处理地址
      fieldName: 'file_field', //这个定义了文件上传的输入框的name，这个名字是和django后台的drf一致，也要和model一致
      // 单个文件的最大体积限制，默认为 2M
      maxFileSize: 8*1024 * 1024, // 300K
      // 最多可上传几个文件，默认为 10
      maxNumberOfFiles: 4,
      // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
      allowedFileTypes: ['image/*'],
      // name:'file_field',
      customInsert(res:any,insertFn:any){
          console.log(res);
          // addr 一定要加上前面的服务器，否则系统会自动加上vue服务器的地址，这样获得的地址不是后台的地址 ，
          // 这个地址是从服务器上返回的地址，也就是说，程序到这里已经完成了文件上传
          // let addr = "http://192.168.1.165:8000/" + res.data.file_field
          let addr = config.backendserver + res.data.file_field
          console.log('addr', addr)
          console.log('file_fielda',)
          insertFn(addr);
      },
      onBeforeUpload(file_field){
        console.log(file_field)
        const editor = editorRef.value
        console.log('data1',file_field[0])
        console.log('data2',file_field.data)

        const keys = Object.keys(file_field);
        // 获取第一个属性
        console.log('keys',keys)
        const firstProperty = keys[0];
        // console.log(firstProperty)
        // console.log('222',file_field.firstProperty)
        // console.log('2223',file_field[keys[0]])
        // console.log('2223',file_field[keys[0]].size)
        if (file_field[keys[0]].size>8*1024*1024){
          // alert('文件太大，不能上传 ')
           // // editor.Alert('asdfas')
          // new Notify({ type: 'primary', message: 'asf aewrtfqaew' })
          return false
        }
        return file_field
      },
     
      
    }
  }

};


// // // 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
      editor.destroy()
})
    
const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
// 这个定义了父组件到子组件传递的数据，本组件是子组件，用props定义
// 父组件的定义 <textEditor :modelValue="content" :modelValue2="content_id" v-model='content' ></textEditor>
const props = defineProps({
    modelValue:{
        type:String,
        default:""
    },
    modelValue2:{
        type:String,
        default:""
    },
});
// emit定义了子组件到父组件的值
const emit = defineEmits(["update:modelValue"])
const valueHtml = ref(props.modelValue);
// 这一句定义了从父组件传递过来的数据，能够响应式被子组件获取，主要针对从服务端获取数据
watch(props, (newVal) => valueHtml.value = newVal.modelValue)
// 这一句主要是将子组件中的valueHtml数据有新数据newVal后赋值给update:modelValue，这个值又通过父子组件的props传递到父组件，用的是modelValue
watch(valueHtml, (newVal) => emit("update:modelValue", newVal))

// 这里我想修改上传地址

// 这里如果是要修改内容的话，在这里加载组件的时候把数据从服务器导入，然后再修改
//  onMounted(()=>{
  // // 从服务器上获取数据
//         valueHtml.value= "<p>asdf </p>" 
//   })

</script>
    <style scoped>
    :deep .van-address-list__bottom {
      display: none;
    }  
    .van-radio__icon {
      display: none;
    }
    </style>