<template>
    <van-nav-bar title="萝卜保洁" left-text="返回" @click="router.go(-1);" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
      <template #title>
        <label class="block text-lg font-medium text-gray-700">萝卜家政</label>
      </template>
    </van-nav-bar>
  

    <div class="max-w-3xl mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold text-center mb-6">《分销商佣金协议》</h1>

      <p class="mb-4"><strong>甲方：</strong>家政服务平台（以下简称“平台”）</p>
      <p class="mb-6"><strong>乙方：</strong>分销商注册用户（以下简称“您”或“分销商”）</p>

      <p class="mb-6">
        为明确平台与分销商之间在推广与佣金分配方面的权利义务，特制定本协议。您在注册成为平台分销商时，即表示您已阅读并同意以下内容：
      </p>

      <h2 class="text-xl font-semibold mb-2">第一条 分销商定义与职责</h2>
      <p class="mb-4">
        分销商是指通过平台注册并同意本协议，利用自身渠道发展消费客户的个人或单位。
      </p>
      <p class="mb-6">
        分销商应确保推广行为真实有效，不得以欺诈、虚构交易等方式获取佣金。
      </p>

      <h2 class="text-xl font-semibold mb-2">第二条 佣金发放机制</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>分销商佣金来源于您推广产生的有效订单；</li>
        <li>平台将为每笔订单计算应发佣金，记录在系统中；</li>
        <li>佣金计算规则如下（示例）：</li>
        <ul class="list-disc pl-6">
          <li>分销商订单佣金比例：20%</li>
          <li>区域分销商上级佣金比例：10%</li>
        </ul>
        <li>佣金满 <strong>100元</strong> 时进入结算周期，平台每月15日之前发放上月佣金；不满100元的本期暂不结算，慢100元以后一并结算</li>
        <li>发放方式：银行卡、微信、平台余额等方式，具体以系统设置为准。</li>
      </ul>

      <h2 class="text-xl font-semibold mb-2">第三条 税务处理</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>分销商应自行依法申报并缴纳因获得佣金产生的税费；</li>
        <li>平台不代扣代缴个税，但可按要求提供佣金明细报表；</li>
        <li>若根据政策需要，平台保留依法代扣个税的权利。</li>
      </ul>

      <h2 class="text-xl font-semibold mb-2">第四条 违规与终止条款</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>若经发现存在虚假交易、恶意刷单、干扰平台运营等行为，平台有权冻结或取消佣金，并终止合作；</li>
        <li>分销商可随时提出终止合作，平台将结算截至当日的佣金。</li>
      </ul>

      <h2 class="text-xl font-semibold mb-2">第五条 协议的更新与说明</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>平台有权对本协议条款进行调整，更新后将在平台公示并通知用户；</li>
        <li>若您在新条款发布后继续使用推广功能，即视为您已接受更新内容。</li>
      </ul>

      <p class="mb-4"><strong>甲方（平台）：</strong>家政服务平台</p>
      <p class="mb-6"><strong>乙方（分销商）：</strong>（您的平台用户）</p>

      <p class="mb-6">
        <strong>协议确认方式：</strong><br />
        请在注册页面或个人中心勾选“我已阅读并同意《分销商佣金协议》”，并记录确认时间。
      </p>
    </div>



    
  </template>
  <script setup>
  import { useRouter, useRoute } from 'vue-router'

  const router = useRouter()
  const route = useRoute()

    </script>