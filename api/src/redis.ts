import { promisify } from "util";
import redis from "redis";
import { ENV } from "./ENV";

const { REDIS_HOST } = process.env as ENV;

const client = redis.createClient({
  host: REDIS_HOST
});

export const cache = {
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client),
}