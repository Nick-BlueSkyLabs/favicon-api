import { Pool, PoolClient } from "pg";
import { ENV } from "./ENV";


const { DB_HOST } = process.env as ENV;

const config = {
  user: "root",
  host: DB_HOST || "localhost",
  database: "favicon",
  port: 26257
};

export const client = (new Pool(config)).connect();
