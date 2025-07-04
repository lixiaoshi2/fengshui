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
// import { Notify } from 'vant';
let server_url = config.backendserver + 'api/'+ localStorage.getItem('appname') +'/upload/?uid='+localStorage.getItem('user_id')
console.log('server_url', server_url)
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

// onBeforeMount(() => {
//   console.log('asdf')
//   if (appname2==null){
//     console.log('123454')
//     var appname2 = localStorage.getItem('category_api_url')
//     var a = appname2.indexOf("/",3);
//     appname2 = appname2.slice(a+1)
//     a = appname2.indexOf("/");
//     appname2 = appname2.slice(0,a)
//     // console.log(appname2.slice(a+1));
//     // console.log('a',appname2)
//     appname.value = appname2
//     url2.value = config.backendserver + 'api/'+ appname2 +'/upload/?uid=22'
//     console.log('appname', appname.value)
//     console.log('appname', url2.value)
//   }
//   else{
//     alert('请先选择分类')
//   }
 
// })


// uppy-0001/jpg-1e-image/jpeg-281759-1716082800627
// uppy-img/20171004/161736/jpg-2v-2v-1e-image/jpeg-82899-1716158591321
// uppy-0001/jpg-1e-image/jpeg-281759-1716082800627'
const toolbarConfig = {}
const editorConfig = { 
  placeholder: '图片一次只能输入一张，图片不能超过12张，图片不能大于300K...' ,
  MENU_CONF: {
    uploadImage: {
      // server: 'http://192.168.1.165:8000/api/hotel/upload/?uid=22', //这是后台上传文件的处理地址
      // server: 'http://192.168.1.165:8000/api/app01cleaning/upload/?uid=22', //这是后台上传文件的处理地址
      server: config.backendserver + 'api/'+ localStorage.getItem('appname') +'/upload/?uid='+localStorage.getItem('user_id'), //这是后台上传文件的处理地址
      // server: config.backendserver + 'api/app01cleaning/upload/?uid=22', //这是后台上传文件的处理地址
      // server: url2.value, //这是后台上传文件的处理地址
      fieldName: 'file_field', //这个定义了文件上传的输入框的name，这个名字是和django后台的drf一致，也要和model一致
      // 单个文件的最大体积限制，默认为 2M
      maxFileSize: 6*1024 * 1024, // 300K
      // 最多可上传几个文件，默认为 10
      maxNumberOfFiles: 12,
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
        console.log('shangchuanqian 上传前')
        console.log(file_field)
        const editor = editorRef.value
        // console.log('editor22',editor)
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
        if (file_field[keys[0]].size>6*1024*1024){
          alert('文件不能超过6M，请压缩后上传 ')
          console.log('文件太大不能传2')
           // // editor.Alert('asdfas')
          // new Notify({ type: 'primary', message: 'asf aewrtfqaew' })
          return false
        }
        return file_field
      }, 

      // 单个文件上传失败
    // onFailed(file: File, res: any) {   // TS 语法
    onFailed(file, res) {           // JS 语法
        console.log(`${file.name} 上传失败`, res)
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