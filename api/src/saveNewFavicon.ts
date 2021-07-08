import { ImageDetails } from "./ImageDetails";
import { saveNewFaviconToStorage } from "./saveNewFaviconToStorage";
import { saveNewFaviconToDatabase } from "./saveNewFaviconToDatabase";
import { getMd5OfImage } from "./getMd5OfImage";


export async function saveNewFavicon(
  imageDetails: ImageDetails,
  image: Buffer,
  url: string
) {
  const md5 = await getMd5OfImage(image);

  if (imageDetails.md5 !== md5) {
    const newImageDetails = await saveNewFaviconToDatabase(url, md5);

    saveNewFaviconToStorage(newImageDetails.imageId, image);
  }
}
