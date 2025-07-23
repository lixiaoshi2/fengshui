import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import act_list from '../views/act_list.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect:'/home' 
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home/home.vue')
    },
    // 联系我们
    {  
      path: '/contactus',
      name: 'contactus',
      component: () => import('../views/home/contactus.vue')
    },

    
  
// ######################用户登录注册等#################
{
  // 用户登录
  path: '/user_login',
  name: 'user_login',
  component: () => import('@/views/my/user_login.vue')
},
{
  // 退出登录
  path: '/user_logout',
  name: 'user_user_logout',
  component: () => import('@/views/my/user_logout.vue')
},
{
  // 退出登录
  path: '/user_changepasswd',
  name: 'user_changePasswd',
  component: () => import('@/views/my/user_changePasswd.vue')
},
{
  // 更改密码
  path: '/user_changeEmail',
  name: 'user_changeEmail',
  component: () => import('@/views/my/user_changeEmail.vue')
},
{
  // 更改手机号码
  path: '/user_changePhone',
  name: 'user_changePhone',
  component: () => import('@/views/my/user_changePhone.vue')
},
{
  // 忘记密码，从电子邮件获取临时的token，输入新密码，提交给服务器
  path: '/user_password_forget',
  name: 'user_password_forget',
  component: () => import('../views/my/user_password_forget.vue')
},
{
  // 忘记密码，打开一个新页面，允许客户提交一个电子邮件找回密码
  path: '/user_password_forget_email',
  name: 'user_password_forget_email',
  component: () => import('../views/my/user_password_forget_email.vue')
},

{
  
  path: '/user_register',
  name: 'user_register',
  component: () => import('../views/my/user_register.vue')
},
{
  // 这个是新的更改用户信息
  path: '/user_detail',
  name: 'user_detail',
  component: () => import('../views/my/user_detail.vue')
},

{
  // 只显示用户信息
  path: '/user_detail2',
  name: 'user_detail2',
  component: () => import('../views/my/user_detail2.vue')
},



   

    {  // 邀请码推荐吗
      path: '/invite',
      name: 'invite',
      component: () => import('../views/my/invite.vue')
    },

    {  // 发布页面
      path: '/my_fabu',
      name: 'my_fabu',
      component: () => import('../views/my/my_fabu.vue')
    },
    {  // 发布页面
      path: '/menu_setup',
      name: 'menu_setup',
      component: () => import('../views/fengshuiapp/menu_setup.vue')
    },

    {  // 发布页面2管理员
      path: '/my_fabu101',
      name: 'my_fabu101',
      component: () => import('../views/my/my_fabu101.vue')
    },


// ///////////////////////////////////////// 风水新系统的内容

 {  // 白事
      path: '/bai',
      name: 'bai',
      component: () => import('../views/fengshuiapp/bai.vue')
    },

{
  path: '/bai/zhiqian',
  component: () => import('@/views/fengshuiapp/bai/zhiqian.vue')
},
{
  path: '/bai/zhiqian2',
  component: () => import('@/views/fengshuiapp/bai/zhiqian2.vue')
},
// {
//   path: '/bai/shouyi',
//   component: () => import('@/views/product/Shouyi.vue')
// },
// {
//   path: '/bai/zhuchi',
//   component: () => import('@/views/product/Zhuchi.vue')
// },
// {
//   path: '/bai/lingtang',
//   component: () => import('@/views/product/Lingtang.vue')
// }







    {  // 红喜事
      path: '/hong',
      name: 'hong',
      component: () => import('../views/fengshuiapp/hong.vue')
    },

    {  // 命理
      path: '/mingli',
      name: 'mingli',
      component: () => import('../views/fengshuiapp/mingli.vue')
    },
    {  // 命理介绍
      path: '/mingli_jieshao',
      name: 'mingli_jieshao',
      component: () => import('../views/fengshuiapp/mingli_jieshao.vue')
    },
    
    {  // 命理业务介绍
      path: '/mingli_yewu',
      name: 'mingli_yewu',
      component: () => import('../views/fengshuiapp/mingli_yewu.vue')
    },

    {  // 喜事婚事
      path: '/xishi',
      name: 'xishi',
      component: () => import('../views/fengshuiapp/xishi.vue')
    },

    { //购物车
      path: '/mycart',
      name: 'mycart',
      component: () => import('@/views/fengshuiapp/mycart.vue')
    },
    { //订单列表
      path: '/orders',
      name: 'orders',
      component: () => import('@/views/fengshuiapp/orders.vue')
    },
    { //订单列表
      path: '/ordersadmin',
      name: 'ordersadmin',
      component: () => import('@/views/fengshuiapp/ordersadmin.vue')
    },
    { //订单详情处理快递等发货结束等操作
      path: '/orderadmin_detail/:id',
      name: 'orderadmin_detail',
      component: () => import('@/views/fengshuiapp/orderadmin_detail.vue')
    },

      { //支付页面
      path: '/pay/:order_id',
      name: 'pay',
      component: () => import('@/views/fengshuiapp/pay.vue')
    },

    { //地址页面
      path: '/useraddr',
      name: 'useraddr',
      component: () => import('@/views/fengshuiapp/useraddr.vue')
    },

    { //测试页面
      path: '/ceshi',
      name: 'ceshi',
      component: () => import('@/views/fengshuiapp/ceshi.vue')
    },




    //////////////商品类

    {
      path: '/addproduct/',
      name: 'addproduct',
      component: () => import('@/views/fengshuiapp/addproduct.vue')
    },


    { // 商品详情页
      path: '/product/:id',
      name: 'product',
      component: () => import('@/views/fengshuiapp/ProductDetail.vue')
    },

    { // 起名
      path: '/qiming',
      name: 'qiming',
      component: () => import('@/views/fengshuiapp/qiming.vue')
    }












 
  ]
})





export default router
