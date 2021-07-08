import { ImageDetails } from "./ImageDetails";
import { saveNewFaviconToDatabase } from "./saveNewFaviconToDatabase";
import { getMd5OfImage } from "./getMd5OfImage";


export async function saveNewFavicon(
  imageDetails: ImageDetails,
  image: Buffer,
  url: string
) {
  const md5 = await getMd5OfImage(image);

  if (imageDetails?.md5 !== md5) {
    saveNewFaviconToDatabase(url, md5, image);
  }
}
