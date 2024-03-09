import { NextApiRequest, NextApiResponse } from "next";
import { disableBounty, enableBounty } from "~~/services/db/bounty";
import "~~/services/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PATCH") {
    try {
      console.log(`PATCH /bounties/disable`);
      const { bountyId, option } = req.body;
      if (!bountyId) return res.status(400).json({ error: "Missing required fields." });
      if (option) {
        await disableBounty(bountyId);
        return res.status(200).end();
      }
      await enableBounty(bountyId);
      return res.status(200).end();
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed." });
  }
}
