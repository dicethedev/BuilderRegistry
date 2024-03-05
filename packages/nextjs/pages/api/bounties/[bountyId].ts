import { NextApiRequest, NextApiResponse } from "next";
import { deleteBounty, findBounty, updateBounty } from "~~/services/db/bounty";
import "~~/services/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { bountyId } = req.query;
    const bounty = await findBounty(bountyId as string);
    return res.status(200).json(bounty);
  }

  if (req.method === "POST ") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  if (req.method == "PATCH") {
    const { bountyId } = req.query;
    const { title, deadline, skills, details, resources } = req.body;
    console.log(`EDIT /bounties/${bountyId}`, bountyId);
    await updateBounty(bountyId as string, title, deadline, skills, details, resources);
    return res.status(200).end();
  }

  if (req.method == "DELETE") {
    const { bountyId } = req.query;
    console.log(`DELETE /bounties/${bountyId}`, bountyId);
    await deleteBounty(bountyId as string);
    return res.status(200).end();
  }

  /** TODOs
   * INCLUDE SENDER SIGNATURE IN REQUEST
   * VERIFY SENDER IS AN ADMIN
   **/

  // try {
  //   const { role, ens, functionTitle } = req.body;
  //   if (!role || !ens || !functionTitle) {
  //     return res.status(400).json({ error: "Missing required fields." });
  //   }
  //   const newBuilder = await createUser(role, ens, functionTitle);
  //   // Respond with the new  user
  //   res.status(201).json(newBuilder);
  // } catch (error: any) {
  //   console.error("Error creating  new  builder:", error);
  //   res.status(500).json({ message: "An unexpected error occurred while creating the user." });
  // }
}
