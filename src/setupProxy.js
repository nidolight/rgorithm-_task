// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://trusuite.truabutment.com', 
      changeOrigin: true,   // Host 헤더를 타깃 도메인으로
      secure: true,         // 사설/유효하지 않은 인증서면 false로 바꾸세요
      logLevel: 'debug',    // 터미널에 [HPM] 로그
      xfwd: true,           // X-Forwarded-* 헤더 추가
      // 백엔드가 /api 프리픽스를 기대하므로 pathRewrite는 쓰지 않습니다.
      // pathRewrite: { '^/api': '' }, // ❌ 사용하지 말 것
      onProxyReq(proxyReq) {
        // 필요시 헤더 보정 (503 회피에 도움될 수 있음)
        proxyReq.setHeader('Origin', 'https://trusuite.truabutment.com');
        proxyReq.setHeader('Referer', 'https://trusuite.truabutment.com/');
        proxyReq.setHeader('Accept', 'application/json, text/plain, */*');
        proxyReq.setHeader(
          'User-Agent',
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Safari'
        );
      },
    })
  );
};
