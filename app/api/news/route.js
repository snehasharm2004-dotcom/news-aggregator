export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "technology";

  const res = await fetch(
    `https://newsapi.org/v2/everything?q=${q}&sortBy=publishedAt&pageSize=12&apiKey=${process.env.NEWS_API_KEY}`
  );
  const data = await res.json();
  return Response.json(data);
}