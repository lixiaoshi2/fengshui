<template>
  <van-nav-bar title="修改美食" left-text="返回" @click=" router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>



  <van-form @submit="onSubmit" style="margin-bottom:65px; margin-top:30px;">
    <!-- 在双括号里的router不要this，而在click里的参数则需要this变量 -->

    <!-- {{ id }} --><!-- 这个id来源于data里的this.$route.query.id,从url里获取 -->


    <van-field v-model="title" name="title" label="标题" placeholder="请输入美食标题" :value="title"
      :rules="[{ required: true, message: '请输入美食标题' }]" />

    <van-field v-model="owner" name="owner" label="联系人" placeholder="请输入联系人" :value="owner"
      :rules="[{ required: true, message: '请输入联系人' }]" />

    <van-field v-model="phone" name="phone" label="电话" placeholder="请输入联系电话" :value="phone"
      :rules="[{ required: true, message: '请输入联系电话' }]" />

    <van-field v-model="phone2" name="phone2" label="备用电话" placeholder="请输入备用电话电话" :value="phone2"
      :rules="[{ required: false, message: '请输入备用电话电话' }]" />

    <van-field v-model="email" name="email" label="电子邮件" placeholder="请输入备用电话电话" :value="email"
      :rules="[{ required: false, message: '请输入备用电话电话' }]" />

    <van-field v-model="weixin" name="weixin" label="微信" placeholder="请输入微信" :value="weixin"
      :rules="[{ required: false, message: '请输入微信' }]" />

    <van-field v-model="addr" name="addr" label="详细地址" placeholder="请输入街道号和所在区" :value="addr"
      :rules="[{ required: true, message: '请输入街道号' }]" />

    <div style="padding-left:20px; background-color: white; font-size: small ; color: rgb(143, 137, 137);">
      请与google地图对比，正确不用修改，否则用google地图的经纬度 </div>

    <van-field v-model="latitude" name="latitude" label="经度" placeholder="请与google地图对比，如果不对输入google的经度" :value="addr" />

    <van-field v-model="longitude" name="longitude" label="纬度" placeholder="请与google地图对比，如果不对输入google的纬度"
      :value="addr" />

    <!-- <weizhi v-model:fieldValue="weizhizhi" ref="weizhiref" ></weizhi> -->

    <van-field name="title" label="详情" readonly="true" />
    <van-field name="detail">
      <template #input>

        <textEditor :modelValue="content" :modelValue2="content_id" v-model='content'></textEditor>

      </template>
    </van-field>



    <div style="margin: 16px; ">
      <van-button round block type="primary" native-type="submit">保存修改</van-button>
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
import { ref, onMounted, computed, reactive } from 'vue';
import textEditor from "@/components/textEditor.vue"
import weizhi from '@/components/weizhi.vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const id = ref('')
const retdata2 = ref({})
let latitude = ref('')
let longitude = ref('')
// var userinfo = ref()
var title = ref('');
var owner = ref('');
var phone = ref('');
var phone2 = ref('');
var email = ref('');
var weixin = ref('');
var addr = ref('');
var weizhizhi = ref('');
var detail = ref('');
var city = ref('')
var state = ref('')
import Editor from '@tinymce/tinymce-vue'
let content = ref('')
let content_id = ref('')
let listdata2 = ref([])
const processedContent = ref('');  //处理后的内容
// 提交保存
const onSubmit = (values) => {
  // onSubmit(values) {
  console.log('submit2', values);
  console.log('weizhi', weizhizhi.value)
  var weizhi = weizhizhi.value;
  //  console.log('44',weizhi);
  var index = weizhi.indexOf('/', 0);
  // console.log(index);
  var state = weizhi.substring(0, index);
  console.log(state);
  var city = weizhi.substring(index + 1, weizhi.length);
  console.log('city', city);
    const values2 = { //这里真实的
      "title": title.value,
      "owner": owner.value,
      "phone": phone.value,
      "phone2": phone2.value,
      "email": email.value,
      "weixin": weixin.value,
      "addr": addr.value,
      "city": city,
      "state": state,
      "content": content.value,
      "longitude": longitude.value,
      "latitude": latitude.value
    }
    console.log("values2", values2)
    id.value = route.params.id;
    console.log('id', id.value)
  https.put('/api/myfood/update/' + id.value + '/', values2).then(response => {
    console.log('asdfas555111');
    console.log(response);
    console.log('message',response.message)
    if (response.message) {
      showDialog({
        // title: ,
        message: '您不是驿站的主人，不能修改',
      });
    } else {
      showDialog({
        // title: ,
        message: '修改成功',
      });
      router.push('/my_post')
    }

  // router.push( '/activitys_liebiao_geren');


    }).catch(error => {
      console.log('出错了2');
      console.error(error);

    });
  
}

// 重写地址
const rewriteImageUrl = (src) => {
      const isLocal = src.startsWith('http://192.168.1.127:8000');
      const baseUrl = isLocal
        ? 'https://www.nearnet.ca/api'
        : 'https://www.nearnet.ca/api';
      return src.replace('http://192.168.1.127:8000', baseUrl);
  };

// 处理文章内容，获取content，找到图片，调用图片处理程序
const processImages = (content) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    // console.log('传入的内容',content)
    
    // 查找所有图片并替换链接
    const images = tempDiv.querySelectorAll('img');
    // console.log('img',images)
    images.forEach((img) => {
      const src = img.getAttribute('src');
      // console.log('src1',src)
      if (src) {
        var newSrc = rewriteImageUrl(src);
        // console.log('111222',newSrc)
        img.setAttribute('src', newSrc);
      }
    });

    // 更新内容
    processedContent.value = tempDiv.innerHTML;
    return processedContent.value
  };


onMounted(() => {

  // const user_id = localStorage.getItem("user_id");
  localStorage.setItem("appname", 'myfood')

  id.value = route.params.id;

  https.get(('/api/myfood/detail/' + id.value + '/')).then(response => {
    // https.get(('/api/hotel/hotel/2/')).then(response => {
    console.log('asdfas555111');
    console.log(response);
    retdata2.value = response;
    title.value = retdata2.value.title
    owner.value = retdata2.value.owner
    phone.value = retdata2.value.phone
    phone2.value = retdata2.value.phone2
    email.value = retdata2.value.email
    console.log('asdfas555111');
    weixin.value = retdata2.value.weixin
    addr.value = retdata2.value.addr
    state.value = retdata2.value.state
    city.value = retdata2.value.city
    console.log('asdfas555112');
    content.value = retdata2.value.content

    const currentUrl2 = window.location.href;
    const isHttps = currentUrl2.startsWith('https://www.nearnet.ca');
    console.log('asdf33',isHttps)
    if (isHttps){
      const newcontent = processImages(content.value);
      // console.log('newconten', newcontent)
      content.value = newcontent;
    }

    weizhizhi.value = state.value + '/' + city.value

    latitude.value = retdata2.value.latitude
    if (!isNaN(parseFloat(latitude.value))) { // 判断值是否为有效的数字类型
      latitude.value = parseFloat(latitude.value).toFixed(6); // 将数字转换成字符串并保留两位小数
    }
    longitude.value = retdata2.value.longitude
    if (!isNaN(parseFloat(longitude.value))) { // 判断值是否为有效的数字类型
      longitude.value = parseFloat(longitude.value).toFixed(6); // 将数字转换成字符串并保留两位小数
    }
    // console.log('asdf2122',content.value)

  }).catch(error => {
    console.log('出错了2');
    console.error(error);
    showToast('请重新登录');
  });

});



</script>