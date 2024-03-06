import formidable from "formidable";
import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import { Writable } from "stream";
import "~~/services/firebase";
import { uploadFile } from "~~/services/storage";

const formidableConfig = {
  keepExtensions: true,
  maxFileSize: 10_000_000,
  maxFieldsSize: 10_000_000,
  maxFields: 7,
  allowEmptyFiles: false,
  multiples: false,
};

function formidablePromise(
  req: NextApiRequest,
  opts?: Parameters<typeof formidable>[0],
): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  return new Promise((accept, reject) => {
    const form = formidable(opts);

    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      return accept({ fields, files });
    });
  });
}

const fileConsumer = <T = unknown>(acc: T[]) => {
  const writable = new Writable({
    write: (chunk, _enc, next) => {
      acc.push(chunk);
      next();
    },
  });

  return writable;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(404).end();
  console.log(" POST /api/upload");
  try {
    const chunks: never[] = [];

    const { files } = await formidablePromise(req, {
      ...formidableConfig,
      fileWriteStreamHandler: () => fileConsumer(chunks),
    });

    // console.log(fields);
    //console.log(files);
    const { file } = files;
    //console.warn(file);
    if (!file || !file[0]) {
      return res.status(400).json({ error: "No File Provided" });
    }

    if (file[0].size > 5 * 1024 * 1024) {
      return res.status(400).json({ error: "File size exceeds the limit of 5 MB." });
    }

    const fileData = Buffer.concat(chunks);
    console.log(fileData, uploadFile);
    // console.log(file[0],fileData.toString());
    // const uploadLink = await uploadFile(file[0], fileData.toString());
    // console.log(uploadLink);
    return res.json({ imgUrl: "" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
