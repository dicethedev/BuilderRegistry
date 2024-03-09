import { NextApiRequest, NextApiResponse } from "next";
import { findUserAndBuilds } from "~~/services/db/user";
import "~~/services/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { builderAddress } = req.query;
      const builder = await findUserAndBuilds(builderAddress as string);
      return res.status(200).json(builder);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
}
