
<template>
  <van-nav-bar title="用户信息修改" left-text="返回" @click=" router.go(-1);" left-arrow>
<template #right>
  <van-icon name="search" size="18" />
</template>
</van-nav-bar>

<van-form @submit="onSubmit" style="margin-bottom:65px; margin-top:30px;">
      <!-- 在双括号里的router不要this，而在click里的参数则需要this变量 -->
      
      <!-- {{ id }} --><!-- 这个id来源于data里的this.$route.query.id,从url里获取 -->
      

      <van-field v-model="email" name="email" label="电子邮件" placeholder="请输入用户电子邮件地址"
          :rules="[{ required: true, message: '请输入用户电子邮件地址' }]" />
          
      <van-field v-model="user_name" name="user_name" label="用户名" placeholder="请输入用户名"
      :rules="[{ required: true, message: '请输入用户名' }]" />

      <van-field name="male" label="单选框">
        <template #input>
          <van-radio-group v-model="male" direction="horizontal">
          <van-radio name="1">男</van-radio>
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
            :value="password"
          >
          <template #button>
              <span @click="isShow">
                <van-icon name="closed-eye" v-if="showeye" />
                <van-icon name="eye-o" v-else />
              </span>
          </template>
        </van-field>


      <div style="margin: 16px; ">
          <van-button round block type="info" native-type="submit">提交修改</van-button>
      </div>
  </van-form>
  
</template>
<script setup>
import axios from 'axios';
import config from '@/global.config.js'
import md5 from 'js-md5'
import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';
import userFunc from '@/utils/userfunc.js'
import { onMounted,ref } from 'vue';



  
  const email = ref('');
  const password = ref();
  const  error = ref('');
  const male = ref('');
  const user_name= ref('');
  // password3:'',
  const showeye = ref(true);
  const showornot = ref("password");
  const id = ref('');
  id.value = localStorage.getItem('id');

  onMounted(() => {
      console.log('1.从后台获取用户注册信息');
      const params = {
          "userId" : id.value,
           
        }
        console.log('params',params);
        https.get('/api/v1/user/', params).then(response=>{
          console.log('已经修改成功了');
          console.log('response',response);
         }).catch(error => {
        // 请求失败时处理错误
        console.error('请求失败:', error);
        });
  });




    //   // {
    //   //   "id": "f976bcc9-6f0c-4192-a535-57feb73105c6",
    //   //   "user_id": "Yd5Psngf9",
    //   //   "user_name": "theUser",
    //   //   "user_role": "string",
    //   //   "user_status": 0,
    //   //   "male": true,
    //   //   "email": "john@email.com",
    //   //   "password_hash": "DEEDBEEF"
    //   // }

    // // localStorage.setItem("id",id);
    // // localStorage.setItem("refresh",refresh);
    // // localStorage.setItem("email",email);
    // // localStorage.setItem("token",token);
    // // localStorage.setItem("male",male);
    // // localStorage.setItem("user_id",user_id);
    // // localStorage.setItem("user_role",user_role);
    // // localStorage.setItem("user_status",user_status);
    // // localStorage.setItem("user_name",user_name);

    //   console.log(this.$store.state.user.profile)
    //   id.value = localStorage.getItem("id") ;
    //   email.value = this.$store.state.user.profile.email
    //   user_name.value = this.$store.state.user.profile.user_name
    //   console.log('mail',this.$store.state.user.profile.male)
    //   // console.log('mail',this.$store.state.user.profile.password) 
    //   if (this.$store.state.user.profile.male == true) {
    //     this.male = '1';
    //   } 
    //   else{
    //     this.male = '2';
    //   }

    // });
    // const onSubmit = ((values)  => { 
  
    //     console.log('submit2', values);
    //     if (this.male == '1'){
    //       this.xingbie = true
    //     }
    //     else{
    //       this.xingbie = false
    //     }

    //     // {
    //     //   "uID": 0,
    //     //   "userID": "Yd5Psngf9",
    //     //   "username": "string",
    //     //   "male": true,
    //     //   "email": "string",
    //     //   "passwordHash": "string"
    //     // }
    //     // 

    //     this.params = {
    //       "password" : md5(this.password),
    //       "user_name" : this.user_name,
    //       "male" : this.xingbie,
    //       "user_name" : this.user_name,
          
    //     }
    //     console.log('params',this.params);
    //     https.put('/api/v1/user/'+this.id, this.params).then(response=>{
    //       console.log('已经修改成功了')
    //       const {email,male,user_id,user_name,user_role,user_status} = response.user
    //       const token = response.tokens.access
    //       const token_refresh = response.tokens.refresh
    //       userFunc.saveloc
    //       window.sessionStorage.setItem("id",response.tokens.id);
    //       window.sessionStorage.setItem("token",response.tokens.access);
    //       window.sessionStorage.setItem("refresh",response.tokens.refresh);
    //       window.sessionStorage.setItem("email",email);
    //       window.sessionStorage.setItem("male",male);
    //       window.sessionStorage.setItem("user_id",user_id);
    //       window.sessionStorage.setItem("user_role",user_role);
    //       window.sessionStorage.setItem("user_status",user_status);
    //       window.sessionStorage.setItem("user_name",user_name);
    //       this.$store.commit('user/setUser',{email,male,user_id,user_name,user_role,user_status,token})
    //      // this.$router.push({ path: '/act_list' })
    //       console.log('state在login.vue',this.$store.state.user.profile)
    //       console.log('state-token在login.vue',this.$store.state.user.profile.token)
    //      }).catch(error => {
    //     // 请求失败时处理错误
    //     console.error('请求失败:', error);
    //     });
    //   });


</script>

<style scoped>

</style>