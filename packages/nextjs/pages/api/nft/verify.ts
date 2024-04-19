import { NextApiRequest, NextApiResponse } from "next";
import { deletePoap } from "~~/services/db/poap";
import "~~/services/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { address, tokenAddress } = req.body;
      if (!address || !tokenAddress) return res.status(400).json({ message: "Missing parameters" });
      const nft = await deletePoap(tokenAddress);
      return res.status(200).json(nft);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed." });
}
