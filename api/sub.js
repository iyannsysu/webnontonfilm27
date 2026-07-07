export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'Missing url' });
  try {
    const response = await fetch(url);
    if (!response.ok) return res.status(502).json({ error: 'Failed' });
    const text = await response.text();
    let vtt = 'WEBVTT\n\n';
    vtt += text.replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, '$1.$2');
    res.setHeader('Content-Type', 'text/vtt; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.send(vtt);
  } catch (err) {
    return res.status(502).json({ error: err.message });
  }
}
