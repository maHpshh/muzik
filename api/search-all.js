module.exports = async (req, res) => {

  try {

    const q = req.body?.q;

    if (!q) {
      return res.status(400).json([]);
    }

    const r = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=10`
    );

    const data = await r.json();

    const result = (data.results || []).map(item => ({
      title: item.trackName,
      artist: item.artistName,
      albumId: item.collectionId
    }));

    return res.status(200).json(result);

  } catch (e) {
    return res.status(500).json([]);
  }
};
