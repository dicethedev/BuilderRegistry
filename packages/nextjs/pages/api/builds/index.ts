import { NextApiRequest, NextApiResponse } from "next";
import { findAllBuilds } from "~~/services/db/build";
import "~~/services/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const builders = await findAllBuilds();
    return res.status(200).json(builders);
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  if (req.method === "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  /**
   * TODOs
   * INCLUDE SENDER SIGNATURE IN REQUEST
   * VERIFY SENDER IS AN ADMIN
   **/
}
