const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.status(405).json({ error: "Method not supported" });
    return;
  }

  const { questionId } = req.body;
  const query = q.Delete(q.Ref(q.Collection("questions"), questionId));

  try {
    await client.query(query);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error });
  }
}
