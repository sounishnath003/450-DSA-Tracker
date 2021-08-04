import { fork, isMaster } from "cluster";
import { cpus } from "os";
import { on, pid } from "process";
import { Server } from "./server";

/**
 * A Worker object contains all public information and method about a worker. In the master it can be obtained using cluster.workers. In a worker it can be obtained using cluster.worker
 *
 * Server will spawn up new Instances depending upon the core of the host machine.
 *
 * For Development my machine 4cores and concurrency level 100 SET
 */
export function kickStartTheServer() {
  // const workers = cpus();
  // if (isMaster === true) {
  //   console.log(`## 🔼 [Master Server: ${pid}] has been started...`);
  //   workers.forEach(() => fork())
  //   on("exit", () => fork());
  // } else {
  // }
  new Server();
}
