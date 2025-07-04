
<template>
  <van-nav-bar title="我的发布" left-text="返回" @click=" router.go(-1);" left-arrow>
<template #right>
  <van-icon name="search" size="18" />
</template>
</van-nav-bar>

<div style="color:brown; background-color: white; font-size: small;margin-left: 10px;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
  发布成功后，请根据提示付款**需要点击但不用支付**，然后点击**上线**，如果想要中间不显示您的发布，请点击下线，付款后，平台不提供任何形式的退款，请谨慎付款。
</div>
    <van-list style="margin-bottom: 50px;">
      
      <van-cell class="custom-cell" v-for="(item,index) in listdata2" :key="item.id">
          <template #title>
            <span @click="btn_detail(item.name,item.post_id)" style="font-weight: bold;">{{ item.title }}   id:{{ item.post_id }}</span> 
            <div style="color: red;"> （请点击支付，但不用真的支付,接着点击上线）  </div>
            <div class="container">
              <div class="item">
                <div style="font-size: 12px; color: rgb(255, 0, 0);" v-if = "item.is_paid ==false ">未支付 </div>
                <div style="font-size: 12px; color: rgb(76, 175, 80);" v-else>已支付</div>
              </div>
              <div class="item">
                <div style="font-size: 12px; color: rgb(76, 175, 80);" v-if = "item.if_offline ==false ">已上线 </div>
                <div style="font-size: 12px; color: rgb(255, 0, 0);" v-else>未上线</div>
              </div>
              <!-- <dir> {{ formatDate(item.postdate)   }}</dir> -->
              <div style="margin-left: 15px;"><span>发布时间：</span> {{  item.postdate.substring(0, 10)  }}<span> </span></div>

            </div>
          </template>
          <template #label>
           
           <span> <van-button style="width: 14%;height: 30px; margin: 10px;" plain size="small" @click="btn_update(item.name,item.post_id)" type="primary">编辑</van-button></span>
           <span> <van-button style="width: 14%;height: 30px; margin: 10px;" plain size="small" @click="btn_pay(item.id,item.post_id,item.title,item.name)" type="primary">付费*</van-button></span>
           <span> <van-button style="width: 14%;height: 30px; margin: 10px;" plain size="small" @click="showDialog_offline(item.id,item.name,item.post_id,index)" type="primary">下线</van-button></span>
           <span> <van-button style="width: 14%;height: 30px; margin: 10px;" plain size="small" @click="showDialog_online(item.id,item.name,item.post_id,index)" type="primary">上线*</van-button></span>     
           <span> <van-button @click="showDialog_delete(item.id)" style="width: 14%;height: 30px; margin: 10px;"  plain size="small" type="danger">删除</van-button>  </span>
          </template>
      </van-cell>

    </van-list>
   
</template>

<script setup>
import axios from 'axios';
import config from '@/global.config.js'
import md5 from 'js-md5'
// import apiFun from '@/utils/api.js'
import https from '@/utils/request.js';
import { useStore } from 'vuex'
import { showToast ,showConfirmDialog, showDialog} from 'vant';
import { ref, onMounted, computed,reactive,onErrorCaptured } from 'vue';
import textEditor  from "@/components/textEditor.vue"  
import weizhi from '@/components/weizhi.vue'


var listdata2 = ref([]);

import { useRouter,useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
// event_id.value = route.query.id;
const istrue = ref(true)
const btn_detail = (name,id)=>{
  console.log('name11', name)
  router.push({
    path: '/' +name +'_detail/'+id, 
    // query: {
    //   id
    // }
  });

    console.log('url22:',name +'_detail')
};

// postbiao_id是post表里的id，fenleibiao_id是分类表里的id
const btn_pay = (postbiao_id,fenleibiao_id,title,name) =>{
  let url = 'order_add/?fenleibiao_id=' + postbiao_id +'&fenleibiao_id='+fenleibiao_id+'&title='+title 
  router.push({
    path: 'order_add',
    query: {
      "postbiao_id":postbiao_id,
      "fenleibiao_id":fenleibiao_id,
      "title":title,
      "fenlei_name":name,

    }
  });

}

const btn_update = (name,id) => {
  console.log(name)
 
  router.push({
    path: '/' +name +'_update'+'/'+id, 
  //   query: {
  //     id
  //   }
 });
 
}
// btn_del(item.id)
const btn_del = (id) => {
  console.log('删除的消息', id)
 
  https.delete(('/api/user/my_post/del/'+ id + '/')).then(response => {
    // console.log('获取我的发布');
    // console.log(response);
    // 这段代码非常有意思，它把
    listdata2.value = listdata2.value.filter(item => item.id !== id);
    
    // listdata2.value = response;
    // console.log('listdata2',listdata2.value)
   
  }).catch(error => {
    console.log('删除发布的信息出错');
    console.error(error);
    showToast('请重新登录');
  });
}

const btn_offline =(id,fenlei_name,fenlei_table_id,index)=>{
  console.log("开始处理下线的过程")
  https.put(('/api/user/my_post/set_offline/'+ id + '/?fenlei_name='+fenlei_name+'&fenlei_table_id='+fenlei_table_id)).then(response => {
    // console.log('获取我的发布');
    // console.log(response);
    // 这段代码非常有意思，它把
    showDialog({message:'尊敬的客户，您的信息已经下线'})
    console.log('asdf22', listdata2.value[index])
    listdata2.value[id].if_offline = true
  }).catch(error => {
    console.log('出错了2');
    console.error(error);
    // showToast('请重新登录');
  });

}
const showDialog_offline = (id,fenlei_name,fenlei_table_id,index) => {
  //  console.log('asdfe3')
      showConfirmDialog({
      // title: '标题',
      message:
        '请确认您想下线您的发布内容，您的内容将保留在数据库，但不会被显示，当您想重新显示的话，请点击上线 '   })
      .then(() => {
        btn_offline(id,fenlei_name,fenlei_table_id,index)
        listdata2.value[index].if_offline = true
      })
      .catch(() => {
        // on cancel
        console.log('下线处理错误')
      });
  }




const btn_online =(id,fenlei_name,fenlei_table_id,index)=>{
  console.log("开始处理下线的过程")
  https.put('/api/user/my_post/set_online/'+ id + '/?fenlei_name='+fenlei_name+'&fenlei_table_id='+fenlei_table_id).then(response => {
    // console.log('获取我的发布');
    // console.log(response);
    if (response=='update success'){
      showDialog({message:'上线成功'})
      // console.log('listdata2',listdata2.value)
      console.log('id', listdata2.value[index].id)
      listdata2.value[index].if_offline = false

    }
    else{
      showDialog({message:'错误：您的费用到期了，先付费再上线'})
    }

    // 这段代码非常有意思，它把
  }).catch(error => {
    console.log('出错了2');
    console.error(error);
    // showToast('请重新登录');
  });

}

const showDialog_online = (id,fenlei_name,fenlei_table_id,index) => {
  //  console.log('asdfe3')
      showConfirmDialog({
      // title: '标题',
      message:
        '如果你发布的内容已付费，并且处于有效期，您发布的内容上线后将公开显示。 '   })
      .then(() => {
        btn_online(id,fenlei_name,fenlei_table_id,index)
        
      })
      .catch(() => {
        // on cancel
        console.log('上线处理错误')
      });
  }

  const showDialog_delete = (id) => {
  //  console.log('asdfe3')
      showConfirmDialog({
      // title: '标题',
      message:
        '您是否确定删除此发布信息，如果删除将不能被恢复！！ '   })
      .then(() => {
        btn_del(id)
        
      })
      .catch(() => {
        // on cancel
        console.log('上线处理错误')
      });
  }


  onErrorCaptured((error, instance, info) => {
    console.log('from Child', error, instance, info)
    console.lot('捕捉到错误')
})



onMounted(() => {

// const user_id = localStorage.getItem("user_id");
// console.log('userid', user_id)
  https.get(('/api/user/my_post/list/')).then(response => {
    // console.log('获取我的发布');
    // console.log(response);
    listdata2.value = response;
    // console.log('listdata2',listdata2.value)
  

  }).catch(error => {
    console.log('出错了2');
    console.error(error);
    showToast('请重新登录');
  });
}
);

</script>

<style scoped>
   .container {
            display: flex;
            /* 可选：让子元素水平居中 */
            /* justify-content: space-between;  */
            /* 可选：让子元素垂直居中 */
            align-items: center;
        }
        .item {
            /* padding: 10px; */
            margin: 5px;
            /* border: 1px solid #ccc; */
        }
</style>
