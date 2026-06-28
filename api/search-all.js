module.exports = async (req, res) => {

  try {

    // 🔥 GET + POST 둘 다 처리
    const q = req.method === "POST"
      ? req.body?.q
      : req.query?.q;

    if (!q) {
      return res.status(400).json({ error: "no query" });
    }

    const r = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=10`
    );

    const data = await r.json();

    return res.status(200).json(data.results || []);

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
