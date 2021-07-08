import { client } from "./db";
import SQL from "sql-template-strings";
import { ImageDetails } from "./ImageDetails";
import { v4 as uuid } from "uuid";
import { cache } from "./redis"

export async function saveNewFaviconToDatabase(
  url: string,
  md5: string,
  image: Buffer
): Promise<ImageDetails> {
  const imageId = uuid();
  const timestamp = Date.now();
  const imageHex = image.toString('hex')

  const sql = SQL`
  INSERT INTO favicon.favicons
  ("imageid", "url", "md5", "timestamp", "image")
  VALUES
  (${imageId}, ${url}, ${md5}, ${timestamp}, ${imageHex})`;

  await (await client).query(sql);

  await cache.set(url, JSON.stringify({ imageId, url, md5, timestamp, image: imageHex  }))

  return { imageId, url, md5, timestamp, image: imageHex };
}
