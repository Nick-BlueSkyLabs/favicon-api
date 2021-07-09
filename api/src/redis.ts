import { promisify } from "util";
import redis from "redis";
import { REDIS_HOST } from "./ENV";


const client = redis.createClient({
  host: REDIS_HOST || "localhost"
});

export const cache = {
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client),
}