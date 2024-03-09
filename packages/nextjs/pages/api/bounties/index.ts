import { NextApiRequest, NextApiResponse } from "next";
import { createBounty, findAllBounties } from "~~/services/db/bounty";
import "~~/services/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { fetch_disabled } = req.query;
      const bounties = await findAllBounties(fetch_disabled === "true");
      return res.status(200).json(bounties);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  /**
   * TODOs
   * INCLUDE SENDER SIGNATURE IN REQUEST
   * VERIFY SENDER IS AN ADMIN
   **/

  try {
    const { title, createdBy, deadline, skills, details, resources, announcementDate, reward } = req.body;
    if (!title || !createdBy || !deadline || !skills || !details || !resources || !announcementDate || !reward) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const newBounty = await createBounty(
      title,
      createdBy,
      deadline as Date,
      skills,
      details,
      resources,
      announcementDate as Date,
      reward,
    );
    // Respond with the new  bounty
    res.status(201).json(newBounty);
  } catch (error: any) {
    res.status(500).json({ message: "An unexpected error occurred while creating the user." });
  }
}
