import { connectToDatabase } from "../database";
import { kickStartTheServer } from "../server";

function main() {
  connectToDatabase()
    .then((m) => console.log(`Mongodb configurations loaded...`))
    .catch((e) => console.error(e));
  kickStartTheServer();
}

main();
