import { cloudinary } from "./cloudinary.js";

export const uploadToCloudinary = async (buffer, fileName, contentType) => {
  const isPdf = contentType === "application/pdf";

  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id: fileName,
        resource_type: isPdf ? "auto" : "image",
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