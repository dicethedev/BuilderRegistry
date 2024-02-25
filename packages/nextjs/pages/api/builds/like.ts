import { NextApiRequest, NextApiResponse } from "next";
import { likeBuild } from "~~/services/db/build";
import "~~/services/firbase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    console.log(`POST /bounties/apply`);
    const { buildId, userAddress } = req.body;
    await likeBuild(buildId, userAddress);
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }
}
