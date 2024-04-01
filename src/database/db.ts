import { AdapterFacade } from "./index";

// change to postgres, redis, or mongo to apply specific adapter
const url = AdapterFacade(
  "postgres://postgres:password@localhost:5432/postgres"
);

console.log(url);

async function db() {
  try {
    const connectionPool = url.createConnectionPool(10);
    const conn = connectionPool.checkout();
    return conn;
  } catch (error: any) {
    throw new Error("Error obtaining connection: " + error.message);
  }
}

export default db;
