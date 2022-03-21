import { HeadersFunction, LoaderFunction, useLoaderData } from "remix";

export const loader: LoaderFunction = async ({
  request,
  context: { event, cache },
}) => {
  const cachedRes = await cache.match(request);
  if (cachedRes) return cachedRes;

  const now = new Date().toString();
  const response = new Response(now, {
    headers: {
      "Cache-Control": "max-age=15",
    },
  });

  event.waitUntil(cache.put(request, response.clone()));
  return response;
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return loaderHeaders;
};

export default function Index() {
  const data = useLoaderData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <span>{data}</span>
    </div>
  );
}
