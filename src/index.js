export default {
  async fetch(request, env) {
    // デバッグ: Workerが動いているか確認
    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("text/html")) {
      return response;
    }

    // Workerが動いてることを示すヘッダーを追加
    const newResponse = new Response(response.body, response);
    newResponse.headers.set("X-Worker-Active", "true");

    const gaId = env.GA_MEASUREMENT_ID;
    if (!gaId) {
      // GAのIDが取れてない場合もヘッダーで知らせる
      newResponse.headers.set("X-GA-Status", "no-measurement-id");
      return newResponse;
    }

    newResponse.headers.set("X-GA-Status", "injecting-" + gaId);

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
      .transform(newResponse);
  },
};
