<template>
    <TopNav></TopNav>
    <div class="bg-gray-100 min-h-screen p-3">

      <div class="max-w-2xl mx-auto">
  
        <h1 class="text-2xl font-bold text-center mb-6">销售体系</h1>
  
        <!-- 角色与分成 -->
        <section class="bg-white p-4 rounded-2xl shadow mb-10">
          <h2 class="text-2xl font-semibold mb-4">1. 角色与分成</h2>
          <div class="space-y-4">
            <div>
              <h3 class="font-bold text-lg">一级销售：</h3>
              <ul class="list-disc list-inside ml-4 text-gray-700">
                <li>工作内容是发展二级销售代表</li>
                <li>他的二级销售的利润，他都能持续获得 <span class="font-bold text-blue-600">10%</span> 的永久分成。</li>
              </ul>
            </div>
            <div>
              <h3 class="font-bold text-lg">二级销售：</h3>
              <ul class="list-disc list-inside ml-4 text-gray-700">
                <li>负责找房源，与房东客户沟通、对账以及少部分民宿运营工作等。</li>
                <li>获得 <span class="font-bold text-blue-600">40%</span> 的利润分成。</li>
                
              </ul>
            </div>
            <div>
              <h3 class="font-bold text-lg">客户归属：</h3>
              <ul class="list-disc list-inside ml-4 text-gray-700">
                <li>平台负责民宿整体策划、上线、运营和统计对账</li>
                <li>二级负责房源对接与运营落地。</li>
                <li>一级负责拓展二级销售代表。</li>
                <li>各环节人员各司其职，相互依赖，形成长期利益共享的分成机制，所有成员都有长期被动收入</li>
              </ul>
            </div>
          </div>
        </section>
  
        <!-- 信任保障体系 -->
        <section class="bg-white p-6 rounded-2xl shadow mb-10">
          <h2 class="text-2xl font-semibold mb-4">2. 信任保障体系</h2>
          <ul class="list-disc list-inside ml-4 text-gray-700 space-y-2">
            <li>平台提供完整的分成明细账单（每笔订单清晰展示利润、分成金额、发放时间）。</li>
            <li>二级销售代表因直接接触客户，可通过客户查询营收，核对数据的可靠性。</li>
            <li>一级销售可查看名下二级的业绩与分成明细。</li>
            <li>任何一方可通过民宿入住情况来验证收入的真实情况。</li>
            <li>项目对账通过二级销售向业主获取收益，无需担心利益被吞没。</li>
            <li>所有入住信息必须录入系统，否则会导致订单冲突，这保证了经营数据的真实性和完整性，从而保障所有人的权益。</li>


          </ul>
        </section>
  
        <!-- 传播扩展机制 -->
        <section class="bg-white p-6 rounded-2xl shadow mb-10">
          <h2 class="text-2xl font-semibold mb-4">3. 传播扩展机制</h2>
          <ul class="list-disc list-inside ml-4 text-gray-700 space-y-2">
            <li>当二级销售代表推广数量达到30个民宿以上的时候，可发展有销售能力的人成为自己的二级销售代表，这样他就变成一级销售。</li>
            
            <li>人人可裂变，人人能获利，最大程度释放营销潜力。</li>
          </ul>
        </section>
  
        <!-- 举例说明 -->
        <!-- 业绩举例与分成机制 -->
      <section class="bg-white p-6 rounded-lg shadow mb-12">
        <h2 class="text-2xl font-bold mb-4">业绩举例与分成机制</h2>
        <!-- 二级销售 -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-2">二级销售代表</h3>
          <ul class="list-inside space-y-1 text-gray-700">
            <li><span class="font-semibold">工作对象：</span>房东</li>
            <li><span class="font-semibold">假设：</span>每位代表拥有 30 位房东客户</li>
            <li><span class="font-semibold">每年每套营收：</span>30000元</li>
            <li><span class="font-semibold">年服务费总额（10%）：</span>90,000 元</li>
            <li><span class="font-semibold">分成比例：</span>40%，即 <span class="text-green-600 font-semibold">36,000 元/年</span></li>
            <li><span class="font-semibold">时效：长期有效的被动收入(即使工作变动)</span></li>
          </ul>
        </div>
        <!-- 一级销售 -->
        <div>
          <h3 class="text-xl font-semibold mb-2">一级销售</h3>
          <ul class="list-inside space-y-1 text-gray-700">
            <li><span class="font-semibold">工作对象：</span>发展二级销售代表</li>
            <li><span class="font-semibold">假设：</span>推荐 10 位二级，每人年服务费 90,000 元</li>
            <li><span class="font-semibold">年总服务费：</span>900,000 元</li>
            <li><span class="font-semibold">推荐分成：</span>10%，即 <span class="text-green-600 font-semibold">90,000 元/年</span></li>
            <li><span class="font-semibold">时效：长期有效的被动收入(即使工作变动)</span></li>
          </ul>
        </div>
      </section>
  
       
  
        
  
      </div>
    </div>
  </template>
  
  <script setup>
  // 暂时没有需要用到 JS 逻辑
  import TopNav from './topMenu.vue'
  </script>
  
  <style scoped>
  /* 可以根据需要添加一些额外的小动画或细节样式 */
  </style>
  