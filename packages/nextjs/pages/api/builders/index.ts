import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import { createUser, findAllUserAndBuilds, findUser } from "~~/services/db/user";
import "~~/services/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const builders = await findAllUserAndBuilds();
    return res.status(200).json(builders);
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
    const { role, ens, functionTitle, address, status, socialLinks, skills } = req.body;
    if (!role || !ens || !functionTitle || !address) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    if (!ethers.isAddress(address)) {
      res.status(400).send({ error: "Invalid address" });
      return;
    }

    const user = await findUser(address);

    if (user?.id) {
      res.status(204).end();
      return;
    }

    const builderData = {
      creationTimestamp: new Date().getTime(),
      role,
      functionTitle,
      ens,
    };

    console.log(builderData);
    const newBuilder = await createUser(role, ens, functionTitle, address, status, socialLinks, skills);
    // Respond with the new  user
    res.status(201).json(newBuilder);
  } catch (error: any) {
    console.error("Error creating  new  builder:", error);
    res.status(500).json({ message: "An unexpected error occurred while creating the user." });
  }
}
