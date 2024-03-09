import { NextApiRequest, NextApiResponse } from "next";
import { applyForBounty } from "~~/services/db/bounty";
import "~~/services/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      console.log(`POST /bounties/apply`);
      const { bountyId, userAddress } = req.body;
      await applyForBounty(bountyId, userAddress);
      return res.status(200).end();
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }
}
