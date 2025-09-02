# Video List (Search + Pagination)

**Stack:** React (CRA) + TypeScript · Modular components · Inline styles

**Live:** [https://test.next-nas.uk/](https://test.next-nas.uk/)

> 이 프로젝트는 **알고리즘코리아** 면접 후 과제로 진행했습니다. (Assignment after interview at Algorithm Korea.)

---

## Features

* 검색 + 페이지네이션
* 서버 응답(`current_page / last_page / total / per_page`) 기반 페이징
* 로딩/에러 상태 표시

## API

* **Base:** `https://trusuite.truabutment.com`
* **Endpoint:** `/api/tada/list`
* **Query:** `page` (number), `keyword` (string)
* **Response (예시)**

```json
{
  "current_page": 1,
  "data": [
    {
      "id": 22,
      "title": "TruAbutment Smart Driver Tutorial",
      "category": "LECTURE",
      "length": "02:56",
      "thumb": "https://.../thumb.png",
      "uid": "",
      "link": "https://youtu.be/nRP_ZLcbQds",
      "view": 245,
      "isDeleted": 0,
      "created_at": "2023-07-26 18:16:54",
      "updated_at": "2025-05-07 17:13:07"
    }
  ],
  "last_page": 1,
  "per_page": 9,
  "total": 1
}
```

> 현재 샘플 응답은 `total: 1`이라 한 개만 표시됩니다. 실제 데이터가 늘어나면 페이징/UI는 그대로 동작합니다.

---

## Project Structure

```
src/
  api/
    client.ts            # fetchVideoList(page, keyword) — env/프록시에 따라 URL 결정
  components/
    SearchBar.tsx
    Pagination.tsx
    VideoCard.tsx
    VideoGrid.tsx
    VideoListPage.tsx     # 페이지 컨테이너 (검색/페이지 상태, 데이터 페칭)
  types/
    api.ts                # ApiResponse 타입 (라라벨 페이징 필드 포함)
    video.ts              # Item 타입
  utils/
    format.ts             # formatNumber, formatDate(21 Jun 2022)
  setupProxy.js           # (개발용) CRA Dev 프록시 설정
  App.tsx
```

---

## Development (CRA)

> CRA(dev)에서는 **프록시**를 써서 CORS/혼합콘텐츠를 피합니다. 코드에서는 항상 **상대경로**(`/api/...`)를 씁니다.

1. **`src/setupProxy.js`**

```js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://trusuite.truabutment.com',
      changeOrigin: true,
      logLevel: 'debug',
      xfwd: true,
      onProxyReq(proxyReq) {
        proxyReq.setHeader('Origin', 'https://trusuite.truabutment.com');
        proxyReq.setHeader('Referer', 'https://trusuite.truabutment.com/');
        proxyReq.setHeader('Accept', 'application/json, text/plain, */*');
        proxyReq.setHeader('User-Agent', 'Mozilla/5.0');
      },
    })
  );
};
```

2. **Client 호출** (`src/api/client.ts`)

```ts
const API_BASE = process.env.REACT_APP_API_BASE || ""; // dev: ""
const API_PATH = "/api/tada/list";

function buildUrl(page: number, keyword?: string) {
  const base = API_BASE ? `${API_BASE}${API_PATH}` : API_PATH; // dev는 프록시, prod는 절대경로
  const url = new URL(base, window.location.origin);
  url.searchParams.set("page", String(page));
  if (keyword) url.searchParams.set("keyword", keyword);
  return url.toString();
}
```

3. **Run**

```bash
npm install
npm start
```

---

## Scripts

```bash
npm start      # dev (CRA + setupProxy)
npm run build  # production build
```

---

## Credits

* 과제: **알고리즘코리아**
* 호스팅(현재): [https://test.next-nas.uk/](https://test.next-nas.uk/)
* API: [https://trusuite.truabutment.com/api/tada/list](https://trusuite.truabutment.com/api/tada/list)
