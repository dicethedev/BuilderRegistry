import mime from "mime-types";
import { v4 as uuidv4 } from "uuid";
import { admin } from "~~/services/firebase";

console.log("using Firebase Storage");

const defaultStorage = admin.storage();
const bucket = defaultStorage.bucket();

export const uploadFileToFirebase = async (file: any, fileBuffer: Buffer) => {
  const fileId = uuidv4();
  const newFileName = `${fileId}.${mime.extension(file.mimetype)}`;
  const newPath = `uploads/${newFileName}`;
  await bucket.file(newPath).save(fileBuffer, { metadata: { contentType: file.mimetype } });
  const metadata = await bucket.file(newPath).getMetadata();
  return metadata[0].mediaLink;
};
