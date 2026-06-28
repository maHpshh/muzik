module.exports = async (req, res) => {

  try {

    const { albumId } = req.body;

    const r = await fetch(
      `https://itunes.apple.com/lookup?id=${albumId}&entity=song`
    );

    const data = await r.json();

    return res.status(200).json(data);

  } catch (e) {
    return res.status(500).json({});
  }
};
