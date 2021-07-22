const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not supported" });
    return;
  }

  const { roomId, name, question } = req.body;
  const questionItem = { roomId, name, question, revealed: false };

  try {
    await client.query(
      q.Create(q.Collection("questions"), { data: questionItem })
    );
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error });
  }
}
