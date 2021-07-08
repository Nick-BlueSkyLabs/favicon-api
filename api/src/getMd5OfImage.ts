import md5 from "md5";


export async function getMd5OfImage(image: Buffer): Promise<string> {
  return md5(image);
}
