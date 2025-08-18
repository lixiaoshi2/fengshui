<template>
  <div class="p-6 max-w-5xl md:mt-16 mx-auto bg-white shadow-md rounded-xl mb-16">
    <!-- 头部 -->
    <header class="max-w-5xl mx-auto px-4 py-8">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-[#f5e4d6] flex items-center justify-center text-[#5a3e2b] font-bold text-lg shadow">忆</div>
          <div>
            <h1 class="text-2xl font-extrabold text-[#5a3e2b]">忆福安 · 定制符箓</h1>
            <p class="text-sm text-[#7c5e47]">传承正一道科仪，手写专属符篆，化煞祈福、镇宅开运</p>
          </div>
        </div>
        <nav class="hidden md:flex items-center gap-6 text-sm text-[#6b4f3a]">
          <a class="hover:underline" href="#fu">服务说明</a>
          <a class="px-4 py-2 bg-[#5a3e2b] text-white rounded shadow hover:opacity-95" href="/qimingproducts">申请定制</a>
        </nav>
      </div>
    </header>

    <!-- 概述与流程 -->
    <section id="fu" class="bg-white rounded-2xl p-4 shadow-md my-6">
      <div class="flex flex-col md:flex-row items-start gap-6">
        <div class="flex-1">
          <h3 class="text-2xl font-bold text-[#4a3628]">定制符箓 — 仪式与制作说明</h3>

          <p class="mt-3 text-gray-700 leading-relaxed">
            传承正一道法科仪，根据个人八字绘制专属符篆，用于化煞镇宅、祈福安康、开运助缘等。每一符皆由道长斋戒沐浴、敬坛请神、入炁开坛后手工绘制，使用百年珍藏朱砂与针对性材料，完成敕符、盖印与七日加持。
          </p>

          <div class="mt-4 grid md:grid-cols-2 gap-4 text-gray-700">
            <div class="p-3 border rounded-lg">
              <strong class="block">材料与工艺</strong>
              <p class="text-sm">采用百年珍藏朱砂，配以敕纸、敕墨、敕笔等经仪指定材料，确保材质与仪式相符。</p>
            </div>

            <div class="p-3 border rounded-lg">
              <strong class="block">斋戒与净坛</strong>
              <p class="text-sm">书符前，道长需斋戒沐浴，以神咒静心、静口、静坛，敬天地、焚香祷告，恭请神灵入坛。</p>
            </div>

            <div class="p-3 border rounded-lg">
              <strong class="block">敕具与入炁</strong>
              <p class="text-sm">以神咒敕具（敕墨、敕纸、敕笔），调身调息，请神变神，入炁存神，使符具与神炁相通。</p>
            </div>

            <div class="p-3 border rounded-lg">
              <strong class="block">书写与加持</strong>
              <p class="text-sm">配合咒语、指诀与步法入炁注力，完成书写后进行敕符、盖印、设狱结煞等秘法；随后香火供奉并诵经加持七天以稳固法力。</p>
            </div>
          </div>

          <div class="mt-4 text-gray-700">
            <h4 class="text-lg font-semibold text-[#4a3628]">定制流程（简要）</h4>
            <ol class="list-decimal pl-5 mt-2 space-y-2">
              <li>提交资料：提供姓名、出生年/月/日/时（八字）、使用目的与联系方式。</li>
              <li>仪式沟通：与道长确认用途、禁忌与特殊需求。</li>
              <li>斋坛制作：道长斋戒沐浴、开坛书符并完成加持。</li>
              <li>交付与说明：七日加持完成后按约交付，并附使用与保存说明。</li>
            </ol>
          </div>

          <div class="mt-4 flex flex-col sm:flex-row gap-3">
            <a href="/qimingproducts" class="px-5 py-3 bg-[#5a3e2b] text-white rounded shadow">申请定制符箓</a>
            <a href="mailto:contact@nearnet.ca" class="px-4 py-3 border border-[#cfa87a] text-[#5a3e2b] rounded">发送资料咨询</a>
          </div>
        </div>

        <!-- 制符人简介 -->
        <aside class="w-full md:w-56 p-4 border rounded-lg bg-[#fffaf6]">
          <h5 class="text-lg font-semibold text-[#4a3628] mb-2">制符人 · 张宗旭</h5>
          <p class="text-sm text-gray-700 leading-relaxed">
            全真龙门二十三代弟子，承白云山正宗法脉。青年云游四海，礼谒高真大德，潜心修学二十余载。精通科仪、符法与水法，现隐修于终南山麓，潜心研修丹道。
          </p>
          <div class="mt-3">
            <p class="text-sm text-gray-600"><strong>专长：</strong>符法、科仪、风水、水法、丹道</p>
            <p class="text-sm text-gray-600 mt-1"><strong>交付：</strong>完成七日加持后邮寄或现场交付（按双方约定）</p>
          </div>
        </aside>
      </div>
    </section>

    <!-- 注意事项 -->
    <section class="bg-white rounded-2xl p-4 shadow-md my-6">
      <h4 class="text-lg font-semibold text-[#4a3628]">注意事项与伦理声明</h4>
      <ul class="list-disc pl-5 mt-3 text-gray-700 space-y-2">
        <li>符箓为宗教与仪式性物品，请按道长指示保管、安置或焚化，切勿随意处置。</li>
        <li>请勿将符箓用于违法、伤害或侵犯他人权益的用途；此类请求将被拒绝。</li>
        <li>定制前请如实告知禁忌、过敏史或特殊宗教习俗，以便仪式安排。</li>
        <li>如需国际邮寄，请提前沟通邮寄方式与关务注意事项，邮费与时间另计。</li>
      </ul>
    </section>

  </div>
</template>

<script setup>
// 仅静态展示，无脚本逻辑
</script>
