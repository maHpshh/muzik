export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  const { albumId } = req.body;

  if (!albumId) {
    return res.status(400).json({ error: "no albumId" });
  }

  try {

    const r = await fetch(
      `https://itunes.apple.com/lookup?id=${albumId}&entity=song`
    );

    const data = await r.json();

    const album = data.results?.[0];

    if (!album) {
      return res.status(404).json({ error: "album not found" });
    }

    const songs = (data.results || []).slice(1).map(s => ({
      title: s.trackName,
      rating: 5
    }));

    return res.status(200).json({
      title: album.collectionName,
      artist: album.artistName,
      cover: album.artworkUrl100?.replace("100x100", "600x600"),
      songs
    });

  } catch (e) {
    return res.status(500).json({
      error: "album failed",
      detail: e.message
    });
  }
}
