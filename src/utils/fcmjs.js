
import https from '@/utils/request.js';

const requestFCMToken = async (user_id) => {
  try {
      const response = await https.post("/api/minsubaojie/get_fcm_token/", { user_id });

      const data = await response.json();
      if (data.token) {
          console.log("获取的 FCM Token:", data.token);
      } else {
          console.error("无法获取 FCM Token");
      }
  } catch (error) {
      console.error("请求 FCM Token 失败:", error);
  }
};

export default requestFCMToken;
