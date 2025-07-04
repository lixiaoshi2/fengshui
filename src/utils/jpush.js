

import https from '@/utils/request.js';

// const axios = require('axios');

const appKey = 'd501a20d693867eebb9f7c6e';
const masterSecret = '33ed5523a17677a51e15311a';
const base64Auth = Buffer.from(`${appKey}:${masterSecret}`).toString('base64');

const sendPush = async () => {
    const response = await https.post('https://api.jpush.cn/v3/push', {
        platform: 'all',
        audience: 'all',
        notification: {
            alert: 'Hello, JPush!'
        }
    }, {
        headers: {
            'Authorization': `Basic ${base64Auth}`,
            'Content-Type': 'application/json'
        }
    });

    console.log(response.data);
};

sendPush();
