// 这段代码引入配置文件的内容
import config from './global.config.js'
import axios from 'axios'

const request = axios.create({
    // baseURL:"http://localhost:8000",
    baseURL:config.backendserver + "8000",
    timeout:30*1000,
    responseType:"json",
    headers:{

    }
})

request.interceptors.request.use((config)=>{
// 这里是拦截request，可以填入token

})

request.interceptors.response.use(()=>{
    // 响应拦截器

})