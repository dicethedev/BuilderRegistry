import { isAddress } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import { deletePoap } from "~~/services/db/poap";
import "~~/services/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    if (!isAddress(req.query.address as string)) return res.status(400).json({ message: "Invalid address." });
    try {
      await deletePoap(req.query.address as string);
      return res.status(200).end();
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  return res.status(405).json({ message: "Method not allowed." });
}
