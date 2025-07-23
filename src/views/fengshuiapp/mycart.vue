<template>

  <van-nav-bar title="忆福安文化" left-text="返回" left-arrow @click-left="router.go(-1)" />
  <div class="p-4">
    <h1 class="text-xl font-bold mb-1 md:mt-10">🛒 我的购物车</h1>

    <!-- 配送方式选择 -->
    <div class="bg-white p-4 rounded shadow mb-3">
      <h2 class="text-md font-semibold mb-2">🚚 配送方式 </h2>
      <label class="mr-4">
        <input type="radio" v-model="deliveryMethod" value="delivery" />
        配送到家
      </label>
      <label>
        <input type="radio" v-model="deliveryMethod" value="pickup" />
        到店自取
      </label>
      <label>
        <input class="ml-2" type="radio" v-model="deliveryMethod" value="zixun" />
        资讯类
      </label>
    </div>

    <div v-if="deliveryMethod === 'pickup'" class="text-sm text-gray-500 mb-4">
      ✅ 您已选择到店自取，无需选择地址。
    </div>
    <div v-if="deliveryMethod === 'zixun'" class="text-sm text-gray-500 mb-4">
      ✅ 您已选择资讯类，无需支付配送费。
    </div>


    <!-- 地址选择区域 -->
    <div v-if="deliveryMethod === 'delivery'" class="bg-white p-2 rounded shadow mb-3">
      <div class="bg-white p-2 rounded shadow mb-3">
        <h2 class="text-md font-semibold mb-0" @click="router.push('/useraddr')">📍 选择收货地址(添加地址)</h2>
        <div class="text-sm px-6 mb-4">大多地区$5到家，其他地区联系商家</div>
        <div v-for="addr in addressList.addresses" :key="addr.id" class="mb-3">
          <label class="flex items-center">
            <input type="radio" v-model="selectedAddressId" :value="addr.id" />
            <div class="ml-2">
              <div>{{ addr.label }} - {{ addr.contact_name }}</div>
              <div class="text-xs text-gray-500">{{ addr.contact_phone }} - {{ addr.detail }}</div>
            </div>
          </label>
        </div>
      </div>
    </div>

    <div class="mb-16">
      <div v-for="item in cart.items" :key="item.id"
        class="bg-white p-4 rounded shadow mb-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <img :src="fullImage(item.product_image)" class="w-20 h-20 object-cover rounded" />
          <div>
            <div class="font-semibold">{{ item.product_name }}</div>
            <div class="text-sm text-gray-500">${{ item.product_price }}</div>
            <!-- <div class="text-red-600 text-sm">小计：¥{{ item.subtotal }}</div> -->
            <div class="text-red-600 text-sm">小计：${{ item.quantity*item.product_price }}</div>
            <!-- 数量控制按钮 -->
            <div class="flex items-center mt-2 mb-2">
              <button @click="changeQuantity(item, item.quantity - 1)"
                class="w-6 h-6 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center"
                :disabled="item.quantity <= 1">-</button>

              <span class="mx-3 w-6 text-center">{{ item.quantity }}</span>

              <button @click="changeQuantity(item, item.quantity + 1)"
                class="w-6 h-6 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center">+</button>
            </div>
          </div>
        </div>

        <!-- 删除按钮 -->
        <button @click="removeItem(item)" class="text-sm text-red-500">删除</button>
      </div>

      <div style="height: 20px;" class="mb-4"></div>

    </div>

    
  </div>

 

  <!-- ✅ 结算按钮，固定在底部 -->
  <div class="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 border-t mb-12">
    <div class="flex justify-between items-center">
      <span class="text-lg font-semibold text-gray-700">合计：${{ total1 }} + <span class="text-sm">运费</span>  ${{ deliveryFee }} = ${{ total }}</span>
      <button @click="checkout" class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
        结算
      </button>
    </div>
  </div>




</template>

<script setup>
import { ref, onMounted,computed } from 'vue'
import https from '@/utils/request'
import { useRouter,useRoute } from 'vue-router'
import { ca } from 'date-fns/locale'
const router = useRouter()
const route = useRoute()

// const cart = ref({ items: [], total: 0 })
const deliveryMethod = ref("delivery")  // 默认是配送到家

// 计算合计
const total1 = computed(() => {
  return cart.value.items.reduce((sum, item) => {
    return sum + item.quantity * item.product_price;
  }, 0).toFixed(2); // 保留两位小数
});

const deliveryFee = ref(0)
 deliveryFee.value = deliveryMethod.value === 'delivery' ? 5 : 0;

const total = computed(() => {
  const baseTotal = cart.value.items.reduce((sum, item) => {
    return sum + item.quantity * item.product_price;
  }, 0);

  const deliveryFee = deliveryMethod.value === 'delivery' ? 5 : 0;

  return (baseTotal + deliveryFee).toFixed(2); // 总价保留两位小数
});


const fullImage = (path) => {
  if (typeof path === 'string') {
    // 如果路径本身已经是完整的 HTTP/HTTPS URL，直接返回
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    const hostname = window.location.hostname;
    const protocol = window.location.protocol; // http: 或 https:
    const backendPort = 8000; // 后端端口号，只有在特定条件下使用

    // 检查 hostname 是否以 '192.' 开头，或者是否是 'localhost' 或 '127.0.0.1'
    // 这些通常是开发环境或本地测试环境的地址
    if (hostname.startsWith('192.') || hostname === 'localhost' || hostname === '127.0.0.1') {
      // 如果是本地或内网 IP，需要拼接端口号
      return `${protocol}//${hostname}:${backendPort}${path}`;
    } else {
      // 如果是域名访问（例如 fs.nearnet.ca），则不需要拼接端口号
      // 因为 Nginx 会处理端口转发
      return `${protocol}//${hostname}${path}`;
    }
  }

  // 如果 path 不是字符串，或者为空，返回空字符串
  return '';
};



// 结账
const checkout2 = async () => {
  if (!cart.value.items.length) {
    alert("购物车为空，无法结算")
    return
  }

  if (deliveryMethod.value === 'delivery' && !selectedAddressId.value) {
    alert("请选择收货地址")
    return
  }

  const payload = {
    delivery_method: deliveryMethod.value,  // 传递配送方式
  }

  if (deliveryMethod.value === 'delivery') {
    payload.address_id = selectedAddressId.value
  }

  const res = await https.post('/api/fengshui/create_order/', payload)

  if (res?.order_id) {
    alert(`订单创建成功，订单号：${res.order_id}`)

     await pay(res.order_id)
  }
}



const pay = async (orderId) => {
  router.push(`/pay/${orderId}`) // 🔁跳转到支付页
}

////////////////////// 绑定地址  //////////
const addressList = ref([])
const selectedAddressId = ref(null)

// const loadAddresses2 = async () => {
//   const res = await https.get('/api/fengshui/addresses/')
//   addressList.value = res
//   const defaultAddr = res.find(addr => addr.is_default)
//   selectedAddressId.value = defaultAddr?.id || (res[0]?.id ?? null)
// }



// **************考虑非登录状况下的购物车******************************
const LOCAL_KEY = 'guest_cart';

const getLocalCart = () => {
  const data = localStorage.getItem(LOCAL_KEY);
  return data ? JSON.parse(data) : [];
};

// const cart = ref({ items: [] });

// 推荐 ref 包裹对象
const cart = ref({
  items: [],
  total: 0,
});

// 这个加载购物车主要用在订单数据修改



const loadCart = async () => {
  const userId = localStorage.getItem('user_id');
  console.log('dingds')
  if (userId) {
    const res = await https.get('/api/fengshui/cart/');
    cart.value = res;
  } else {
    // 未登录，加载本地购物车
    const rawCart = getLocalCart();
    console.log('rawCart',rawCart)
    const ids = rawCart.map(item => item.product_id);
    
    if (!ids.length) {
      cart.value = { items: [] };
      return;
    }

    // 批量请求产品信息
    const res = await https.get('/api/fengshui/products/batch/', 
      { ids: ids.join(',') }
    );
    console.log('res',res)
    cart.value.items = res;


    // // 拼接详细商品信息
    const fullItems = rawCart.map(item => {
      const product = res.find(p => p.product === item.product_id);
      console.log('product',product)
      return {
        ...item,
        product_name: product?.product_name || '未知商品',
        product_price: product?.product_price || 0,
        product_image: product?.product_image || '',
       
      };
    });

    console.log('fullitem',fullItems)

    // cart.value = { items: fullItems };
    cart.value.items = fullItems;
    
    console.log('cart2',cart.value.items)
  }
};




// ************* 修改数量

const saveLocalCart = (items) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
};

const changeQuantity2 = async (item, newQuantity) => {
  
  if (newQuantity < 1) return;

  const userId = localStorage.getItem('user_id');
  if (userId) {
    await https.put('/api/fengshui/cart/', { id: item.id, quantity: newQuantity });
    await loadCart();
  } else {
    const cartItems = getLocalCart();
    const target = cartItems.find(p => p.product_id === item.product_id);
    if (target) {
      target.quantity = newQuantity;
      saveLocalCart(cartItems);
      cart.value.items = cartItems;
    }
  }
};

const changeQuantity = async (item, newQuantity) => {
  if (newQuantity < 1) return;
  console.log('item',item.quantity)
  console.log('item',item)
  console.log("newqutity",newQuantity)
  const userId = localStorage.getItem('user_id');

  if (userId) {
    // 登录用户更新后端购物车
    await https.put('/api/fengshui/cart/', { id: item.id, quantity: newQuantity });
    await loadCart();
  } else {
    // 未登录用户修改本地购物车
     console.log("neirong ")
    const cartItems = getLocalCart();

    console.log('cartItems',cartItems)
    
    const target = cartItems.find(p => p.product_id === item.product_id);
    console.log("target",target)
    
    if (target) {
      target.quantity = newQuantity;
      saveLocalCart(cartItems);
      console.log("adfs333")
      // return
    }

    // 👇 修改后重新加载，确保 UI 显示商品信息、价格正确
    await loadCart();
  }
};

const removeItem = async (item) => {
  const userId = localStorage.getItem('user_id');

  if (userId) {
    try {
      await https.delete(`/api/fengshui/cartdel/${item.id}/`);
      await loadCart(); // 登录状态下重新加载
    } catch (error) {
      console.error('删除失败', error);
    }
  } else {
    // 未登录：本地数据操作
    const cartItems = getLocalCart();
    console.log('cartItem',cartItems)
    const updatedItems = cartItems.filter(p => p.product_id !== item.product_id);
    saveLocalCart(updatedItems);

    console.log('updatedItems',updatedItems)

    // ✅ 重点：整体替换 cart 对象，触发 Vue 响应式


    await loadCart();


  }
};


const checkout = async () => {
  const userId = localStorage.getItem('user_id');

  if (!cart.value.items.length) {
    alert("购物车为空，无法结算");
    return;
  }

  if (!userId) {
    alert("请先登录再进行结算！");
    router.push('/user_login');
    return;
  }

  if (deliveryMethod.value === 'delivery' && !selectedAddressId.value) {
    alert("请选择收货地址");
    return;
  }

  const payload = {
    delivery_method: deliveryMethod.value,
  };

  if (deliveryMethod.value === 'delivery') {
    payload.address_id = selectedAddressId.value;
  }

  const res = await https.post('/api/fengshui/create_order/', payload);

  if (res?.order_id) {
    alert(`订单创建成功，订单号：${res.order_id}`);
    await pay(res.order_id);
  }
};

// ********* 加载地址
const loadAddresses = async () => {
  const userId = localStorage.getItem('user_id');
  if (!userId) return;  // 未登录不加载地址

  const res = await https.get('/api/fengshui/addresses/');
  addressList.value = res;
  // const defaultAddr = res.find(addr => addr.is_default);
  // selectedAddressId.value = defaultAddr?.id || (res[0]?.id ?? null);
};

/////////////绑定地址结束////////////

onMounted(() => {
  loadCart()
  loadAddresses()
})
</script>
