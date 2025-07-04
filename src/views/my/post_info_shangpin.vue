
<template>
  <van-nav-bar title="邻家网-发布信息" left-text="返回" @click=" router.go(-1);" left-arrow>
<template #right>
  <van-icon name="search" size="18" />
</template>
</van-nav-bar>



<van-form @submit="onSubmit" style="margin-bottom:65px; margin-top:30px;">
    <!-- 在双括号里的router不要this，而在click里的参数则需要this变量 -->

    <!-- {{ id }} --><!-- 这个id来源于data里的this.$route.query.id,从url里获取 -->
  
    <!-- <van-sidebar v-model="active">
      <van-sidebar-item title="标签名称" />
      <van-sidebar-item title="标签名称" disabled />
      <van-sidebar-item title="标签名称" />
    </van-sidebar> -->

    <van-field v-model="category" @click="router.push('/category_select_fabu')" name="category" label="分类" placeholder="请选择分类" :value="category"
        :rules="[{ required: true, message: '请选择分类' }]" />

    <van-field v-model="title" name="title" label="标题" placeholder="请输入家庭旅馆标题" :value="title"
        :rules="[{ required: true, message: '请输入家庭旅馆标题' }]" />

    <van-field v-model="owner" name="owner" label="驿站联系人" placeholder="请输入联系人" @click="choose_yizhan"
    :rules="[{ required: true, message: '请输入联系人' }]" />

    <van-field v-model="phone" name="phone" label="驿站电话" placeholder="请输入联系电话" :value="phone"
    :rules="[{ required: true, message: '请输入联系电话' }]" />

    <van-field v-model="phone2" name="phone2" label="经营者电话" placeholder="请输入备用电话电话" :value="phone2"
    :rules="[{ required: false, message: '请输入备用电话电话' }]" />

    <van-field v-model="email" name="email" label="经营者电邮" placeholder="请输入备用电话电话" :value="email"
    :rules="[{ required: false, message: '请输入备用电话电话' }]" />

    <van-field v-model="weixin" name="weixin" label="经营者微信" placeholder="请输入微信" :value="weixin"
    :rules="[{ required: false, message: '请输入微信' }]" />

    <van-field v-model="addr" name="addr" label="取货地址" placeholder="街道号或路口(finch/victory park)" @click="get_pickaddr"
    :rules="[{ required: true, message: '请输入街道号' }]" />

    <van-field v-model="yizhan_userid" name="addr" label="经营者id" placeholder="经营者用户id" readonly />

    <weizhi v-model:fieldValue="weizhizhi" ref="weizhiref" ></weizhi>

    <van-field name="title" label="详情" readonly="true" />
    <van-field name="detail">
        <template #input>
          
          <textEditor :modelValue="content" :modelValue2="content_id" v-model='content' ></textEditor> 
          
        </template>
      </van-field>

    <div style="margin: 16px; width: 100%; display: flex; justify-content: center;  align-items: center;">
        <van-button round style="width: 30%; " type="success" native-type="submit">保存</van-button>
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
import { showToast,showDialog } from 'vant';
import { ref, onMounted, computed,reactive } from 'vue';
import textEditor  from "@/components/textEditor.vue"  
import weizhi from '@/components/weizhi.vue'
import { useRouter,useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
// var userinfo = ref()
const category = ref('')
const category_api_url = ref('')
var title= ref('');
var owner= ref('');
var phone= ref('');
var phone2= ref('');
var email= ref('');
var weixin= ref('');
var addr= ref('');
var weizhizhi= ref('');
var detail= ref('');
var yizhan_userid = ref('')
var yizhan_email = ref('')
import Editor from '@tinymce/tinymce-vue'
let content = ref('')
let content_id = ref('')

const onSubmit = (values) => {
  // onSubmit(values) {
  console.log('submit2', values);
  console.log('weizhi',weizhizhi.value)
  if (weizhizhi.value.length==0){
    console.log('没有地址不能提交数据')
    showDialog({
          // title: ,
          message: '请选择所在地区',
        });
  }
  else{
    var weizhi = weizhizhi.value;
    //  console.log('44',weizhi);
    var index = weizhi.indexOf('/', 0);
    // console.log(index);
    var state = weizhi.substring(0, index);
    console.log(state);
    var city = weizhi.substring(index + 1, weizhi.length);
    console.log('city',city);
    const values2 = { //这里真实的
      'category':category.value,
      "title": title.value,
      "owner": owner.value,
      "phone": phone.value,
      "phone2": phone2.value,
      "email": email.value,
      "weixin": weixin.value,
      "addr": addr.value,
      "city": city,
      "state": state,
      "content": content.value
    }
    console.log("values2",values2)
    console.log('category_api_url',category_api_url.value)
    

    https.post(category_api_url.value,values2).then(response => {
      console.log('asdfas555111');
      console.log(response);
      router.push('/my_post')
      // listdata2.value.splice(index, 1);
      // listdata2.valuesplice(id, 1);;
      // console.log('asdfdd',listdata2);
      // listdata2 = this.mainList.filter(item=>item.id != data.id);
      // showToast('添加成功');
      // this.reload;
      // listdata2.value = 
      // router.push( '/activitys_liebiao_geren');

    }).catch(error => {
      console.log('出错了2');
      console.error(error);
      
    });
  }

}

// 选择驿站
const choose_yizhan = () =>{
  const yizhan_name = localStorage.getItem("yizhan_name")
  if (title.value!=''){
    localStorage.setItem("yizhan_title",title.value)
  }
  
  if(yizhan_name!=null && yizhan_name!=''){
    console.log("有数据的")
    owner.value = yizhan_name
    title.value = localStorage.getItem("yizhan_title")
    phone.value = localStorage.getItem("yizhan_phone")
    phone2.value = localStorage.getItem("yizhan_phone2")
    email.value = localStorage.getItem("yizhan_email")
    weixin.value = localStorage.getItem("yizhan_weixin")
    addr.value = localStorage.getItem("yizhan_address")
    yizhan_userid.value = localStorage.getItem("yizhan_id")
    yizhan_email.value = localStorage.getItem("email")
    // city.value = localStorage.getItem("yizhan_city")
    // state.value = localStorage.getItem("yizhan_state")
    
     


    localStorage.setItem("yizhan_name",'')
  }
  else{
    console.log("进入选择驿站的程序")
    router.push("/address_yizhan")
  }
 
}

onMounted(() => {
  category.value = localStorage.getItem('category_name')
  category_api_url.value = localStorage.getItem('category_api_url')
})

// onMounted(() => {

// const user_id = localStorage.getItem("user_id");
// // console.log('userid', user_id)
//   https.get(('/api/user/user/'+user_id+'/')).then(response => {
//     console.log('asdfas555111');
//     console.log(response);
    
//     email.value = response.email;
//     username.value = response.username;
//     mobile.value = response.mobile;
//     last_name.value = response.last_name;
//     listdata2.value.splice(index, 1);
//     // listdata2.valuesplice(id, 1);;
//     // console.log('asdfdd',listdata2);
//     // listdata2 = this.mainList.filter(item=>item.id != data.id);
//     showToast('删除成功');
//     // this.reload;
//     // listdata2.value = 
//     // router.push( '/activitys_liebiao_geren');

//   }).catch(error => {
//     console.log('出错了2');
//     console.error(error);
//     showToast('请重新登录');
//   });
// }
// );



</script>