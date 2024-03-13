import mime from "mime-types";
import { v4 as uuidv4 } from "uuid";
import { admin } from "~~/services/firebase";

console.log("using Firebase Storage");

const defaultStorage = admin.storage();
const bucket = defaultStorage.bucket("upload");

export const uploadFileToFirebase = async (file: any, fileBuffer: Buffer) => {
  console.log(file);
  const fileId = uuidv4();
  const newFileName = `${fileId}.${mime.extension(file.mimetype)}`;
  //console.log(defaultStorage.bucket().upload())
  const newPath = `uploads/${newFileName}`;
  const fileRef = await bucket.file(newPath).save(fileBuffer, { metadata: { contentType: file.mimetype } });

  console.log(fileRef);
  //const url = await bucket.file(newPath).getSignedUrl({ action: 'read', expires: '03-09-2491' });
  //console.log(url);
  //console.log(newFileName, newPath, fileBuffer);
  //console.log(bucket);

  //const [_, uploadedFile] = await bucket.upload(fileBuffer, { destination: newPath });
  // console.log("Storage Firebase -> File copied:", uploadedFile.mediaLink);

  // Full Frontend URL.
  return "";
};
