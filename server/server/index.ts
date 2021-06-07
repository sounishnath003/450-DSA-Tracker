import { Server } from "./server";

/**
 * A Worker object contains all public information and method about a worker. In the master it can be obtained using cluster.workers. In a worker it can be obtained using cluster.worker
 *
 * Server will spawn up new Instances depending upon the core of the host machine.
 *
 * For Development my machine 4cores and concurrency level 100 SET
 */
export function kickStartTheServer() {
  new Server();
}
