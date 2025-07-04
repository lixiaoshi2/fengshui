// 定义一个全局对象来存放你的函数和变量
// 这里的message是一个页面的元素提示消息的元素
const clipboardHelper = (() => {
    const messageElement = document.getElementById('message');
  
    const copyTextToClipboard = (text) => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
  
      textarea.select();
      try {
        document.execCommand('copy');
        return true;
      } catch (err) {
        console.error('无法复制到剪贴板', err);
        return false;
      } finally {
        document.body.removeChild(textarea);
      }
    };
  
    const copyUrl = () => {
      const currentUrl = window.location.href;
      const success = copyTextToClipboard(currentUrl);
  
      if (success) {
        messageElement.textContent = `页面地址已复制到剪贴板：${currentUrl}`;
        messageElement.style.color = 'green';
      } else {
        messageElement.textContent = '无法复制到剪贴板';
        messageElement.style.color = 'red';
      }
    };
  
    return {
      copyUrl
    };
  })();