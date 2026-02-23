const UMAMI_SCRIPT = '<script defer src="https://umami.022122.xyz/script.js" data-website-id="2d851522-bb2f-4957-ad87-7405d18f3960"></script>';

class HeadInjector {
  element(element) {
    element.append(UMAMI_SCRIPT, { html: true });
  }
}

export async function onRequest(context) {
  const response = await context.next();
  const contentType = response.headers.get('content-type') || '';

  if (!contentType.includes('text/html')) {
    return response;
  }

  return new HTMLRewriter()
    .on('head', new HeadInjector())
    .transform(response);
}