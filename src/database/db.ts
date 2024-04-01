import { AdapterFacade } from "./index";

const url = AdapterFacade(
  "postgresql://postgres:password@localhost:5432/postgres"
);

async function db() {
  try {
    const connectionPool = url.createConnectionPool(10);
    const conn = connectionPool.checkout();
    console.log("Connection obtained", conn);
    return conn;
  } catch (error: any) {
    throw new Error("Error obtaining connection: " + error.message);
  }
}

export default db;