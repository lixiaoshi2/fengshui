
<template>
  <div>

  <van-nav-bar title="用户登录" left-text="返回" @click=" this.$router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <van-form @submit="onSubmit">
    <van-field v-model="email" name="email" label="email" placeholder="请输入电子邮件登录"
      :rules="[{ required: true, message: '请填写用户名email' }]" />
    <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]" />
    <div style="margin: 16px;">
      <div style="display: flex; color: red; justify-content: center; "> {{ errorinfo }}</div>
      <van-button round block type="info" native-type="submit">提交</van-button>
    </div>
    
    <div v-if="errorflag === 1" style="margin: 15px; color:red;">
      
  </div>
  <!-- <div v-else-if="type === 'B'">
    B
  </div>
  <div v-else-if="type === 'C'">
    C
  </div> -->

   
  </van-form>

   <div style="text-align: center;">  没有账户 <router-link to="/user_register">跳转到注册页面</router-link>     </div>
   
   <div style="text-align: center;margin-top: 20px;">  忘记密码 <router-link to="/user_password_forget_email">至找回密码页面</router-link>     </div>
</div>

 
  <!-- <img :src="imgurl" /> -->
  <!-- <img src="src/assets/icon/" + imgurl2 /> -->
  <!-- <img :src="@/assets/icon/huodong.jpg" /> -->
</template>

<script>
import axios from 'axios';
import config from '@/global.config.js'
import md5 from 'js-md5'
import https from '@/utils/request.js';
import { showToast } from 'vant';
import userFunc from '@/utils/userfunc.js'
import router from '@/router'

export default {
    data () {
      return {
        id:'',
        email: '',
        password: '',
        error: '',
        token:'',
        errorinfo:'',
        errorflag:0,
        params:{}
      }
    },
    mounted(){
      // console.log('state在login.vue',this.$store.state.user.profile)
      // console.log(store.state.username)
      console.log('执行了login,已经进入了login页面')
    },
    methods: {
      onSubmit(values) {
        console.log('submit2', values);
        
        this.params = {
          "username" : this.email,
          "password" : this.password
          // "password" : md5(this.password)
        }
        console.log('post提交的用户登录数据',this.params);
        
        https.post(('/api/user/login/'),this.params).then(response =>{
          console.log('运行到已经成功获取登录后的信息')

          // const {email,gender,user_id,username} = response
          const token = response.data.access
          const token_refresh = response.data.refresh;
          console.log('response22',response)  //email,gender,user_id,username,token,refresh
          userFunc.saveLocalstorage(response.email,response.gender,response.user_id,response.username,token,token_refresh);
          
          const redirectPath = this.$route['query'].redirecturl;
          if (redirectPath) {
            // console.log('dizhi:',redirectPath);

            // await requestFCMToken(data.user_id);  // 用户登录后获取 FCM Token
            
            router.push(redirectPath);
            localStorage.removeItem('redirectPath');
          } else {
            console.log('mimayonghu')
            // 如果没有之前的路由路径，跳转到默认页面
            this.$router.push('/');
          }

          // this.$router.push({ path: '/user_info' });
          
         }).catch(error => {
        
        console.log(error)
        if (error.response.data.error==undefined){
          console.log('错误信息22')
          this.errorinfo = '账户名或是密码错误'
        }
        console.log('登录错误处理')
        console.log(error.response.data.error)
        this.errorinfo = error.response.data.error[0]
        // this.errorinfo = error.response.data.msg;
        this.errorflag = 1
        });
      },
      beforeRouteEnter(to, from, next) {
        console.log('Entering UserLogin route');
        next();
      }

  }
}

</script>

<style scoped>

</style>