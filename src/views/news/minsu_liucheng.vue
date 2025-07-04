<template>
   <TopNav></TopNav>
  <div class="bg-gray-50 min-h-screen px-4 py-6">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- 第一阶段：准备工作 -->
      <section class="bg-white px-4 py-5 rounded-2xl shadow">
        <h2 class="text-lg font-bold mb-3">第一阶段：准备工作（房屋上线前）</h2>
        <p class="text-sm text-gray-600 mb-3"><span class="font-semibold">目标：</span>为房屋上线运营做好全面准备</p>
        <div class="space-y-3">
          <div>
            <h3 class="text-base font-semibold">物资采购及保洁准备</h3>
            <ul class="list-disc list-inside ml-4 text-sm text-gray-700">
              <li>购买床上用品（床单、被子、枕头等）</li>
             
              <li>购买常用消耗品（洗发水、牙具、厕纸等）</li>
              <li>聘请保洁人员，并培训</li>
            </ul>
          </div>
          <div>
            <h3 class="text-base font-semibold"></h3>
          </div>
          <div>
            <h3 class="text-base font-semibold">空间布置与美化</h3>
            <ul class="list-disc list-inside ml-4 text-sm text-gray-700">
              <li>房屋清洁，联系保洁做首次清扫</li>
              <li>室内软装、灯光、墙饰等细节布置</li>
              <li>更换或安装智能密码锁</li>
              <li>配套民宿床上用品的清洁的洗衣机及晾晒环境</li>
            </ul>
          </div>
          <div>
            <h3 class="text-base font-semibold">拍摄与资料整理</h3>
            <ul class="list-disc list-inside ml-4 text-sm text-gray-700">
              <li>拍摄房屋各区域照片（重点：卧室、卫生间、厨房、阳台等）</li>
              <li>编写《入住指南》（包含行车、停车、自行车路线）</li>
              <li>准备周边生活配套介绍（便利店、餐饮等）</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 第二阶段：平台上线 -->
      <section class="bg-white px-4 py-5 rounded-2xl shadow">
        <h2 class="text-lg font-bold mb-3">第二阶段：平台上线</h2>
        <p class="text-sm text-gray-600 mb-3"><span class="font-semibold">目标：</span>使房源在 OTA 平台正式可预订</p>
        <div class="space-y-3">
          <div>
            <h3 class="text-base font-semibold">平台入驻</h3>
            <ul class="list-disc list-inside ml-4 text-sm text-gray-700">
              <li>业主身份认证（上传身份证）</li>
              <li>手机号认证与绑定</li>
              <li>签署平台协议</li>
            </ul>
          </div>
          <div>
            <h3 class="text-base font-semibold">房源发布</h3>
            <ul class="list-disc list-inside ml-4 text-sm text-gray-700">
              <li>上传房屋实拍照片</li>
              <li>填写房屋信息（地址、房型、面积、楼层、设施等）</li>
              <li>设置价格与日历（支持平日、周末、节假日定价）</li>
            </ul>
          </div>
          <div>
            <h3 class="text-base font-semibold">入住引导上传</h3>
            <ul class="list-disc list-inside ml-4 text-sm text-gray-700">
              <li>上传图文版《入住指引》</li>
              <li>填写密码锁说明、WIFI 信息、垃圾分类、周边交通说明等</li>
            </ul>
          </div>
          <div>
            <h3 class="text-base font-semibold">系统对接</h3>
            <ul class="list-disc list-inside ml-4 text-sm text-gray-700">
              <li>房源同步至我方后台系统</li>
              <li>预订信息、客户资料、保洁安排可实时同步</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 第三阶段：正式运营与服务支持 -->
      <section class="bg-white px-4 py-5 rounded-2xl shadow mb-8">
        <h2 class="text-lg font-bold mb-3">第三阶段：正式运营与服务支持</h2>
        <p class="text-sm text-gray-600 mb-3"><span class="font-semibold">目标：</span>高效运营、良好服务、及时应对</p>
        <div class="space-y-3 mb-6">
          <div>
            <h3 class="text-base font-semibold">客户服务</h3>
            <ul class="list-disc list-inside ml-4 text-sm text-gray-700">
              <li>客户预订后及时沟通确认</li>
              <li>提供密码锁、入住指引（自动/手动发送）</li>
              <li>提供设施使用说明（如热水器、电视、空调）</li>
            </ul>
          </div>
          <div>
            <h3 class="text-base font-semibold">突发情况处理</h3>
            <ul class="list-disc list-inside ml-4 text-sm text-gray-700">
              <li>入住问题响应（如无法开门、断电等）</li>
              <li>中途维修协调（电器、水管等）</li>
              <li>安排临时保洁或紧急支援</li>
            </ul>
          </div>
          <div>
            <h3 class="text-base font-semibold">日常运营管理</h3>
            <ul class="list-disc list-inside ml-4 text-sm text-gray-700">
              <li>退房后的保洁安排</li>
              <li>房屋损坏记录与赔偿处理</li>
              <li>收入分配：各相关方分配服务费</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// 无需额外脚本逻辑
import TopNav from './topMenu.vue'
</script>

<style scoped>
/* 你可以根据需求添加自定义样式 */
</style>
