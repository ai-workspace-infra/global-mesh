/**
 * Cloudflare Worker: FRONTEND ROUTER (console-uat.onwalk.net)
 * 1:1 还原架构路由截图中的核心分流调度器
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. 静态与 SSR 路由 -> 5 SSR WORKERS & PAGES (Next.js 前端控制台)
    // 路由: public | content | auth | console | ws
    if (!url.pathname.startsWith('/api/')) {
      // 转发至 Next.js Cloudflare Pages / Workers SSR
      return fetch(request);
    }

    // 2. 接口网关路由 -> 3 EDGE GATEWAY WORKERS -> CLOUD RUN (GCP: xworktech)
    // 路由: auth (/api/auth) | admin | core (/api)
    const cloudRunOrigin = env.CLOUD_RUN_API_URL || 'https://global-mesh-api-xyz-uc.a.run.app';
    const apiUrl = new URL(url.pathname + url.search, cloudRunOrigin);

    // 注入边缘鉴权头与链路追踪
    const newHeaders = new Headers(request.headers);
    newHeaders.set('X-Forwarded-Host', url.hostname);
    newHeaders.set('X-Edge-Worker', 'frontend-router-onwalk');
    newHeaders.set('CF-Connecting-IP', request.headers.get('CF-Connecting-IP') || '');

    const backendRequest = new Request(apiUrl, {
      method: request.method,
      headers: newHeaders,
      body: request.body,
      redirect: 'follow',
    });

    return fetch(backendRequest);
  },
};
