export interface ENV {
  [x: string]: string;
}

const { REDIS_HOST, DB_HOST } = process.env as ENV;

console.log({ REDIS_HOST, DB_HOST })

export { REDIS_HOST, DB_HOST }