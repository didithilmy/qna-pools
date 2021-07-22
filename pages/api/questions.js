const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

export default async function handler(req, res) {
  const { roomId } = req.query;
  const query = q.Map(
    q.Paginate(q.Match(q.Index("room"), roomId)),
    q.Lambda("questions", q.Get(q.Var("questions")))
  );
  const results = await client.query(query);
  const parsedResults = JSON.parse(JSON.stringify(results));
  res
    .status(200)
    .json(parsedResults.data.map((x) => ({ ...x.data, id: x.ref["@ref"].id })));
}
