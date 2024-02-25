import { NextApiRequest, NextApiResponse } from "next";
import { applyForBounty } from "~~/services/db/bounty";
import "~~/services/firbase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    console.log(`POST /bounties/apply`);
    const { bountyId, userAddress } = req.body;
    await applyForBounty(bountyId, userAddress);
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }
}
