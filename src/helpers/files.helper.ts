import { Purchase } from "src/purchases/entities/purchase.entity";
import * as sharp from "sharp";
export const getImageFormat = (image: Purchase): string => {
  // Check the image header to determine the format
  const header = image.photo.slice(0, 4).toString("hex");

  if (header.startsWith("ffd8")) {
    return "jpeg";
  } else if (header === "89504e47") {
    return "png";
  } else if (header === "47494638") {
    return "gif";
  } else if (header === "ffd8ffe0") {
    return "jpg";
  }

  // Default to 'jpeg' if the format is unknown
  return "jpeg";
};

export const resizeAndCompressImage = async (
  imageData: Buffer
  //format: string
): Promise<Buffer> => {
  // Resize the image to a specific width (e.g., 800px) while maintaining the aspect ratio
  const resizedImage = await sharp(imageData).resize({ width: 800 }).toBuffer();

  // Compress the resized image with a moderate quality level
  const compressedImage = await sharp(resizedImage)
    .jpeg({ quality: 70 }) // Adjust the quality value as needed
    .toBuffer();

  return compressedImage;
};
