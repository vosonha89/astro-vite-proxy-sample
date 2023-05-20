import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler<Response> = async function onRequest(context, next) {
    const { url } = context.request;
    console.log(url);
    const response = await next();
    const html = await response.text();
    console.log(html);
    const redactedHtml = html.replace("PRIVATE INFO", "REDACTED");
    
    const newRespone = new Response(redactedHtml, {
        status: 200,
        headers: response.headers,
    });
    return newRespone;
};