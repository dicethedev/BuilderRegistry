import { NextApiRequest, NextApiResponse } from "next";
import { findUser, updateUser } from "~~/services/db/user";
import "~~/services/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { builderAddress } = req.query;
      const builder = await findUser(builderAddress as string);
      return res.status(200).json(builder);
    } catch (error: any) {
      return res.status(500).json({ message: "Method not allowed" });
    }
  }

  if (req.method === "PATCH") {
    try {
      const { builderAddress } = req.query;
      const { status, socialLinks, skills } = req.body;
      console.log(`EDIT /builders/${builderAddress}`, builderAddress);
      const builder = await findUser(builderAddress as string);
      if (builder.exist === false) return res.status(404).json({ message: "Builder not found." });
      await updateUser(builderAddress as string, status, socialLinks, skills);
      return res.status(200).end();
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  /**
   * TODOs
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
