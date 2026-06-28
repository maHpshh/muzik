module.exports = async (req, res) => {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  const { albumId } = req.body;

  try {

    const r = await fetch(
      `https://itunes.apple.com/lookup?id=${albumId}&entity=song`
    );

    const data = await r.json();

    return res.status(200).json(data);

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
