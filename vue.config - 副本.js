import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// ********************************预渲染配置
//这个一定要有，因为如果不安装puppeteer也就是模拟无头访问网站会因为语法不支持无效，如果安装安装不了 加一个参数--force
import legacy from '@vitejs/plugin-legacy';  
import prerender from 'vite-plugin-prerender'
const Renderer = prerender.PuppeteerRenderer;
import path from 'path'
import compress from 'vite-plugin-compression'


export default defineConfig({
  plugins: [
    vue(),
    compress({ algorithm: 'gzip' }), 



    Components({
      resolvers: [VantResolver()],
    }),
    
    // ******* 下面的prerender是预渲染的配置
    legacy({
      targets: ['defaults', 'not IE 11'].env
    }),
    
    prerender({
      // routes: ['/home','/glasses_list'], // 预渲染入口页面,在这里可以添加需要加入搜索引擎的页面
      routes: [],
      staticDir: path.join(__dirname, 'dist'),
      // 可选配置
      // minify: true, // 是否压缩 HTML
      minify : { 
        collapseBooleanAttributes : true , 
        collapseWhitespace : true , 
        decodeEntities : true , 
        // keepClosingSlash : true , 
        sortAttributes : true , 
      } ,
      inject: {
        foo: 'bar', // 在预渲染时注入的全局变量
      },
      renderer: new Renderer({
        
        // renderAfterDocumentEvent: 'render-event', // 确保渲染完成
        // headless: true,
        headless: false,
        renderAfterDocumentEvent: 'render-event',
        timeout: 10000,
        renderAfterTime: 5000,
        maxConcurrentRoutes: 4,

      }),

       fallback: "index.html",
    }),
  // ********* 此段预渲染的内容配置结束 
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  
// 打包的配置 有的文件太大打包成小的文件
  build: {
    outDir:'dist',
    chunkSizeWarningLimit: 1500,
    
    minify: 'esbuild',
    sourcemap: false,

    rollupOptions: {
      output: { 
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },

  server: {
    port: 3000,  // 定义了前端的服务器端口，可以不要

    proxy: {
      '/map': {
        target: 'https://apis.map.qq.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/map/, ''),
      },
    },

  },

})
