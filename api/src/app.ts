import Fastify from "fastify";
import { client } from "./db"

export const app = Fastify({ logger: true });

app.get("/", async (req, res) => {

  const data = await (await client).query("SELECT * FROM accounts")
  
  return { data }
});
