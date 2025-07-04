<script setup>
import foot from '@/components/foot.vue' 

import Header_menu from './components/header_menu.vue';


</script>

<template>
 <header_menu> </header_menu>
 
 <!-- <div id="app">  -->

<!-- 这种方式缓存所有列表数据 只让详情页重新获取 这是一种方式  -->
<router-view >
    
</router-view> 




 <foot/> 

<!-- </div> -->

</template>

<style >
#app{
background-color:white;
}
@media (min-width: 765px) {
  .rootmenu {
    display: none;
  }
}

@media (max-width: 700px) {
  .header-menu {
    display: none;
  }
}
</style>
