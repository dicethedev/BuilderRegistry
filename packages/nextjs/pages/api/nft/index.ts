import { NextApiRequest, NextApiResponse } from "next";
import { createPoap, getAllPoap } from "~~/services/db/poap";
import "~~/services/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const poaps = await getAllPoap();
      return res.status(200).json(poaps);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  if (req.method === "POST") {
    try {
      const { name, chainId, chain, tokenAddress } = req.body;
      if (!name || !chainId || !chain || !tokenAddress) return res.status(400).json({ message: "Missing parameters" });
      const poap = await createPoap(tokenAddress, chain, chainId, name);
      return res.status(200).json(poap);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed." });
}
