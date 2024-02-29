import formidable from "formidable";
import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import { Writable } from "stream";
import "~~/services/firbase";
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

    const uploadLink = await uploadFile(fileData, fileData);
    return res.json({ imgUrl: uploadLink });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  /** TODOs
   * INCLUDE SENDER SIGNATURE IN REQUEST
   * VERIFY SENDER IS AN ADMIN
   **/

  // try {
  //   const { role, ens, functionTitle } = req.body;
  //   if (!role || !ens || !functionTitle) {
  //     return res.status(400).json({ error: "Missing required fields." });
  //   }
  //   const newBuilder = await createUser(role, ens, functionTitle);
  //   // Respond with the new  user
  //   res.status(201).json(newBuilder);
  // } catch (error: any) {
  //   console.error("Error creating  new  builder:", error);
  //   res.status(500).json({ message: "An unexpected error occurred while creating the user." });
  // }
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
