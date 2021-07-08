import Fastify from "fastify";
import { db } from "./db"

export const app = Fastify({ logger: true });

app.get("/", async (req, res) => {
  
  return { database: db.isConnected }
});
