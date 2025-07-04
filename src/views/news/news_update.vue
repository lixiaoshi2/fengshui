
<template>
  <van-nav-bar title="修改文档" left-text="返回" @click=" router.go(-1);" left-arrow>
<template #right>
  <van-icon name="search" size="18" />
</template>
</van-nav-bar>



<van-form @submit="onSubmit" style="margin-bottom:65px; margin-top:30px;">
    <!-- 在双括号里的router不要this，而在click里的参数则需要this变量 -->
  
    <!-- {{ id }} --><!-- 这个id来源于data里的this.$route.query.id,从url里获取 -->
  

    <van-field v-model="title" name="title" label="标题" placeholder="请输入文档标题" :value="title"
        :rules="[{ required: true, message: '请输入文档标题' }]" />


    

    <van-field name="title" label="详情" readonly="true" />
    <van-field name="detail">
        <template #input>
          
          <textEditor :modelValue="content" :modelValue2="content_id" v-model='content' ></textEditor> 
          
        </template>
      </van-field>

    

    <div style="margin: 16px; ">
        <van-button round block  type="primary" native-type="submit">保存修改</van-button>
    </div>
    </van-form>
   
</template>

<script setup>
import axios from 'axios';
import config from '@/global.config.js'
import md5 from 'js-md5'
// import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';
import { useStore } from 'vuex'
import { showDialog, showToast } from 'vant';
import { ref, onMounted, computed,reactive } from 'vue';
import textEditor  from "@/components/textEditorNews.vue"  
import weizhi from '@/components/weizhi.vue'
import { useRouter,useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const id = ref('')
const retdata2= ref({})
let latitude = ref('')
let longitude = ref('')
// var userinfo = ref()
var title= ref('');


import Editor from '@tinymce/tinymce-vue'
let content = ref('')
let content_id = ref('')
let listdata2 = ref([])
// 提交保存
const onSubmit = (values) => {
  // onSubmit(values) {
 
 
  const values2 = { //这里真实的
    "title": title.value,
   
    "content": content.value,
    
  }
  console.log("values2",values2)
  // id.value = route.query.id;
  console.log('id',id.value )
  https.put('/api/news/update/'+id.value+'/',values2).then(response => {
    console.log('asdfas555111');
    console.log(response);
    showDialog({
          // title: ,
          message: '修改成功',
        });
    // router.push( '/activitys_liebiao_geren');
    router.push('/news_list')

  }).catch(error => {
    console.log('出错了2');
    console.error(error);
    
  });
}



onMounted(() => {

// const user_id = localStorage.getItem("user_id");
localStorage.setItem("appname", 'news')

id.value = route.params.id;
// id.value = route.query.id;

  https.get(('/api/news/detail/'+id.value+'/')).then(response => {
  // https.get(('/api/hotel/hotel/2/')).then(response => {
    console.log('asdfas555111');
    console.log(response);
    retdata2.value = response;
    title.value = retdata2.value.title
    
    content.value = retdata2.value.content
   

    
    // console.log('asdf2122',content.value)

  }).catch(error => {
    console.log('出错了2');
    console.error(error);
    showToast('请重新登录');
  });

});



</script>