
<template>
    <van-nav-bar title="用户注册" left-text="返回" @click=" this.$router.go(-1);" left-arrow>
  <template #right>
    <van-icon name="search" size="18" />
  </template>
</van-nav-bar>

<van-form @submit="onSubmit" style="margin-bottom:65px; margin-top:30px;">
        <!-- 在双括号里的router不要this，而在click里的参数则需要this变量 -->
        
        <!-- {{ id }} --><!-- 这个id来源于data里的this.$route.query.id,从url里获取 -->
        

        <van-field v-model="email" name="email" label="电子邮件" placeholder="请输入用户电子邮件地址"
            :rules="[{ required: true, message: '请输入用户电子邮件地址' }]" />
            
        <van-field v-model="user_name" name="user_name" label="用户昵称" placeholder="请输入用户用户昵称"
        :rules="[{ required: true, message: '请输入用户用户昵称' }]" />

        <van-field v-model="mobile" name="mobile" label="电话" placeholder="请输入用户电话"
            :rules="[{ required: true, message: '请输入用户电话' }]" />

        <van-field name="male" label="单选框">
          <template #input>
            <van-radio-group v-model="male" direction="horizontal">
            <van-radio  name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field style="display:none ;" v-model="user_role" name="user_role" value="user"  />
        
        
        
        <!-- 活动位置 -->
        <!-- <van-field v-model="user_password" type="tex" name="user_password" label="用户密码" placeholder="请填写用户密码"
            :rules="[{ required: true, message: '请填写用户密码' }]" /> -->

        <!-- <van-field v-model="user_password2" @blur="mimabijiao" type="password" name="user_password2" label="确认密码" placeholder="请填写确认密码"
            :rules="[{ required: true, message: '请填写确认密码' }]" /> -->
        
            <van-field
              v-model="password"
              :type="showornot"
              name="password"
              label="密码"
              placeholder="请输入密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            >
            <template #button>
                <span @click="isShow">
                  <van-icon name="closed-eye" v-if="showeye" />
                  <van-icon name="eye-o" v-else />
                </span>
            </template>
          </van-field>


        <div style="margin: 16px; ">
            <van-button round block type="info" native-type="submit">注册</van-button>
        </div>
    </van-form>
    <div style="text-align: center; margin-top: -20px;"> 已有账户，<a @click.prevent="this.$router.push({ path: '/user_login' })" >请登录</a></div>
  </template>

<script>
  // import axios from 'axios';
  // import config from '@/global.config.js'
  // import md5 from 'js-md5'
  // xuexi 
  // import apiFun from '@/utils/api.js'
  import https from '@/utils/request.js';
  import { useStore } from 'vuex'
  import { showToast } from 'vant';
  import  userFunc from '@/utils/userfunc.js'  
  import { useRouter,useRoute } from 'vue-router'
//  import { KeepAlive } from 'vue';
 const router = useRouter()
 const route = useRoute()

  export default {
    data () {
      return {
        email: '',
        password: '',
        user_role:'user',
        mobile: '',
        // password3:'',
        showeye:true,
        user_name:'',
        male:1,
        xingbie:true,
        showornot : "password",
      }
    },

    rules: {
        
      user_password2: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          // 自定义规则，用于比较密码和确认密码
          {
            validator: (rule, value, callback) => {
              if (value !== this.user_password) {
                console.log('不一致密码')
                callback(new Error('密码和确认密码不一致'));
              } else {
                callback();
              }
            },
            trigger: 'blur',
          },
        ],
      },
  
    methods: {
    
      isShow() {//点击切换眼睛
        this.showeye = !this.showeye;
        if (this.showeye === true) {
          this.showornot = "password";
        } else {
          this.showornot = "text";
        }
      },
      
      onSubmit(values) {
        console.log('submit2', values);
        if (this.male == '1'){
          this.xingbie = true
        }
        else{
          this.xingbie = false
        }
        // console.log('asdf11111');
        var randomdata = userFunc.generateRandomCode() ;
        console.log('dafd',randomdata);
        var nickname = this.user_name
        this.user_name = this.user_name+'_'+randomdata;
        console.log('username_2',this.user_name);
        
        values = {
          "email": this.email,
          "password": this.password,
          // "password": md5(this.password),
          "mobile":this.mobile,
          "gender":this.xingbie,
          "username":this.user_name,
          "last_name":nickname,
        }
        // values = JSON.stringify(values)
        console.log('value2',values);
        
        https.post(('/api/user/register/'),values).then(response => {
          console.log('asdfas555111');
          console.log(response);
          // listdata2.value.splice(index, 1);
        
          router.push( '/user_login');

        }).catch(error => {
          console.log('出错了2');
          console.error(error);
         
        });
    

     
 
    },
  },
  mounted(){

  },

  }
  
</script>