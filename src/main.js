import './assets/main.css'
import './assets/css/iconfont.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createHead } from '@vueuse/head'


import { Popup, Notify,Toast,ImagePreview } from 'vant';
import 'vant/lib/index.css';
import VueDOMPurifyHTML from 'vue-dompurify-html';
import { Dialog } from 'vant'


const app = createApp(App)
const head = createHead()
app.use(router)
// app.use(store)
app.use(VueDOMPurifyHTML);
app.use(Popup)
// app.use(Notify)
app.use(Toast)
// app.use(apiFun)
// app.use(ElementPlus);
app.use(head)

app.use(Dialog)

// app.use(createMetaManager())

app.use(ImagePreview)



app.mount('#app')  //这是原来的

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // 等待 Vue 渲染完成后触发 render-event
router.isReady().then(() => {
    // 在这里加载数据或其他异步操作
    // 假设加载完成后，触发 render-event
    setTimeout(() => {
      document.dispatchEvent(new Event('render-event'))
    }, 3000) // 这里是选择延迟 1 秒后触发事件，确保页面已完全加载
  })
