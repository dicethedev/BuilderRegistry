import formidable from "formidable";
import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import { Writable } from "stream";
import { uploadFileWithName } from "~~/services/storage/types/local";

const formidableConfig = {
  keepExtensions: true,
  maxFileSize: 10_000_000,
  maxFieldsSize: 10_000_000,
  maxFields: 3,
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
  console.log(" POST /api/logo");
  try {
    const chunks: never[] = [];

    const { files } = await formidablePromise(req, {
      ...formidableConfig,
      fileWriteStreamHandler: () => fileConsumer(chunks),
    });

    // console.log(fields);
    //console.log(files);
    const { logo, favicon, file } = files;
    console.log(logo, favicon, file);
    //console.warn(file);
    if (!logo || !logo[0] || !favicon || !favicon[0]) {
      return res.status(400).json({ error: "No File Provided" });
    }

    if (logo[0].size > 1 * 1024 * 1024 || favicon[0].size > 1 * 1024 * 1024) {
      return res.status(400).json({ error: "Files size exceeds the limit of 1 MB." });
    }

    // console.log(chunks, logo[0], favicon[0], chunks[0], chunks[1]);
    await uploadFileWithName(favicon[0], chunks[0], "favicon");
    await uploadFileWithName(logo[0], chunks[1], "logo");
    return res.status(201);
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
