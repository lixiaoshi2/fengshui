import { createRouter, createWebHistory } from 'vue-router'


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
  // 
  path: '/user_changepasswd',
  name: 'user_changePasswd',
  component: () => import('@/views/my/user_changePasswd.vue')
},
{
  // 修改用户名
  path: '/user_changename',
  name: 'user_changename',
  component: () => import('@/views/my/user_changename.vue')
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
 {  // 起名产品
      path: '/qimingproducts',
      name: 'qimingproducts',
      component: () => import('../views/fengshuiapp/qimingproducts.vue')
  },
 {  // 择日
      path: '/chooseday',
      name: 'chooseday',
      component: () => import('../views/fengshuiapp/chooseday.vue')
  },
 {  // 房屋风水
      path: '/fengshui_house',
      name: 'fengshui_house',
      component: () => import('../views/fengshuiapp/fengshui_house.vue')
    },
 {  // 房屋风水
      path: '/fengshui_products',
      name: 'fengshui_products',
      component: () => import('../views/fengshuiapp/fengshui_products.vue')
    },
 {  // 起名
      path: '/naming',
      name: 'naming',
      component: () => import('../views/fengshuiapp/naming.vue')
    },
 {  // 紫薇斗数
      path: '/ziwei',
      name: 'ziwei',
      component: () => import('../views/fengshuiapp/ziwei.vue')
    },
 {  // 紫薇斗数
      path: '/ziwei_products',
      name: 'ziwei_products',
      component: () => import('../views/fengshuiapp/ziwei_products.vue')
    },
 {  // 择日
      path: '/chooseday_products',
      name: 'chooseday_products',
      component: () => import('../views/fengshuiapp/chooseday_products.vue')
    },
 {  // 占卜问卦
      path: '/zhanbu',
      name: 'zhanbu',
      component: () => import('../views/fengshuiapp/zhanbu.vue')
    },
 {  // 占卜问卦老师
      path: '/zhanbu_products',
      name: 'zhanbu_products',
      component: () => import('../views/fengshuiapp/zhanbu_products.vue')
    },
 {  // 徽标设计
      path: '/huibiao_design',
      name: 'huibiao_design',
      component: () => import('../views/fengshuiapp/huibiao_design.vue')
    },
 {  // 定制符
      path: '/dingzhifu',
      name: 'dingzhifu',
      component: () => import('../views/fengshuiapp/dingzhifu.vue')
    },
 {  // 定制符
      path: '/dingzhifu_products',
      name: 'dingzhifu_products',
      component: () => import('../views/fengshuiapp/dingzhifu_products.vue')
    },
 {  // 八字
      path: '/bazi',
      name: 'bazi',
      component: () => import('../views/fengshuiapp/bazi.vue')
    },
 {  // 八字产品
      path: '/bazi_products',
      name: 'bazi_products',
      component: () => import('../views/fengshuiapp/bazi_products.vue')
    },

 {  // 流年运势
      path: '/liunian',
      name: 'liunian',
      component: () => import('../views/fengshuiapp/liunian.vue')
  },
 {  // 流年运势产品
      path: '/liunian_products',
      name: 'liunian_products',
      component: () => import('../views/fengshuiapp/liunian_products.vue')
  },
 {  // 婚姻分析
      path: '/hunyin',
      name: 'hunyin',
      component: () => import('../views/fengshuiapp/hunyin.vue')
  },
 {  // 婚姻分析产品
      path: '/hunyin_products',
      name: 'hunyin_products',
      component: () => import('../views/fengshuiapp/hunyin_products.vue')
  },

{ //纸钱
  path: '/bai/zhiqian',
  component: () => import('@/views/fengshuiapp/bai/zhiqian.vue')
},
{
  path: '/bai/zhiqian2',
  component: () => import('@/views/fengshuiapp/bai/zhiqian2.vue')
},





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
    { //购物车2
      path: '/mycart2',
      name: 'mycart2',
      component: () => import('@/views/fengshuiapp/mycart2.vue')
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
    { //  风水看房字的商品详情页
      path: '/fengshui_house',
      name: 'fengshui_house',
      component: () => import('@/views/fengshuiapp/fengshui_house.vue')
    },

    { // 起名
      path: '/qiming',
      name: 'qiming',
      component: () => import('@/views/fengshuiapp/qiming.vue')
    },






    // ***********************积分推荐类
    { // 积分
      path: '/jifen',
      name: 'jifen',
      component: () => import('@/views/fengshuiapp/jifen.vue')
    },

    { // 支付操作
      path: '/payment_list',
      name: 'payment_list',
      component: () => import('@/views/fengshuiapp/payment_list.vue')
    }












 
  ]
})





export default router
