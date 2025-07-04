let userFunc = {};

userFunc.generateRandomCode = function() {

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomCode = '';

    for (var i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomCode += characters.charAt(randomIndex);
    }
    // console.log('yunxingle ')
    // console.log('asdf', randomCode)
    return randomCode;

        
}

	//用户使用的函数 https://article.itxueyuan.com/rxpg9o 如何保存state 
userFunc.saveLocalstorage = function( email,gender,user_id,username,token,refresh) {
    console.log('子函数开始工作')
    localStorage.setItem("email",email);
    localStorage.setItem("gender",gender);
    localStorage.setItem("user_id",user_id);
    localStorage.setItem("token",token);
    localStorage.setItem("refresh",refresh);
    localStorage.setItem("username",username);

}




userFunc.saveEventLocalstorage = function( huodongfenlei,title,detail,cost,phone,quote,lead_days,days,flags,u_name,address_1, postcode,weizhi,shijian ) {
    console.log('saveEventLocalstorage子函数开始工作');
    shijian = shijian.substring(0,10);
    localStorage.setItem("huodongfenlei",huodongfenlei);
    localStorage.setItem("title",title);
    localStorage.setItem("detail",detail);
    localStorage.setItem("cost",cost);
    localStorage.setItem("phone",phone);
    localStorage.setItem("quote",quote);
    localStorage.setItem("lead_days",lead_days);
    localStorage.setItem("days",days);
    localStorage.setItem("flags",flags);
    localStorage.setItem("u_name",u_name);
    localStorage.setItem("address_1",address_1);
    localStorage.setItem("postcode",postcode);
    localStorage.setItem("weizhi",weizhi);
    localStorage.setItem("shijian",shijian);

}
// 从一个值知道复选框的a b 等值是什么
userFunc.computeflags = function(b){
    var d = 0;
    console.log(b)
    if(b.includes('a')){
        console.log("a该值在数组中");
        d = d + 1;
        console.log('d',d)
    } 
   if(b.includes('b')){
        console.log("a该值在数组中");
        d = d + 2;
        console.log('d',d)
    } 
   if(b.includes('c')){
        console.log("a该值在数组中");
        d = d + 4;
        console.log('d',d)
    } 
   if(b.includes('d')){
        console.log("a该值在数组中");
        d = d + 8;
        console.log('d',d)
    } 
   if(b.includes('e')){
        console.log("a该值在数组中");
        d = d + 16;
        console.log('d',d)
    } 
   if(b.includes('f')){
        console.log("a该值在数组中");
        d = d + 32;
        console.log('d',d)
    } 
    return d;
}

// 从一个flags值知道 需要获取什么信息
userFunc.flagsTotext = function(b){
    var text ='';
    if ((b/64)>=1){
        text = text + '地址 ';
        b = b-64;
    }
    if ((b/32)>=1){
        text = text + '邮编 ';
        b = b-32;
    }
    if ((b/16)>=1){
        text = text + '电话 ';
        b = b-16;
    }
    if ((b/8)>=1){
        text = text + '电子邮件地址 ';
        b = b-8;
    }
   
    
    return text;
}

userFunc.computeflags2 = function(b){
    var flags =[];
    if ((b/64)>=1){
        flags.unshift('g');
        b = b-64;
    }
    if ((b/32)>=1){
        flags.unshift('f');
        b = b-32;
    }
    if ((b/16)>=1){
        flags.unshift('e');
        b = b-16;
    }
    if ((b/8)>=1){
        flags.unshift('d');
        b = b-8;
    }
    if ((b/4)>=1){
        flags.unshift('c');
        b = b-4;
    }
    if ((b/2)>=1){
        flags.unshift('b');
        b = b-2;
    }
    if ((b/1)>=1){
        flags.unshift('a');
        b = b-1;
    }
    
    
    return flags;
}

// 将字符串和数字分开

userFunc.separateLettersAndNumbers = function(str){
    const letters = str.match(/[a-zA-Z]+/g) || []; // 匹配字母
    const numbers = str.match(/\d+/g) || []; // 匹配数字

    return {
        letters: letters.join(''), // 将匹配到的字母数组拼接成字符串
        numbers: numbers.join('') // 将匹配到的数字数组拼接成字符串
    };

}


// 查看通过分仓获取中心仓的函数
import config from '@/global.config.js'

userFunc.findCentralWarehouse = function(subWarehouse) {
    // 定义一个函数来查找分仓对应的总仓
    console.log(config.warehouseAssociations)
    // 使用 for 循环遍历 warehouseAssociations 数组
    for (let i = 0; i < config.warehouseAssociations.length; i++) {
      // 获取当前的关联对象
      const association = config.warehouseAssociations[i];
      
      // 检查当前关联对象的 subWarehouse 是否等于传入的 subWarehouse
      if (association.subWarehouse === subWarehouse) {
        // 如果找到匹配的分仓，返回对应的总仓
        return association.centralWarehouse;
      }
    }
    
    // 如果遍历完数组没有找到匹配的分仓，返回 null 表示没有找到
    return null;
  }
  

//   // 测试查找函数
//   const subWarehouseToFind = '505 Clark Dr, Vancouver, BC';
//   const centralWarehouse = findCentralWarehouse(subWarehouseToFind);




// 返回了userFunc,这个userFunc相当于一个对象，包含了很多函数
export default userFunc;

