const { MONGODB_URI } = require("./mongoURI.json");
const m = require("mongodb").MongoClient;

// * thinks what to cache!!
let cachedDB = null;

async function connectToDatabase() {
  if (cachedDB) {
    return cachedDB;
  }

  const client = await m.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  });

  cachedDB = client.db(`450DSATracker`);

  return cachedDB;
}

module.exports = {
  connectToDatabase,
};
