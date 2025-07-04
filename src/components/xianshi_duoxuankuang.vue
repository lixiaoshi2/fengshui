<template>
    <!-- <van-checkbox-group v-model="result" >
    <van-checkbox name="a">复选框 a</van-checkbox>
    <van-checkbox name="b">复选框 b</van-checkbox>
  </van-checkbox-group> -->
  <div style="display: flex;">
  <van-field style="width:95%;margin-right: -10px;" name="flags" label="接龙上显示信息">
    <template #input>
      <van-checkbox-group style="" v-model="flags" direction="horizontal">
          <van-checkbox name="a">所有人可见</van-checkbox>
          <van-checkbox name="b">显示性别</van-checkbox>
          <van-checkbox name="c">显示网名</van-checkbox>
          
      </van-checkbox-group>
    </template>
  </van-field> 
  <van-icon style="display: flex;  margin-left:-30px; align-items: center; " size="20" @click="btn1" name="question" />
</div>
<div style="display: flex;">
  <van-field style="width:95%;margin-right: -10px;" name="flags" label="接龙上收集信息">
            <template #input>
              <van-checkbox-group v-model="flags" direction="horizontal">
                  
                  <van-checkbox name="d">收集邮件</van-checkbox>
                  <van-checkbox name="e">收集电话</van-checkbox>
                  <van-checkbox name="f">收集邮编</van-checkbox>
                  <van-checkbox name="g">收集地址</van-checkbox>
              </van-checkbox-group>
            </template>
  </van-field> 
  <van-icon style="display: flex;  margin-left:-30px; align-items: center; " size="20" @click="btn2" name="question" />
</div>

  <!-- {{ flags }} -->
  </template>
  
  <script>
  import {showDialog} from 'vant'
  export default {
    data() {
          return {
            // flags: ['a', 'b'],
            flags: [],
            b:[],
          };
    },
    methods:{
      btn1(){
        showDialog({
        message: '   这部分信息是接龙是可以让其他人看到的信息'
      }).then(() => {
        // on close
      });
      },
      btn2(){
        showDialog({
        message: '   这部分信息是您想收集参加接龙者的信息，方便活动中联系'
      }).then(() => {
        // on close
      });
      },
    },
    props: {
      passDataToChild: [],
    
    },
    mounted() {
      console.log('进入多选框flags组件')
    //   // 如果有浏览器里有活动分类，那么就需要获取浏览器中保存的过去填写过的数据

    const a = localStorage.getItem("flags")
    var b = a.split(',')  //从localstore中返回的是字符串，而不是数组，需要转换成数组
    // console.log('b', b)
    if (a !== "undefined"){
      console.log('有数据');
      this.flags = b;

    }
    //  this.flags = this.passDataToChild;
    //  console.log('asdf11',this.flags)
    // const a = localStorage.getItem("flags")
    
    // console.log('a', a)
    // if (a !== "undefined"){
    //   console.log('有数据');
    //   this.flags = a;
    // }
    
   

    },
    
  }
  </script>
  
  <style >
  .van-checkbox{
      width: 40%;
      margin-bottom: 6px;
  }
  .van-field__body{
    width:95%;
  }
  </style>