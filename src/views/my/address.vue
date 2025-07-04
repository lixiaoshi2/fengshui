<template>
    <van-nav-bar title="地址管理" left-text="返回" @click=" router.go(-1);" left-arrow>
        <template #right>
            <van-icon name="search" size="18" />
        </template>
    </van-nav-bar>

    <div class="mycontainer">

        <div>
            <div style="display: flex;  justify-content: center; /* 在主轴上居中对齐 */ ">
                <van-button type="primary" size="small" @click="showPopupHandler">添加新地址</van-button>
            </div>


            <van-popup v-model:show="showPopup" style="padding: 20px;">

                <van-form  style="margin-bottom:10px; margin-top:10px;">
                    <!-- <div style="margin-left: 15px; font-weight: bold;"> 添加地址</div> -->
                    <van-field v-model="name" name="name" label="收件人姓名" placeholder="请输入收货人姓名"
                        :rules="[{ required: true, message: '请输入收件人姓名' }]" />

                    <van-field v-model="phone" name="phone" label="收件人电话" placeholder="请输入收货人电话"
                        :rules="[{ required: true, message: '请输入收件人电话' }]" />
                    <van-field v-model="address" name="address" label="详细地址" placeholder=""
                        :rules="[{ required: true, message: '请输入您的地址' }]" />
                    <!-- <weizhi v-model:fieldValue="weizhi2"></weizhi> -->
                    <van-field v-model="city" name="city" label="城市" placeholder=""
                    :rules="[{ required: true, message: '请输入城市' }]" />

                    <van-field v-model="postcode" name="postcode" label="邮编" placeholder="请输入邮编"
                        :rules="[{ required: true, message: '请输入邮编' }]" />

                    <div style="display: flex;        justify-content: center; /* 水平居中 */    ">
                        <van-button @click="add_address()" style="width: 100px;height: 30px; margin: 10px;" plain
                            size="small" type="success">添加地址</van-button>
                        
                    </div>
                </van-form>


                <!--  -->
                
            </van-popup>
        </div>

        <!-- <van-cell style="  display: flex; font-size: small;" title="地址管理" /> -->
        <!-- <div style="height: 10px;"></div> -->
        
        <div v-for="(item) in responseData" :key="item.id">
        <van-row>
            <div class="name_phone" @click="chooseaddr(item)">
                <div style="font-size: 14px;">{{item.name}}</div>
                <div style="margin-left: 15px;">{{item.phone}}</div>
            </div>
            <div  @click="chooseaddr(item)" class="dizhi">
                <div style="font-size: 14px;">{{ item.address }},{{ item.county }},{{ item.city }},{{ item.province }}</div>

            </div>
            <div class="caozuo">
                <div>
                    <van-checkbox @click="is_default_handle(item.id)" v-model="item.is_default">默认</van-checkbox>
                </div>
                <div style="margin-right: 15px;">
                    <van-button size="small" @click="del_address(item.id)" style="margin-right: 8px; ">删除</van-button>
                    <!-- <van-button size="small" @click="change_address(item.id)">修改</van-button> -->
                </div>
            </div>
        </van-row>
        <div style="height: 10px;"></div>
    </div>
        



        <van-space :size="5"></van-space>

    </div>
    

</template>
<script setup>




import https from '@/utils/request.js';
import { showToast,Popup  } from 'vant';
// import weizhi from '@/views/activity/mycomponent/weizhi.vue';

//  注意这里导入的是我自己的配置文件，所有引入都必须加“”，然后还要@/
// config 代表所有的内容，就可以在里面不用一一导入

import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
let responseData = ref({});
const user_id = ref('');
const name = ref('');
const address = ref('');
const city = ref('');
const state = ref('');
const phone = ref('');
const checked = ref(true)
const country = ref('');
const postcode = ref('');
const weizhi2 = ref('');
const editflag = ref(0);
const address_id = ref('');

//////////////////////////////
const chosenAddressId = ref('1');
var list2 = ref([]);

// //////////// 新增地址
const add_address = (values) => {
    showPopup.value = false; // 关闭修改窗体
    console.log('values', values);
    // var weizhi = weizhi2.value;
    // console.log('44', weizhi);
    // var index = weizhi.indexOf('/', 0);
    // console.log(index);
    // var state = weizhi.substring(0, index);
    // console.log(state);
    // var city = weizhi.substring(index + 1, weizhi.length);
    console.log('city', city);
    const user_id = localStorage.getItem("user_id");
    var values2 = {
        "phone":phone.value,
        "name": name.value,
        "address": address.value,
        // "province": 'canada',
        "city": city.value,
        "county": "any",
        "postcode": postcode.value ,
        "user": user_id,
    }

    //   /my/setting/address
    let url = '/api/user/address/'+user_id+'/'
    console.log('url',url)
    https.post(url, values2).then(response => {
        // console.log('asdfas555111');
        console.log(response);
        // showToast('添加地址成功');
        // 把获取的详情添加到本地存储
        // router.push('/address/')
        window.location.reload();
        console.log('重新获取地址')

        // this.$router.push({ path: '/user_login' });
    }).catch(error => {
        console.log('需要添加用户详细信息');
        showToast('请填写用户详细信息，我的/个人详细信息');
        // showDialog("")
        console.error(error);
        // throw new Error('中断');
        // showToast('请重新登录');
    });
}

    // 修改地址
const change_address = (item, index) => {
    console.log('item', item);
    showToast('请在上面修改地址');
    editflag.value = 1;
    address_1.value = item.wanzheng.address_1;
    name.value = item.wanzheng.name;
    postcode.value = item.wanzheng.postcode;
    const user_id2 = localStorage.getItem("user_id");
    city.value = item.wanzheng.city;
    state.value = item.wanzheng.state;
    weizhi2.value = item.wanzheng.state + '/' + item.wanzheng.city;
    address_id.value = item.wanzheng._id;

}

// 点击上面的编辑按钮，第一个是在下面编辑
const edit_address = () => {
    const user_id2 = localStorage.getItem("user_id");
    var values2 = {
        "user_id": user_id2,
        "name": name.value,
        "address_1": address_1.value,
        "address_2": "Suite D",
        "city": city.value,
        "_id": address_id.value,
        "state": state.value,
        "country": "CA",
        "postcode": postcode.value

    }
    console.log('value2', values2);
    //   /my/setting/address
    https.put('/my/setting/address', values2).then(response => {
        console.log('asdfas555111');
        console.log(response);
        // showToast('添加地址成功');
        // 把获取的详情添加到本地存储
        router.push('/address/')
        // this.$router.push({ path: '/user_login' });
    }).catch(error => {
        console.log('报添加地址成功出错了');
        console.error(error);
        // throw new Error('中断');
        // showToast('请重新登录');
    });
}

const del_address = (address_id) => {
    console.log('addressid ', address_id);
    const user_id2 = localStorage.getItem("user_id");
    for (let i = 0; i < responseData.value.length; i++) {
        // console.log('i:',i)
        if(responseData.value[i].id==address_id){
            responseData.value.splice(i, 1) 
        }      
    }
    responseData.value.splice(address_id, 1);
  
    https.delete('api/user/address/'+address_id+'/').then(response => {
        console.log('')
        // showToast('删除成功');
        // 把获取的详情添加到本地存储

        // router.push({ path: '/user_login' });
    }).catch(error => {
        console.log('删除地址出错了');
        console.error(error);

        // showToast('请重新登录');
    });
}

const is_default_handle = (id) => {
    console.log('addressid ', id);
  
    for (let i = 0; i < responseData.value.length; i++) {
        // console.log('i:',i)
            if(responseData.value[i].id==id){
              
                responseData.value[i].is_default=true
            }
            else{
                responseData.value[i].is_default=false
            }
            
    }
    console.log('asdf33',responseData.value)


    // const user_id2 = localStorage.getItem("user_id");
    // let value = {
    //     "_id": address_id,
    //     "user_id": user_id2
    // }
    https.put('/api/user/address/'+id+'/default/').then(response => {
        console.log('')
       

        // router.push({ path: '/user_login' });
    }).catch(error => {
        console.log('报名出错了');
        console.error(error);

        // showToast('请重新登录');
    });
}

var fulladdr2 = ref('')
var username2 = ref('')
var userphone2 = ref('')

// 选择一个地址给上一个页面用
const chooseaddr = (item)=>{
    // getaddr 这个参数定义了是否是从需要地址的页面来
    if(localStorage.getItem("getaddr")==1){
        username2.value = `${item.name}`
        fulladdr2.value = `${item.address},${item.city}`
        userphone2.value = `${item.phone}`
        localStorage.setItem("username2",username2.value)
        localStorage.setItem("fulladdr2",fulladdr2.value)
        localStorage.setItem("userphone2",userphone2.value)
        // 设置完了以后需要将这个参数变为0
        
        router.go(-1);
    } 
}

onMounted(() => {
    console.log('时间mouted');

    user_id.value = localStorage.getItem("user_id");
    console.log('user_id',user_id.value)
   
//     // 获取用户地址列表不需要传用户id，这个信息在token里可以直接获取
    https.get('/api/user/addresslist/').then(response => {
        
        console.log('userinfo', response);
        
        responseData.value = response;
        console.log("responseData",responseData.value)
     
        for (let i = 0; i < response.length; i++) {
            var item = {}
            item.id = response[i].id;
            item.tel = response[i].phone;
            item.name = response[i].name;
            // item.wanzheng = response[i];
            item.address = response[i].address_1 + ' ' + response[i].city + ' ' + response[i].state;

            list2.value.push(item);
            // list2.value[i].address = 
            // list2.value[i].tel = response[i].postcode;
            // list2.value[i].name = response[i].name;

        }
        // console.log('userinfo', response.default_address);
        // name_moren.value = response.default_address.name;
        // address_1_moren.value = response.default_address.address_1;
        // console.log('namemoren', name_moren.value);
        // city_moren.value = response.default_address.city;
        // console.log('namemoren2', city_moren.value);
        // state_moren.value = response.default_address.state;
        // console.log('namemoren3', state_moren.value);
        // postcode_moren.value = response.default_address.postcode;
        // console.log('namemoren4', postcode_moren.value);
        // weizhi2_moren.value = response.default_address.state + '/' +response.default_address.city;
        // // list = list2.value;
        // console.log('weizhi2_moren',weizhi2_moren.value);
    }).catch(error => {
        console.log('出错了2');
        console.error(error);
        showToast('请重新登录');
    });
    

});

const showPopup = ref(false);
const formData = ref(''); // 用于存储修改的内容

const showPopupHandler = () => {
    showPopup.value = true;
};

const saveChanges = () => {
    // 处理保存修改的逻辑
    console.log('保存的修改内容:', formData.value);
    showPopup.value = false; // 关闭修改窗体
};

</script>

<style scoped>
.mycontainer{
    background-color: #F4F2F2;
}

:deep .van-address-list__bottom {
    display: none;
}

.van-radio__icon {
    display: none;
}
:deep .van-checkbox__label{
    font-size: 14px;
}

.name_phone{
    padding-left:15px;
    padding-top: 10px; 
    display: flex; 
    width: 100%;
     background-color: #fff;
     justify-content: flex-start; 
      align-items: center;size:8px;
      font-family:'Courier New', Courier, monospace;
}
.dizhi{
    padding-left:15px;
    padding-top: 5px;
     display: flex; 
     width: 100%; 
    background-color: #fff;
    justify-content: flex-start;
      align-items: center;
      size:8px;
      font-family:'Courier New', Courier, monospace;
}
.caozuo{
    padding-left:15px;padding-top: 10px; 
    padding-bottom: 8px; 
    display: flex; 
    width: 100%; 
    background-color: #fff;
    justify-content:  space-between; 
     align-items: center;size:8px;
     font-family:'Courier New', Courier, monospace; 
}
</style>