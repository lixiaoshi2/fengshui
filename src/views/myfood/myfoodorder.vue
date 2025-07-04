
<template>

  <van-nav-bar title="邻家网 - 我购买的商品" left-text="返回" @click="router.go(-1);" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <div style="margin-bottom: 70px;" class="order-container " ref="containerRef" >
    <!-- <h2>订单列表</h2> -->
    <div
      v-for="order in groupedOrders"
      :key="order.ordersid"
      class="order-item"
    >
      <h4>订单号: {{ order.ordersid }}</h4>
      <p style="height: 13px; padding-bottom:0px ; margin-bottom: 0px;">总金额: {{ order.totalAmount.toFixed(2) }} 元 ,  运费：{{ order.totalYunfei.toFixed(2) }},总数量: {{ order.totalQuantity }}</p>

      <p><span >取货地址：</span> {{ order.yizhanaddr }}</p>
      <p><span >电话：</span> {{ order.phone }}</p>
      <p><span >时间：</span> {{ order.create_time }}</p>
      <p><span >时间：</span> {{ order.shipping ==='1' ? '配送' : '自取' }}</p>
      
      <p @click="openDialog(order)"><span  style="">备注：</span> {{ order.orderbeizhu }}</p>
     
      <ul>
        <li v-for="(item, index) in order.goods" :key="index">
          {{ item.goodsname }} - 数量: {{ item.shuliang }} - 金额:
          {{ item.paidmoney }} 元
        

        </li>
        <div class="order-buttons">

          <span :style="{  marginRight: '20px',    color: order.status === '已完成' ? 'green' : 'red'   }"> {{ order.status }}  </span>
        <button @click="godetail(order)"   class="order-btn detail-btn"> 订单详情</button>
       
        <span :style="{  marginLeft: '20px',   color: order.is_paid ? 'green' : 'red'  }"> {{  order.is_paid ? '已支付' : '未支付' }}  </span>
      </div>
      </ul>

      
    </div>
     
  </div>
 
  <van-dialog
    v-model:show="dialogVisible"
    show-cancel-button
    title="添加备注"
    confirm-button-text="保存"
    cancel-button-text="取消"
    @confirm="saveBeizhu"
    @cancel="handleDialogClose"
  >
    <van-field
      v-model="currentOrderBeizhu"
      placeholder="请输入备注内容，字数不要超过15个字"
      clearable
    />
  </van-dialog>



</template>
  
  <script setup>

  // import apiFun from '@/utils/api.js'
  import https from '@/utils/request.js';
  import userFunc from '@/utils/userfunc.js'
  import funcs from '@/utils/common_func.js'
  import config from '@/global.config.js'

  import { ref, onMounted, computed,reactive,onActivated } from 'vue';
  import {  showToast, showDialog, showConfirmDialog,ImagePreview   } from 'vant';
//   import textEditor  from "@/components/textEditor.vue"  
//   import weizhi from '@/components/weizhi.vue'

  import { useRouter,useRoute } from 'vue-router'
  const router = useRouter()
  const route = useRoute()
// order_add?postbiao_id=44&fenleibiao_id=55&title

  const title = route.query.title;
  const fenlei_name = route.query.fenlei_name;
  const listdata2 = ref([])
  const containerRef = ref(null)
  const responseData = ref({})
  const spinning = ref(false);  // 正在加载的标志

  const desc = ref('')
  const fenlei_name2 = ref('')
  fenlei_name2.value = fenlei_name
  
  const showModal = ref(false);
  const currentImg = ref('');

  const dialogVisible = ref(false);
  const currentOrderBeizhu = ref("");
  const currentOrderId = ref(null);

  // 打开对话框
  const openDialog = (order) => {
    console.log("打开输入框")
      currentOrderId.value = order.ordersid;
      // currentOrderBeizhu.value = order.orderbeizhu || "";
      dialogVisible.value = true;
    };

  // 关闭对话框前清空数据
  const handleDialogClose = () => {
    currentOrderId.value = null;
    currentOrderBeizhu.value = "";
  };

  // 保存备注
  const saveBeizhu = () => {

    const values2 = {
      ordersid: currentOrderId.value,
      orderbeizhu: currentOrderBeizhu.value,
    };
    console.log("发送到后台的数据：", values2);

    console.log('确认下单')
    https.put('/api/myfood/myfoodorder_update_beizhu/', values2).then(response => {
      // https.put(`/api/myfood/myfoodorder_update_beizhu/${myfoodorder_id}/`).then(response => {
      // console.log('asdfas555111');
      console.log(response);
      var targetItem = listdata2.value.find((item) => item.ordersid ===currentOrderId.value,);
       targetItem.orderbeizhu = targetItem.orderbeizhu + ' '+ currentOrderBeizhu.value
      
    }).catch(error => {
      console.log('需要添加用户详细信息');

      console.error(error);

    });


    // 显示成功提示
    

    // 关闭对话框
    dialogVisible.value = false;
  };



  const showImage = (imgUrl) => {
    currentImg.value = imgUrl;
    showModal.value = true;
  };


  // 点击获取订单详情，进入订单详情页
  const godetail = (item) =>{
    // router.push(`/goodsorderdetail?id=${orderid}`)
    console.log('某个订单所有内容', item)
    console.log('某个订单号', item.ordersid)
   
    window.removeEventListener('scroll', handleScroll);
   containerRef.value.removeEventListener('scroll', handleScroll);
   route.meta.isPush = false; //这段代码让

    
    let target_url =  `/myfoodorder_detail/${item.ordersid}/`
    // // console.log('url',target_url)
    router.push(target_url)
  }

 
//  分组的算法
   // 数据分组及统计
  const groupedOrders = computed(() => {
    const orderMap = listdata2.value.reduce((acc, item) => {
      const orderId = item.ordersid;
      const status = item.status;
      const orderbeizhu = item.orderbeizhu;
      const yizhanaddr = item.yizhanaddr;
      const phone = item.phone;
      const is_paid = item.is_paid;
      const shipping = item.paymode  //取货模式，自取还是送货上门
      var create_time = item.create_time;
      create_time = create_time.split(".")[0].replace("T", " ");

      // 如果该订单号不存在，初始化
      if (!acc[orderId]) {
        acc[orderId] = {
          ordersid: orderId,
          totalAmount: 0,
          totalQuantity: 0,
          totalYunfei: 0,
          is_paid: is_paid,
          status: status,
          orderbeizhu:orderbeizhu,
          yizhanaddr:yizhanaddr,
          phone:phone,
          shipping:shipping,
          create_time:create_time,
          goods: [],
        };
      }

      // 累加数量和金额
      // acc[orderId].totalAmount += parseFloat(item.paidmoney) +item.shuliang*1.5;
      acc[orderId].totalQuantity += item.shuliang;
      // 运费算在一起
      // console.log('取货形式', item.paymode)
      if (item.paymode == '1') {
        acc[orderId].totalAmount += parseFloat(item.paidmoney) + item.shuliang * 1.5;
        acc[orderId].totalYunfei += item.shuliang * 1.5;
      } else {
        acc[orderId].totalYunfei = 0;
        acc[orderId].totalAmount += parseFloat(item.paidmoney);
      }


      // 添加物品详情
      acc[orderId].goods.push({
        goodsname: item.goodsname,
        shuliang: item.shuliang,
        paidmoney: item.paidmoney,

      });

      return acc;
    }, {});
    // 将结果转换为数组
    return Object.values(orderMap);
  });

  // 第二次查询函数，就直接从第一次查询的参数里获取next，这样就不用再次获取查询参数了，页码在里面也有了
  const loaddata2 = () => {
    // loading.value = true
    spinning.value = true
    let listNextUrl = localStorage.getItem("listNextUrl")
    console.log('listNextUrl', listNextUrl)

    if (listNextUrl !== "null") {     //如果
      console.log('不是null进入此处')
      // 下面的代码是根据测试还是生产环境来提供listNextUrl，这步骤提供http://192.168.1.127:8000/api/hotel/list2/?city=Toronto&page=2
      // 替换原来的地址为https ，并且“/api/” 替换成“/api/api/”以满足后端的需求
      listNextUrl = funcs.getUrlIp(listNextUrl)
      console.log('listNextUrl', listNextUrl)


      https.get(listNextUrl).then(response => {
        console.log('asdfas5551112');
        console.log(response);
        // retnull = response;

        for (let i = 0; i < response.results.length; i++) {
          // console.log('aaa', response.results[i].imgurl);
          response.results[i].imgurl = response.results[i].imgurl.replace(config.backendserver1, config.backendserver);
          // console.log('bbb',listdata2.value[i].imgurl)
        }

        listdata2.value = [...listdata2.value, ...response.results]
        // showToast('获取列表成功');


        localStorage.setItem('listNextUrl', response.next)
        // var pagenum4 = funcs.getpageNum(response.next)

        // localStorage.setItem('pageNum',pagenum4)
        spinning.value = false
      }).catch(error => {
        console.log('出错了112');
        console.log(error);
        showDialog({ message: '您的访问次数过多，请一分钟后再访问' })
        // showToast('请重新登录');
      });

    } else {
      console.log('是null')
      listdata2.value = [...listdata2.value]
      // return
    }
  }


     // 这个事件处理函数就是模板中的处理scroll事件的函数，js一直提供scroll事件的信息，我们提取滚动信息，然后判断是否触底
  const handleScroll = (event) => {
    if (spinning.value) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    // console.log('1', scrollHeight,scrollTop,clientHeight)
    if (scrollHeight - scrollTop - clientHeight < 200) {
      // console.log('触底了，加载新的数据');
      loaddata2();
     

    }

  }
  

   
 onActivated(() => {
   // alert('asdf')
   var push = localStorage.getItem('push')
   console.log('enter into onactivated lif time')
   window.addEventListener('scroll', handleScroll);  //pc端加载事件监听
   containerRef.value.addEventListener('scroll', handleScroll)  //这个事件加载命令对手机端监听scroll有用
   console.log(push);
   // 如果isPush为true，证明不是详情页返回的，否则就是从详情页返回的
   if (push == 'true') {
     // 如果不是 重置这个页面的信息
     // alert(this.$route.meta.isPush)
     // alert('123')  //这个可以作为测试使用，因为console没用了
     console.log('is push request')  //这一项不会在console控制台显示，也就是无效console代码 alert是有效的
     // alert('asdf333')
     router.go(0);
     localStorage.setItem('push', false)
   } else {
     // alert("enter into hotel_list page,it's ispush is ")
     // 重置isPush的状态
     // route.meta.isPush = true;
     // router.go(1);
     console.log("ads")
   }
 })
 
 

  onMounted(() => {
  
  // 获取数据
  // console.log('userid', user_id)
    https.get(('/api/myfood/list_buy_order/')).then(response => {
      // console.log('asdfas555111');
      console.log('fanhuizhi', response);
      responseData.value = response.results
      listdata2.value = response.results

      // 一定要在这里写获取数据以后的逻辑
       localStorage.setItem('listNextUrl', response.next)

      window.removeEventListener('scroll', handleScroll);
      window.addEventListener('scroll', handleScroll);  //pc端加载事件监听
      containerRef.value.addEventListener('scroll', handleScroll)  //这个事件加载命令对手机端监听scroll有用

  
    }).catch(error => {
      console.log('出错了2');
      console.error(error);
      // showToast('请重新登录');
    });
    // 设置下一页的地址
   

  } );
  

    // 删除订单
    const delorder = (id) =>{
      https.delete((`/api/order/goodsorder/${id}/`)).then(response => {
      // console.log('asdfas555111');
      console.log('fanhuizhi', response);
     
    }).catch(error => {
      console.log('出错了2');
      console.error(error);
      // showToast('请重新登录');
    });

    }
  </script>

<style scoped>



.order-container {
  width: 100%;
  margin: 0px auto;
  font-family: Arial, sans-serif;
  color: #333;
}

/* 每个订单的样式 */
.order-item {
  padding-left: 6px;
  font-size: 13px;
  border-bottom: 12px solid transparent;
  border-image: url("/path/to/your/horizontal-line.png") 30 round; /* 横线图片 */
  background-color: #fafafa;
  border-radius: 8px;
  margin-bottom: 0px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 标题样式 */
h4 {
  text-align: center;
  color: #555;
  margin-bottom: 5px;
}

/* 按钮容器样式 */
.order-buttons {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 10px;
}

/* 按钮样式 */
.order-btn {
  padding: 3px 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  color: #fff;
}

/* 各按钮不同的颜色 */
.detail-btn {
  background-color: #3498db;
}

.delete-btn {
  background-color: #e74c3c;
}

.pay-btn {
  background-color: #2ecc71;
}

/* 按钮悬浮效果 */
.order-btn:hover {
  opacity: 0.8;
}
















:deep .van-field__control{
    color: rgb(13, 110, 78);
}

.containerRef{
  background-color: rgb(237, 236, 235);
}
.container {
  width: 100%; /* 容器占满全部宽度 */
  display: flex; /* 使用 Flexbox 布局 */
  /*flex-wrap: wrap;  允许换行 */
  margin: 5px;
}


.modal {
  position: fixed;
  z-index: 9999; /* 确保在顶层 */
  /* background-color: rgba(0, 0, 0, 0.9);  半透明黑色背景 */
  /* display: flex; */
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.modal-content {
  max-width: 100vw; /* 使用视口宽度的90%作为最大宽度 */
  max-height: 90vh; /* 使用视口高度的90%作为最大高度 */
  object-fit: contain; /* 图片按比例缩放以完全填充容器 */
}

.thumb-img {
  cursor: pointer; /* 鼠标指针样式为手型 */
  width: 100%; /* 缩略图宽度100% */
  height: auto; /* 自动调整高度 */
}

.close {
  position: absolute;
  top: 15px;
  right: 15px;
  color: #fff; /* 符号的颜色 */
  font-size: 30px;
  background-color: rgba(0, 0, 0, 0.5); /* 背景色，半透明黑色 */
  padding: 5px; /* 调整内边距 */
  border-radius: 50%; /* 圆角 */
  cursor: pointer;
}




::deep .van-card-desc {
  white-space: pre-line; /* 允许文本根据需要自动换行 */
}


.goodslist{
 
  height: auto;
  padding-top: 10px;
  align-items: center; /* 垂直居中 */
  
  /* background-color: white; */
}

.bottom-row{
  
  background-color: #fff;
  display: flex;
  max-width: 760px;
  justify-content: flex-end; /* 按钮居右对齐 */
  gap: 10px; /* 按钮之间的间距 */
  padding-right: 10px; /* 右边内边距 */
  padding-bottom: 5px;
}


.full-screen-layout {
  display: flex;
  margin-bottom: 0px;
 
  height: auto;
  padding-top: 10px;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  background-color: white;
}

.image {
  margin-left: 10px;
  flex: 0 0 22%; /* 左侧图片固定宽度为屏幕宽度的一半 */
  /* max-width: 50%;  图片最大宽度为屏幕宽度的一半 */
  
}

.image img {
  max-width: 100%; /* 图片最大宽度100% */
  height: auto; /* 高度自适应 */
  max-height: 70vh; /* 图片最大高度为屏幕高度的70% */
  object-fit: contain; /* 图片填充方式，保持比例并适应容器 */
 
  border-radius: 12px; /* 圆角效果 */
}

.info {
  flex: 1; /* 右侧信息占据剩余空间 */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 垂直顶部对齐 */
  align-items: flex-start; /* 左对齐 */
  padding-top: 5px; /* 右侧信息的内边距 */
  margin-left:10px;
  margin-top:-10px;
  padding-bottom: 5px;
 
  padding-right: 10px;
}

.info-item {
  margin-bottom: 5px;
  margin-right: 5px;
}

.label {
  font-weight: bold;
  font-size: 12px; /* 标签字体大小 */
}

.value {
  font-size: 12px; /* 值字体大小 */
  color: rgb(87, 84, 84);
}

.mybutton{
  border: 1px solid #353636; /* 边框颜色和宽度 */
  border-radius: 5px; /* 圆角半径 */
  padding: 2px 8px; /* 内边距 */
  padding-top:0px;
  font-size: 12px; /* 字体大小 */
  color: #0c0c0c; /* 文字颜色 */
  background-color: transparent; /* 背景透明 */
  cursor: pointer; /* 鼠标指针为手型 */
  transition: background-color 0.3s, color 0.3s; /* 过渡效果 */
}

.ispaid{
  margin-left:20px;
  padding-left:20px;
  color:green;
}
.unpaid{
  margin-left:20px;
  padding-left:20px;
  color:red;
}

</style>
