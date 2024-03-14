import fs from "fs";
import mime from "mime-types";

console.log("Using Local Storage");

export const uploadFileToLocal = async (file: any, fileBuffer: Buffer) => {
  const newFileName = `${file.newFilename}.${mime.extension(file.mimetype)}`;
  const newPath = `public/${newFileName}`;
  fs.writeFileSync(newPath, fileBuffer);
  console.log("Storage local -> File copied:", newPath);
  return `http://${process.env.NEXT_PUBLIC_HOST}/${newFileName}`;
};
