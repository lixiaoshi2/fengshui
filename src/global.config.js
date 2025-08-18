// 这个文件设置了本程序的配置文件



const config = {
  whiteListApi:[
    "/",
    "/act_list",
  ],



    ceshi:'1',  // 设置是否处于开发状态，通过设置这个参数可以直接不用修改里面的代码 1 代表测试状态
    
    // stripe 线上支付的公匙放在客户端
    // 测试的
    // strip_pk:'pk_test_51QSNgTLrY4OYG7KK5xOq3kNJzFC78ka4NBvLuLU8pmOOTMDUO1m9Qt2Aw7ze34tEn3zjXZPY4lDShAcgS4FDkPlb00aDuNUh2H',
    // strip_pk:'pk_live_51QSNgTLrY4OYG7KKhv7jjjOvLOazy5Jn1DmD8rsQfAGDKowdbynLK7hE4T03PDZdnesLfD1aU6zuU5UusiYUNAdj00P9JwfICd',


    backendserver1:'http://192.168.1.127:8000/',

    backendserver2:'https://www.nearnet.ca/api/',
  
    backendserver:'',
  


  // 我现在要放数组工作数组进去
  // 定义服务类型与价格的映射
  servicePrices : {
    '民宿保洁': 100,
    '专业保洁': 30,
    '保洁做饭': 100,
    '单独保洁': 100,
    '老病护理': 100,
    '孩子照顾': 100,
    '月嫂保姆': 100,
    '接送孩子': 30,
    '钟点工': 30,
    '钟点工': 100,
    '邻里互助': 30,
    

    '水电维修': 30,
    '防水堵漏': 30,
    '家电维修': 30,
    '装修相关': 100
    

  }


};

// // 根据协议动态设置 backendserver
if (window.location.protocol === "http:") {
  console.log('访问的协议是http');
  // 这是在本地服务器
  config.backendserver = "http://192.168.1.127:8000/";
} else {
  // 这是其中一台服务器
  config.backendserver = "https://www.nearnet.ca/api/";
  // 这是测试服务器，这儿需要二选一
  // config.backendserver = "https://www.mynextdoor01.space/api/";
}

export default config ;


