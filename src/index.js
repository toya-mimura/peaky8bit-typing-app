export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return response;
    }

    const gaId = env.GA_MEASUREMENT_ID;
    if (!gaId) {
      return response;
    }

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
