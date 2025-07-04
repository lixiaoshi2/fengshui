
import { createStore } from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'
import tempdata2 from './modules/tempdata2'  //state 有缓存容易不更新


// 创建一个新的 store 实例
export default createStore({
  modules:{
    cart,
    user,
    category,
    tempdata2
  },
  
  // state () {
  //   return{
  //     // 用户信息 ,登录的时候可以将数据库返回的这些用户信息存入localstore，同时导入store仓库里的state
    
      
  // }
  // },
  // getters:{

  // },
  // mutations: {
    
 
  // }
})
