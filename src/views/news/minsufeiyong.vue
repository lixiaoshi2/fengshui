<template>

  <!-- 顶部菜单导航 -->
  <TopNav></TopNav>

<!-- xin -->

<div class="max-w-3xl mx-auto p-4 space-y-6 pb-20">
    <h1 class="text-xl font-bold text-center text-teal-600 mb-4">
      🏠 民宿托管运营事项及费用说明，我方仅收取信息服务费10%
    </h1>
    <p class="text-gray-700 text-sm text-center mb-6">
      为保障合作的透明与顺畅，以下是我方在民宿托管运营过程中的职责说明及相关费用项目，供业主参考。
    </p>

    <!-- 单项展示卡片 -->
    <div
      v-for="(item, index) in items"
      :key="index"
      class="bg-white shadow-md rounded-xl p-4 border border-gray-200 "
    >
      <h2 class="text-lg font-semibold text-gray-800 mb-2">{{ item.title }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <p class="font-medium text-teal-600 mb-1">我方职责</p>
          <p class="text-gray-700 whitespace-pre-line">{{ item.ourDuty }}</p>
        </div>
        <div>
          <p class="font-medium text-blue-600 mb-1">业主职责</p>
          <p class="text-gray-700 whitespace-pre-line">{{ item.ownerDuty }}</p>
        </div>
      </div>
    </div>
  </div>


</template>


<script setup>
 import TopNav from './topMenu.vue'


const items = [
  {
    title: "平台账号运维",
    ourDuty: "管理美团、途家等平台账号，\n提供客服、定价策略、入住引导等服务。",
    ownerDuty: "无需操作。",
  },
  {
    title: "电话服务支持",
    ourDuty: "提供 7×12 小时电话客服，解答客人问题。",
    ownerDuty: "无。",
  },
  {
    title: "维修协调服务，无论由房客人为破坏或自然损耗导致的维修",
    ourDuty: "协助业主维修，提供多个维修人员的联系方式。",
    ownerDuty: "与维修方沟通并承担费用。",
  },
  {
    title: "保洁安排",
    ourDuty: "可推荐保洁人员并协助日常保洁安排。",
    ownerDuty: "可自聘保洁，承担保洁费用。",
  },
  {
    title: "耗材代购服务",
    ourDuty: "可代购消耗品，收取成本+服务费。",
    ownerDuty: "可自行采购或委托我方代购。",
  },
  {
    title: "房费收入",
    ourDuty: "不代收房费，平台收入直接到账业主账户。",
    ownerDuty: "接收平台或自有渠道房费收入。",
  },
  {
    title: "信息服务费",
    ourDuty: "按实际房费收入的 10% 收取服务费，\n不另收其他运营费用。",
    ownerDuty: "按时支付我方信息服务费。",
  },
  {
    title: "平台抽成",
    ourDuty: "不参与平台抽成部分，自动扣除。",
    ownerDuty: "线上线下扣除10%，由房费中自动结算。",
  },
  {
    title: "水电物业费",
    ourDuty: "无。",
    ownerDuty: "业主承担水电及物业费用，只有房间有收入了才有这部分的开支。",
  },
  {
    title: "保洁费用",
    ourDuty: "协助安排保洁服务，费用透明。",
    ownerDuty: "按次结算保洁费用，从房费中扣除，业主承担。",
  },
]
</script>