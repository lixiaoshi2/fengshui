<template>
   <TopNav></TopNav>
  
   <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">民宿物资清单</h1>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="text-left p-2 border">序号</th>
            <th class="text-left p-2 border">名称</th>
            <th class="text-left p-2 border">型号及数量</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in materialList" :key="item.id" class="hover:bg-gray-50">
            <td class="p-2 border">{{ item.id }}</td>
            <td class="p-2 border">{{ item.name }}</td>
            <td class="p-2 border">{{ item.spec }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>



</template>

<script setup>
import TopNav from './topMenu.vue'



const materialList = [
  { id: 1, name: '灭火器', spec: '1个' },
  { id: 2, name: '吹风机', spec: '1个' },
  { id: 3, name: '衣架', spec: '20个' },
  { id: 4, name: '升降晒衣杆', spec: '' },
  { id: 5, name: '路由器', spec: '1个' },
  { id: 6, name: '抽纸', spec: '60包' },
  { id: 7, name: '垫褥子', spec: '一床一个' },
  { id: 8, name: '被芯', spec: '一床一个' },
  { id: 9, name: '枕芯', spec: '一床两个' },
  { id: 10, name: '四件套', spec: '最少一用两备' },
  { id: 11, name: '大毛毯', spec: '一床一个' },
  { id: 12, name: '洗涤液20kg', spec: '一桶' },
  { id: 13, name: '海绵拖把带三个头', spec: '1把' },
  { id: 14, name: '旋转拖把', spec: '1套' },
  { id: 15, name: '撮箕一套带刮水的', spec: '1把' },
  { id: 16, name: '防滑拖鞋', spec: 'eva防滑 2-4双' },
  { id: 17, name: '乳胶手套', spec: '3套' },
  { id: 18, name: '抹布', spec: '5块' },
  { id: 19, name: '洗发洗、沐浴液', spec: '分别500袋' },
  { id: 20, name: '84消毒液', spec: '5kg一桶' },
  { id: 21, name: '牙刷', spec: '500把' },
  { id: 22, name: '烧水壶', spec: '一把' },
  { id: 23, name: '70#90大垃圾袋', spec: '100只' },
  { id: 24, name: '托盘', spec: '2个' },
  { id: 25, name: '60升大垃圾桶', spec: '1个' },
  { id: 26, name: '小垃圾桶', spec: '2-4个' },
  { id: 27, name: '50#60垃圾袋', spec: '1000个' },
  { id: 28, name: '贴墙鞋架', spec: '1个' },
  { id: 29, name: '小香皂15克', spec: '200个' },
  { id: 30, name: '毛巾', spec: '35#75 150克32股软毛' },
  { id: 31, name: '一次性梳子', spec: '200把' },
  { id: 32, name: '吹风机架子', spec: '2个' },
  { id: 33, name: '电热毯', spec: '一床一块' },
  { id: 34, name: '冷热风扇', spec: '1个' },
  { id: 35, name: '悬空挂墙肥皂盒', spec: '1个' },
  { id: 36, name: '马桶刷', spec: '1把' },
  { id: 37, name: '草酸', spec: '4瓶带一个喷头' },
  { id: 38, name: '茶叶筒', spec: '1个' },
  { id: 39, name: '马桶疏通器', spec: '1个' },
  { id: 40, name: '酒精带一个喷头', spec: '一桶' },
  { id: 41, name: '床用扫灰毛刷', spec: '3把' },
  { id: 42, name: '香薰', spec: '六小瓶' },
  { id: 43, name: '浴巾', spec: '10块' },
  { id: 44, name: '鞋刷', spec: '2把' },
  { id: 45, name: '钢丝球', spec: '5个' },
  { id: 46, name: '一次性拖鞋', spec: '500双' },
  { id: 47, name: '一次性马桶垫', spec: '500个' },
  { id: 48, name: '金属杯或者纸杯', spec: '500个纸杯' },
  { id: 49, name: '刮玻璃清洁刮', spec: '长杆' },
  { id: 50, name: '消防逃生示意图', spec: '一副' },
  { id: 51, name: '挂钩', spec: '5个' },
  { id: 52, name: '瓶装矿泉水', spec: '' },
  { id: 53, name: '四位密码挂锁', spec: '2把' },
  { id: 54, name: '洗衣盆', spec: '50*20左右' },
  { id: 55, name: '小冰箱', spec: '150升左右' },
  { id: 56, name: '电磁炉', spec: '1个' },
  { id: 57, name: '微波炉', spec: '旋钮式1个' },
  { id: 58, name: '炒菜锅', spec: '1个' },
  { id: 59, name: '汤锅', spec: '1个' },
  { id: 60, name: '碗筷、锅铲', spec: '若干' },
  { id: 61, name: '直筒洗衣机', spec: '9kg' },
  { id: 62, name: '绿植', spec: '' },
  { id: 63, name: '挂画', spec: '' },
  { id: 64, name: '吸成器', spec: '一台' },
  { id: 65, name: '漏电保护空开', spec: '' },
  { id: 66, name: '热水器漏电头', spec: '' },
  { id: 67, name: '标牌', spec: '冷热水标牌6个' },
  { id: 68, name: '标牌', spec: '调好水谨防烫伤' },
  { id: 69, name: '标牌', spec: '禁止床上吸' },
  { id: 70, name: '标牌', spec: '小心地滑' },
  { id: 71, name: '标牌', spec: '提醒续订的' },
  { id: 72, name: '标牌', spec: '提醒垃圾放垃圾桶' }
];




</script>

<style scoped>
table {
  border-collapse: collapse;
}
</style>
