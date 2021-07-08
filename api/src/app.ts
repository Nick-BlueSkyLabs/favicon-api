import Fastify from "fastify";
import { cache } from "./redis"

import { getLatestFaviconFromDatabase } from "./getLatestFaviconFromDatabase";
import { checkForUpdatedFavicon } from "./checkForUpdatedFavicon";
import { saveNewFavicon } from "./saveNewFavicon";
import { fetchFaviconFromWebsite } from "./fetchFaviconFromWebsite";

export const app = Fastify({ logger: true });

interface Query {
  url: string;
}

app.get("/", async (req, res) => {
  const { url } = req.query as Query;

  const cachedImageDetails = await cache.get(url);

  if (cachedImageDetails) {

    console.log("using redis cache")

    const imageDetails = JSON.parse(cachedImageDetails)

    // don't await this
    checkForUpdatedFavicon(url, imageDetails);

    res.header('Content-Type', `image/x-icon`)

    const favicon = Buffer.from(imageDetails.image, "hex")

    res.send(favicon)
    return;

  }

  const imageDetails = await getLatestFaviconFromDatabase(url);

  if (imageDetails) {

    console.log("using database")

    // don't await this
    checkForUpdatedFavicon(url, imageDetails);

    cache.set(url, JSON.stringify(imageDetails))

    res.header('Content-Type', `image/x-icon`)

    const favicon = Buffer.from(imageDetails.image, "hex")

    res.send(favicon)
    return;

  }

  const favicon = await fetchFaviconFromWebsite(url);

  console.log("fetching from the interwebs")


  // don't await this either
  saveNewFavicon(imageDetails, favicon, url);

  res.header('Content-Type', `image/x-icon`)
  res.send(favicon)
  return;
});


