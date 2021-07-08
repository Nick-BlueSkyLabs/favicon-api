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

    // don't await this
    checkForUpdatedFavicon(url, imageDetails);

    res.header('Content-Type', `image/x-icon`)

    const favicon = Buffer.from(imageDetails.image, "hex")

    res.send(favicon)
    return;

  }

  const favicon = await fetchFaviconFromWebsite(url);

  // don't await this either
  saveNewFavicon(imageDetails, favicon, url);

  res.header('Content-Type', `image/x-icon`)
  res.send(favicon)
  return;
});


