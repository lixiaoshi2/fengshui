
<template>
  <div>

 退出登录
</div>

 
  
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
        params:{}
      }
    },
    mounted(){
      // console.log('state在login.vue',this.$store.state.user.profile)
      // console.log(store.state.username)
    },
    methods: {
      onSubmit(values) {
        console.log('submit2', values);
        
        this.params = {
          "username" : this.email,
          "password" : this.password
          // "password" : md5(this.password)
        }
        console.log('params',this.params);
        




        https.post(('/api/user/login/'),this.params).then(response =>{
          console.log('yunxingdaozhelile')
          // const {email,gender,user_id,username} = response
          const token = response.data.access
          const token_refresh = response.data.refresh;
          console.log('response22',response)  //email,gender,user_id,username,token,refresh
          userFunc.saveLocalstorage(response.email,response.gender,response.user_id,response.username,token,token_refresh);
          showToast('登录成功');
          // 登录成功后如果有需要跳转的路由，那么就直接跳转
          // const redirectPath = router.currentRoute.value.fullPath;
          // console.log('lujing',redirectPath);
          // redirectPath = this.$route['query'].redirectPath;
          console.log('redir2',this.$route['query'].redirecturl);
          const redirectPath = this.$route['query'].redirecturl;
          if (redirectPath) {
            // console.log('dizhi:',redirectPath);
            
            router.push(redirectPath);
            localStorage.removeItem('redirectPath');
          } else {
            // 如果没有之前的路由路径，跳转到默认页面
            this.$router.push('/');
          }

          // this.$router.push({ path: '/user_info' });
          
         }).catch(error => {
        // 请求失败时处理错误
        console.error('请求失败:', error);
        });
      },
  }
}

</script>

<style scoped>

</style>