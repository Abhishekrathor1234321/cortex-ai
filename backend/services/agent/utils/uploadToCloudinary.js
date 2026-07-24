import { cloudinary } from "./cloudinary.js";

export const uploadToCloudinary = async (buffer, fileName, contentType) => {
  const isPdf = contentType === "application/pdf";
  const isImage = contentType.startsWith("image/");

  let resourceType = "raw";
  if (isPdf) resourceType = "auto";
  else if (isImage) resourceType = "image";

  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id: fileName,
        resource_type: resourceType,
        folder: "cortex-ai",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });

  return result.secure_url;
};