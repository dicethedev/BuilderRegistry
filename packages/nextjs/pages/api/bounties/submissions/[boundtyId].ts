import { NextApiRequest, NextApiResponse } from "next";
import { fetchBountySubmission, findBounty, submitBounty } from "~~/services/db/bounty";
import "~~/services/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { boundtyId } = req.query;
      const submissions = await fetchBountySubmission(boundtyId as string);
      return res.status(200).json(submissions);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { boundtyId } = req.query;
      const { userAddress, description } = req.body;
      if (!boundtyId || !userAddress || !description) return res.status(400).json({ message: "Missing parameters" });
      const bounty = await findBounty(boundtyId as string);
      console.log(bounty);
      if (bounty.exist === false) return res.status(404).json({ message: "Bounty not found" });
      const submission = await submitBounty(boundtyId as string, userAddress as string, description as string);
      return res.status(200).json(submission);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
