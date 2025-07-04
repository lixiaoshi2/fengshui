<template>
  <van-field 
     v-model="huodongfenlei" 
     is-link 
     readonly 
     label="分类" 
     placeholder="请选择分类"
      @click="showfenlei" 
      />
      
     <van-popup v-model:show="showfenleivalue" round position="bottom">
       <van-cascader v-model="cascaderFenleiValue" title="请选择分类"
        :options="fenleioptions" 
       @close="showfenleivalue = false " @finish="onFenleiFinish" />
     </van-popup>
 
</template>

<script>
export default {
    data() {
     return {
    
       huodongfenlei:'',
       cascaderFenleiValue:'',
       showfenleivalue:false,
       fenleioptions: [
         {
           text: '野营',
           value: '330000',
         },
         {
           text: '钓鱼',
           value: '320000',
         },
         {
           text: '野炊',
           value: '310000',
         },
       ],
      
     };
   },
   methods: {
   
     ///////////////////////////////活动类别处理函数
     onFenleiFinish({ selectedOptions }) {
       this.showfenleivalue = false;
       this.huodongfenlei = selectedOptions.map((option) => option.text).join('/');
      //  console.log('活动分类:',this.huodongfenlei)
       this.$store.commit('tempdata2/setdata1',this.huodongfenlei)
     },
     // 这个用来控制位置选择器的显示，单击后显示
     showfenlei(){
       this.showfenleivalue = true;
       console.log('显示分类')
     },

   },
}
</script>
