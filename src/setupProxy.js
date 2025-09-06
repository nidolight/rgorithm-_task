// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');
const https = require('https');

const agent = new https.Agent({
  keepAlive: true,
  maxSockets: 100,     // 동시 연결 여유
  maxFreeSockets: 10,  // 유휴 연결 풀
  timeout: 60000
});

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://trusuite.truabutment.com',
      changeOrigin: true,
      secure: true,
      agent,                 // ✅ 중요
      proxyTimeout: 15000,   // 백엔드 지연 시 빨리 실패
      timeout: 15000,
      logLevel: 'info',      // dev 때만 debug
      xfwd: true,
    })
  );
};
