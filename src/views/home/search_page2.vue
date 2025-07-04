<template>
    <!-- <weizhi v-model:fieldValue="weizhizhi" ref="weizhiref" ></weizhi> -->
    <van-nav-bar title="邻家网-就近找" left-text="返回" @click="router.go(-1);"  left-arrow>
<template #right>
  <van-icon name="search" size="18" />
</template>
</van-nav-bar>
   
   <div >
    <van-field style="margin-bottom: 10px;" v-model="keyword" label="关键字" placeholder="请输入要查询的关键字(可不填)" @keyup.enter="handleclick" />
    <!-- <div style="display: flex; flex-wrap: wrap; margin-left: 12px; margin-bottom:15px; font-weight: bold;font-size: small;">历史搜索</div> -->
    <div style="margin-left: 12px; margin-bottom:10px; font-weight: bold;font-size: small;">历史搜索</div>
    <div style="display: flex; flex-wrap: wrap; margin-left: 5px; padding-top: 5px">
        <div style=" margin-left: 10px; padding-top: 5px" v-for="(item,index) in search_keyword_old" :key="index">
        <span @click="select_keyword(item)" style="flex-wrap: nowrap;  margin-top:5px; padding: 2px; font-size: small; background-color: rgb(215, 209, 209);"> {{ item }} </span>
        
        </div>
    
    </div>
    
   </div>
   

   <div style="margin-top:20px; border-top: 1px solid rgb(222, 212, 212)" >
    
    <!-- <city_select></city_select> -->
    <van-field style="margin-bottom: 10px;" v-model="city" label="所在城市" placeholder="请输入要查询的关键字(可不填)" @keyup.enter="handleclick" />

    <van-field style="margin-bottom: 10px;" v-model="location" label="位置"  placeholder="如: 2900 Steeles Ave E (可不填)" @keyup.enter="handleclick" />
    
    <div style="margin-left: 12px; margin-bottom:10px; font-weight: bold;font-size: small;">历史搜索</div>
    <div style="display: flex; flex-wrap: wrap; margin-left: 5px; padding-top: 5px">
        <div style=" margin-left: 10px; padding-top: 5px" v-for="(item,index) in search_location_old" :key="index">
        
        <span  @click="select_location(item)" style="flex-wrap: nowrap;  margin-top:5px; padding: 2px; font-size: small; background-color: rgb(215, 209, 209);"> {{ item }} </span>
        
     </div>
    </div>
    
   </div>

    <div style="display: flex;  justify-content: center; margin-top:20px; border-top: 1px solid rgb(222, 212, 212)" >
      <van-button style="width:50%;margin-top: 15px;" @click="search" size="small" icon="search" center type="success">查    询</van-button>
    </div>
   <!-- {{ geolocation }} -->

</template>
     
<script setup>
import { ref, watch, onMounted, defineEmits, defineProps } from 'vue';
import { useRouter,useRoute } from 'vue-router'
// import { Geolocation } from 'vue-Geolocation';
import city_select from '@/components/city_select.vue' 
const router = useRouter()
const route = useRoute()
import category  from '@/components/category.vue' 

const geolocation = ref({})
const longitude = ref('')
const latitude = ref('')

const keyword= ref('');
const location= ref('');
var search_keyword_old = ref('')
var search_location_old = ref('')
const city = ref('');
city.value = localStorage.getItem('city')
// const location = ref([])

const select_keyword = (item)=>{
    keyword.value = item

}

const select_location = (item)=>{
    location.value = item

}



const search = ()=>{
    var search_keyword2 = localStorage.getItem("search_keyword")
    var search_keyword = ''
    if (search_keyword2 !== null ){ //如果有历史查询内容，就加入现在的查询关键词
        // search_keyword = search_keyword2 ;
        var a = search_keyword2.indexOf(keyword.value)
       
        // console.log('a',a)
        if (search_keyword2.indexOf(keyword.value) ==-1 ){  
            //如果查询内容没有包含在历史内容里，这样才把这个内容加入历史内容
            search_keyword = keyword.value  + ',' + search_keyword2;
            var search_keyword3 = search_keyword.split(",");
            if (search_keyword3.length>10){
                // console.log('asdf',search_keyword3)
                search_keyword3 = search_keyword3.slice(0,10)
                search_keyword  = search_keyword3.join(",");
           
                console.log('asdf33',search_keyword3)
            }
        }
        else{  //如果历史查询有这个关键词，那么就加入这个关键词
            search_keyword =  search_keyword2;
        }
        localStorage.setItem("search_keyword",search_keyword)
        
    }
    else  //没有历史查询内容，直接将查询内容插入浏览器
    {
        if (keyword.value!==''){

            search_keyword = keyword.value
            localStorage.setItem("search_keyword",search_keyword)
        }

    }
    
    console.log('3333',keyword.value);
    const b = keyword.value;
    if (b!==''){
        localStorage.setItem("one_keyword",b)
    }



    // 获取位置的历史信息
    var search_location2 = localStorage.getItem("search_location")
    var search_location = ''
    if (search_location2 !== null){ //如果有历史查询内容，就加入现在的查询关键词
        // search_keyword = search_keyword2 ;
        var a = search_location2.indexOf(location.value)
        console.log('location',location.value)
        console.log('localstorage',search_location2)
        console.log('a',a)
        if (search_location2.indexOf(location.value) ==-1 ){  
            //如果查询内容没有包含在历史内容里，这样才把这个内容加入历史内容
            search_location = location.value  + ',' + search_location2;
            var search_location3 = search_location.split(",");
            if (search_location3.length>6){
                console.log('asdf',search_keyword3)
                search_location3 = search_location3.slice(0,6)
                search_location  = search_location3.join(",");
                console.log('asdf33',search_location3)
            }
        }
        else{
            search_location =  search_location2;
        }
        
    }
    else  //没有历史查询内容，直接将查询内容插入浏览器
    {
        search_location = location.value
        // localStorage.setItem('search_keyword',search_keyword)
    }

    if (search_location!==''){
        localStorage.setItem("search_location",search_location)
    }
    
    console.log('daaf',keyword.value)
    console.log('daaafff',location.value)
    if (location.value!==''){
        
        localStorage.setItem("one_location",location.value)
    }
    
    const url = localStorage.getItem("current_url") ;
    
    // push 是作为一个是否需要刷新的一个标志
    localStorage.setItem('push','true')


    // 这里就是获取查询的参数，然后返回查询的原网址
     router.go(-1);

}

// // 获取经纬度
const getPosition = ()=>{
    var options = {
        enableHighAccuracy: true,
        maximumAge: 1000
    };
    var self = this;
    if(navigator.geolocation){
        //浏览器支持geolocation
        navigator.geolocation.getCurrentPosition(function(position){
        //经度
        longitude.value = position.coords.longitude;
        //纬度
        latitude.value = position.coords.latitude;
        // self.loadMapApi(longitude,latitude);
        }, onError, options);
    }else{
    //浏览器不支持geolocation
    alert("浏览器不支持地理定位")
    }
}

const onError = (error) => {
    switch (error.code) {
    　　case 1:
        　　alert("位置服务被拒绝");
        　　break;
    　　case 2:
        　　alert("暂时获取不到位置信息");
        　　break;
    　　case 3:
        　　alert("获取信息超时");
        　　break;
    　　case 4:
        　　alert("未知错误");
        　　break;
　　}
}


onMounted(() => {
    
    var search_keyword=  localStorage.getItem("search_keyword")
    var search_keyword_array = []
    console.log('11', search_keyword)
    if (search_keyword!==null){
        search_keyword_array = search_keyword.split(",")
        search_keyword_old.value = search_keyword_array
        console.log(search_keyword_array[0])
        console.log('asdf2323',search_keyword_old.value)
    }
    

    var search_location=  localStorage.getItem("search_location")
    var search_location_array = []
    console.log('11', search_location)
    if (search_location!==null){
        search_location_array = search_location.split(",")
        search_location_old.value = search_location_array
        console.log(search_location_array[0])
        console.log('asdf2323',search_location_old.value)
    } 
    });

    // 暂时不能启用因为这个位置的功能需要具有https的设置网站才可以
    // getPosition();




</script>
     
<style>

</style>