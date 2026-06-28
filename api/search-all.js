module.exports = async (req, res) => {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  const { q } = req.body;

  if (!q) {
    return res.status(400).json({ error: "no query" });
  }

  try {

    const r = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=5`
    );

    const data = await r.json();

    const result = (data.results || []).map(item => ({
      title: item.trackName,
      artist: item.artistName,
      albumId: item.collectionId
    }));

    return res.status(200).json(result);

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
