const { MONGODB_URI } = require("./mongoURI.json");
const m = require("mongodb").MongoClient;

// * thinks what to cache!!
let cachedDB = null;

async function connectToDatabase() {
  const URI = `ANY_GOOD_URL_MONGO_DB_ATLAS`;

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
