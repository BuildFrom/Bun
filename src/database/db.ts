import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "bundb",
  password: "postgres",
  port: 5432,
});

async function db() {
  try {
    const client = await pool.connect();
    return client;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; // Rethrow the error to propagate it up
  }
}

export default db;

// import { AdapterFacade } from "@/database/index";

// const pool = AdapterFacade(
//   `postgres://postgres:spostgrespassword@postgres:5432/postgres`
// );

// function db() {
//   return new Promise((resolve, reject) => {
//     pool.connect((err: any, client: any, done: any) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(client);
//       }
//     });
//   });
// }

// export default db;

// async function db() {

// }

// import { Pool } from "pg";
// const connectionString =
//   "postgres://postgres:postgrespassword@postgres:5432/postgres";

// const pool = new Pool({
//   connectionString,
// });

// async function db(): Promise<any> {
//   return pool;
// }

// export default db;

// postgres://postgres:postgrespassword@localhost:5432/postgres
