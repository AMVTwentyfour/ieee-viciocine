import { fetchLatestSeries } from '../../lib/api.js';

export async function GET({ url }) {
  const year = url.searchParams.get('year') || '2024';

  try {
    const data = await fetchLatestSeries(year);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch series' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}