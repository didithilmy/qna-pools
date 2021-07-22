const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

export default async function handler(req, res) {
  let roomId = getRandomString(4);
  while (await roomExists(roomId)) {
    roomId = getRandomString(4);
  }
  res.status(200).json({ roomId });
}

async function roomExists(roomId) {
  try {
    const query = q.Get(q.Match(q.Index("room"), roomId));
    const result = await client.query(query);

    console.log(roomId, result);
    return !!result?.data;
  } catch {
    return false;
  }
}

function getRandomString(length) {
  var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}
