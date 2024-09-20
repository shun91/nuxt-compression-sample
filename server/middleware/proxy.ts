import { createProxyMiddleware } from "http-proxy-middleware";

export default defineEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig();

  const proxyMiddleware = createProxyMiddleware({
    target: apiUrl, // プロキシ先のURL
    changeOrigin: true,
    pathFilter: ["/api"], // プロキシ対象のパス
    pathRewrite: { "^/api": "" }, // 任意：パスの書き換え
    on: {
      proxyReq: (proxyReq) => {
        // 任意：Request Header が溢れる場合は不要なcookieを削除する
        proxyReq.removeHeader("cookie");
        // 任意：認証情報を付与。ここではIdTokenだが必要なものを付与するとよい
        const idToken = getCookie(event, "id_token");
        if (idToken) {
          proxyReq.setHeader("Authorization", `Bearer ${idToken}`);
        }
      },
    },
  });

  await new Promise((resolve, reject) => {
    proxyMiddleware(event.node.req, event.node.res, (err) => {
      if (err) reject(err);
      else resolve(true);
    });
  });
});
