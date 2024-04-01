import { Pool } from "pg";
import AdapterFacade from "./facade";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "yourdb",
  password: "lol",
  port: 5432,
});

const adapter = AdapterFacade("postgres://postgres:lol@localhost:5432/yourdb");

export default pool;