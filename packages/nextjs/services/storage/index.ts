import { admin } from "../firebase";
import mime from "mime-types";
import { v4 as uuidv4 } from "uuid";

console.log("using Firebase Storage");

const defaultStorage = admin.storage();
const bucket = defaultStorage.bucket();

export const uploadFile = async (file: any, fileBuffer: Buffer) => {
  console.log(file);
  const fileId = uuidv4();
  const newFileName = `${fileId}.${mime.extension(file.mimetype)}`;
  const newPath = `uploads/${newFileName}`;
  console.log(newFileName, newPath, fileBuffer);
  console.log(bucket);

  //const [_, uploadedFile] = await bucket.upload(fileBuffer, { destination: newPath });
  // console.log("Storage Firebase -> File copied:", uploadedFile.mediaLink);

  // Full Frontend URL.
  return "";
};
