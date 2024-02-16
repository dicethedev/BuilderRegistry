import { NextApiRequest, NextApiResponse } from "next";
import { createUser, findAllUsers } from "~~/services/db/user";
import "~~/services/firbase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const users = await findAllUsers();
    return res.status(200).json(users);
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
    const { role, ens, functionTitle } = req.body;
    const newUser = await createUser(role, ens, functionTitle);
    // Respond with the new  user
    res.status(201).json(newUser);
  } catch (error: any) {
    console.error("Error creating  new user:", error);
    res.status(500).json({ message: "An unexpected error occurred while creating the user." });
  }
}