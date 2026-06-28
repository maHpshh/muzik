export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  const { q } = req.body;

  if (!q) {
    return res.status(400).json({ error: "no query" });
  }

  try {

    // =====================
    // 🍎 iTunes (fallback 100% 안정)
    // =====================
    const itunesRes = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=5`
    );

    const itunes = await itunesRes.json();

    const itunesData = (itunes.results || []).map(s => ({
      title: s.trackName,
      artist: s.artistName,
      albumId: s.collectionId,
      source: "itunes"
    }));

    return res.status(200).json(itunesData);

  } catch (e) {
    return res.status(500).json({
      error: "search failed",
      detail: e.message
    });
  }
}
