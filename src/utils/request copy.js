import axios from 'axios'
import store from '@/store'
import router from '@/router'
import config from '@/global.config.js'
import { contactEditProps } from 'vant'
import {Toast} from 'vant'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("api_base_url",API_BASE_URL)               

// 创建axios的对象
var backurl = ''
const frontend = window.location.hostname   //获取前端的地址
// 这里是根据前端的地址，设置后端的地址 
if (!isNaN(frontend[0])){
  // console.log('前端是数字，则用第一个backendserver1')
  backurl = config.backendserver1;
}else{
  backurl = config.backendserver2;
}
backurl = API_BASE_URL
console.log('houduan',backurl)
const instance = axios.create({
    // baseURL: config.backendserver,  //配置固定域名
    // baseURL: backurl,  //配置固定域名
    baseURL: API_BASE_URL,  
    timeout: 9000
})

// 一定要用新的axios对象来处理新的token，否则会反复调用instance会陷入一个循环，因为instance定义了截断器
// 而这个单独的request_token,没有定义截断器，就不会发生循环调用
const request_token = axios.create({
  // baseURL: config.backendserver,  //配置固定域名
  baseURL: API_BASE_URL,  //配置固定域名
  timeout: 6000
})
// console.log('asdfasdf1112223',config.backendserver)

// 刷新token的函数，通过instance来刷新
const refreshToken = () =>{

  return request_token({
    method:"POST",
    url:"/api/user/token/refresh/",
    // params:{
    //   refresh:localStorage.getItem("refresh")
    // },
    data:{
      refresh:localStorage.getItem("refresh")
    }
  })
}




let needsReset = false;

// 请求拦截
// 所有的网络请求都会走这个方法,可以在请求添加自定义内容

instance.interceptors.request.use( config => {
    // 拦截业务逻辑
    // 进行请求配置的修改
    // 如果本地有token就在头部携带
   

    if (localStorage.getItem('token')) {
     
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    console.log('请求头信息config',config)
    return config;
}, err => {
    return Promise.reject(err)
})
 
// 响应拦截
// 此处可以根据服务器返回的状态码做相应的数据
// res=>res.data 中res是函数参数，res.data是取出其中的有用数据
instance.interceptors.response.use((res) => {

  // 成功了返回数据
  return res.data
   
}, async (err) => {
    // 401 状态码，进入该函数
    console.log('没有登录');
    console.log('err内容', err.response);
    console.log('没有登陆或是密码错误信息', err);
    if (err.response.status == 400){ 
      console.log('账户和密码错误')      
      return Promise.reject(err)
      // return "用户名或密码错误"
    }
    let refresh_flag = 1
    if (err.response.status == 401){ 
        // 401 是token无效，进入该函数
        console.log('token过期');

         // 处理401未授权错误
        const currentTime = Date.now();
        const lastErrorTime = localStorage.getItem('lastAuth401Time');

        // 如果是第一次401错误，或者距离上次401错误已超过1分钟


        try{
          const ret = await refreshToken()  //这段代码用fresh token获取token，如果成功则返回access token，错误则在catch里处理
          if (ret.data.access) {
            // 如果能够获取新的token，那么重新保存token
            console.log('已经获取了新的token')
            localStorage.setItem("token",ret.data.access)
            console.log('保存了token再浏览器');
          
            return instance(err.config) // 重新请求之前需要请求的接口，这段代码打开原来没有需要打开的页面
           
          }

        } catch(erro){
          console.log('到这里表明，refresh不能用了，需要进入登录页面')
          // refresh 不能用就转到login页面重新获取新的fresh token 以及token
          const fullPath = encodeURIComponent (router.currentRoute.value.fullPath) //防止有特殊出错字符需要转义
          router.push('/user_login?redirecturl='+fullPath)
        
          // router.push('/user_login?')
          return Promise.reject(err)
        }
        console.log('获取刷新token返回的值',ret)
            
        console.log('ret.data.access', ret.data.access)
        
        if (ret.data.access) {
          // 重新保存token
          console.log('已经获取了新的token')
          localStorage.setItem("token",ret.data.access)
          console.log('保存了token再浏览器');
          // return false
          return instance(err.config) // 重新请求之前需要请求的接口
          // router.go(0)  //需要刷新
          // 重新请求之前的接口，并且把结果返回
        }else{ //获取不到新的token那么重新登录
          console.log('到这里表明，refresh不能用了，需要进入登录页面')
          const fullPath = encodeURIComponent (router.currentRoute.value.fullPath) //防止有特殊出错字符需要转义
          router.push('/user_login?redirecturl='+fullPath)
          // router.go(0)
          // router.push('/user_login?')
          return Promise.reject(err)
        }




        
    }
    return Promise.reject(err)
})

// 请求工具函数
var http = {
    
  get(url='',params={}){
    
    return  instance({
        url,
        data:params,
        headers:{'Content-Type': 'application/json;charset=UTF-8'},
        method: 'GET'
      });
      
    },
 


  post(url='',params={}){
    return  instance({
        url,
        data:params,
        headers:{'Content-Type': 'application/json;charset=UTF-8'},
        method: 'POST'
      });
  },

  
  post2(url='',params={},{}){
    return  instance({
        url,
        data:params,
        // headers:{'Content-Type': 'application/json;charset=UTF-8'},
        method: 'POST'
      });
  },
  post3(url='',params={}){
    return  instance({
        url,
        data:params,
        headers:{"Content-Type": "multipart/form-data"},
        method: 'POST'
      });
  },

  put3(url='',params={}){
    return  instance({
        url,
        data:params,       
        headers:{ 'Content-Type': 'multipart/form-data',},
        
        method: 'PUT'
      });
  },



  put(url='',params={}){
    return  instance({
        url,
        data:params,
        headers:{'Content-Type': 'application/json;charset=UTF-8'},
        method: 'PUT',
      });
    // return  instance.put(url,params);

  },

// 文件上传修改
put2(url='',params={},{}){
  return  instance({
      url,
      data:params,
      // headers:{'Content-Type': 'application/json;charset=UTF-8'},
      // headers: { 'Content-Type': 'multipart/form-data' },
      method: 'PUT',
    });
  // return  instance.put(url,params);

},




  delete(url='',params={}){
    return  instance({
        url,
        data:params,
        headers:{'Content-Type': 'application/json;charset=UTF-8'},
        method: 'DELETE',
      });
    // return  instance.put(url,params);
  },

}

export default http




