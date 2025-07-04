import axios from 'axios'
import store from '@/store'
import router from '@/router'
import config from '@/global.config.js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("api_base_url",API_BASE_URL)               

// console.log('asdfasdf111')
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
    const status = err.response?.status;

    if (status === 400) {
      console.warn("400错误：用户名或密码错误");
      return Promise.reject(err);
    }

    if (status === 401) {
      console.warn("401错误：token过期或未登录");

      const currentTime = Date.now();
      const lastErrorTime = localStorage.getItem("lastAuth401Time");

      if (lastErrorTime) {
        const last = parseInt(lastErrorTime);
        const diffSeconds = (currentTime - last) / 1000;

        if (diffSeconds > 10 && diffSeconds < 60) {
          console.warn("短时间内多次401，直接跳转登录");

          // 清理状态并跳转登录
          localStorage.removeItem("token");
          localStorage.removeItem("refresh");
          localStorage.removeItem("lastAuth401Time");

          const fullPath = encodeURIComponent(router.currentRoute.value.fullPath);
          router.push(`/user_login?redirecturl=${fullPath}`);

          return Promise.reject(err);
        }
      }

      // 设置新的错误时间戳（无论是否存在）
      localStorage.setItem("lastAuth401Time", currentTime.toString());

      try {
        const ret = await refreshToken();

        // 统一判断返回值
        const newAccess = ret?.access || ret?.data?.access;
        if (newAccess) {
          console.info("刷新token成功");

          localStorage.setItem("token", newAccess);
          // 清除401时间戳（说明刷新成功）
          localStorage.removeItem("lastAuth401Time");

          // 替换旧的 token 重新请求
          err.config.headers.Authorization = `Bearer ${newAccess}`;
          return instance(err.config);
        } else {
          throw new Error("没有返回有效 access");
        }
      } catch (error) {
        console.warn("刷新失败，跳转登录");

        // 清除状态并跳转
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        localStorage.removeItem("lastAuth401Time");

        const fullPath = encodeURIComponent(router.currentRoute.value.fullPath);
        router.push(`/user_login?redirecturl=${fullPath}`);

        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  }
);

// 请求工具函数
var http = {
    
  get(url='',params={}){
    
    return  instance({
        url,
        params,
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




