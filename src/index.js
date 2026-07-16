export default {
  async fetch(request, env) {
    // 静的アセットから元のレスポンスを取得
    const response = await env.ASSETS.fetch(request);

    // HTMLでなければそのまま返す
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return response;
    }

    // GA4の測定IDが未設定ならそのまま返す
    const gaId = env.GA_MEASUREMENT_ID;
    if (!gaId) {
      return response;
    }

    // HTMLRewriterで </head> の直前にGA4タグを注入
    const gaSnippet = `
<script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${gaId}');
</script>`;

    return new HTMLRewriter()
      .on("head", {
        element(element) {
          element.append(gaSnippet, { html: true });
        },
      })
      .transform(response);
  },
};
