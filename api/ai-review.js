export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "no text" });
  }

  try {

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.OPENAI_KEY
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "너는 음악 리뷰어다. 짧고 감성적으로 써라"
          },
          {
            role: "user",
            content: text
          }
        ]
      })
    });

    const data = await r.json();

    return res.status(200).json({
      result: data.choices?.[0]?.message?.content || ""
    });

  } catch (e) {
    return res.status(500).json({
      error: "ai failed",
      detail: e.message
    });
  }
}
