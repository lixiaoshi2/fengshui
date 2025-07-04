import config from '@/global.config.js'
//设置个对象，就不用一个个暴露了，直接暴露对象
let funcs = {};

/* 获取列表 */
//查询列表，详情就是get
/* /api/getlist是请求接口地址，有http.js里面的Ip加上，如：http:192.168.0.1:9090//api/getlist  */
// apiFun.getActiveList = function(params) {
// 	return https.get('/api/activitys/getactivities', params)
// }
//获取用户的url,categorys是global.config.js定义的分类，其中记载了所有的分类对应的接口地址
// searchText 是要查找的内容在这个分类表里的位置
funcs.getcategory_url = function(categories, searchText) {
    for (const category of categories) {
        for (const item of category) {
            if (item.text === searchText) {
                return item;
            }
        }
    }
    return null;
	
}

funcs.formatDate = function(isoString) {

  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  // console.log('hour',hours)
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};


// 通过分类名获取详情页地址
funcs.getcategory = function(categories, searchText) {
  for (const category of categories) {
      for (const item of category) {
          if (item.text === searchText) {
              return item;
          }
      }
  }
  return null;
}

funcs.getcategory_url2 = function(url) {
  const match = url.match(/\/(\w+)_detail\/\d+/);

if (match) {
    console.log(match[1]); // 输出: conditioner
    return match[1]
} else {
  return null;
}
  
}


// 通过后端传来的nexturl获取pageNum
funcs.getpageNum = function(nexturl) {
  const regex = /[?&]page=(\d+)/;
  const match2 = nexturl.match(regex);

  if (match2) {
    const pageValue = match2[1];
    return pageValue  // 输出: 3
  } else {
    console.log("Page parameter not found");
    return ''
  }
  // return null;

}

// 获取url的数字部分，如果有数字说明是内网地址不需要更改http为https
funcs.getUrlIp = function(listNextUrl) {
  var ipPart='';
   var match;
   if (listNextUrl !== "null") {     //如果
     console.log('不是null进入此处')
     const ipPattern = /http:\/\/(\d+)\.\d+\.\d+\.\d+/;
     match = listNextUrl.match(ipPattern);
    // 如果有数字就不修改地址如果是域名就修改
    if (match) {
        ipPart = match[1];
        console.log(ipPart); // 输出 "192"
        
        return listNextUrl
    } else {
        // 有域名，修改地址
        listNextUrl = listNextUrl.replace('/api/', '/api/api/');
        // 查看是否已经是https，如果是就不用再改变了，如果不是就修改成https，用gunicorn会直接生成https
        const ishttps = listNextUrl.includes('https')
        if (!ishttps) {
          console.log('不是https，此时需要修改http为https')
          listNextUrl = listNextUrl.replace('http','https')
        }
       
        console.log("没有找到匹配的IP地址部分");
        return listNextUrl
    }
  }

 

}



funcs.extractCategory = function(url) {
  const regex = /\/(\w+)_list\//;
  const match = url.match(regex);
  if (match && match[1]) {
      return match[1];
  }
  return null;
}

// 计算指定时间和今天的时长
funcs.formatDate = function(datetimedata) {
  let dateformat = datetimedata.substring(0, 10)

  return dateformat; // 返回月份差值
 
}

// 计算指定时间和今天的时长
funcs.getshichang = function(datetimedata) {
  var start = new Date(datetimedata); // 将起始日期字符串转换为Date对象
  // var end = new Date(endDateString);     // 将结束日期字符串转换为Date对象
  const end = new Date();
  var timeDiff = Math.abs(end - start.getTime()); // 获取时间差（单位：毫秒）
  var monthDiff = Math.floor(timeDiff / (30 * 24 * 60 * 60 * 1000)); // 根据每个月平均天数进行近似计算

  return monthDiff; // 返回月份差值
 
}

funcs.formatDateTime = (dateTimeString) => {
  const match = dateTimeString.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})/);
  return match ? match[1].replace('T', ' ') : dateTimeString;
};

// // -------------将页面的url 复制到剪切板

// const message = ref('');
// const messageColor = ref('black');

const copyUrl = (message,messageColor) => {
  const currentUrl = window.location.href;

  // 创建一个临时的 textarea 元素
  const textarea = document.createElement('textarea');
  textarea.value = currentUrl;
  document.body.appendChild(textarea);
  
  // 选择并复制文本
  textarea.select();
  try {
    document.execCommand('copy');
    message.value = `页面地址已复制到剪贴板：${currentUrl}`;
    messageColor.value = 'green';
  } catch (err) {
    console.error('无法复制到剪贴板', err);
    message.value = '无法复制到剪贴板';
    messageColor.value = 'red';
  }
  
  // 移除临时的 textarea 元素
  document.body.removeChild(textarea);
};



/////////////////////////////////////将页面的url 复制到剪切板

//暴露出这个对象
export default funcs;
