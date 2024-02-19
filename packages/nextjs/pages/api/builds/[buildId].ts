import { NextApiRequest, NextApiResponse } from "next";
import { deleteBuild, findBuild, updateBuild } from "~~/services/db/build";
import "~~/services/firbase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { buildId } = req.query;
    const builder = await findBuild(buildId as string);
    return res.status(200).json(builder);
  }

  if (req.method === "POST ") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  if (req.method == "PATCH") {
    const { buildId } = req.query;
    const { demoUrl, videoUrl, desc, image, name, builder, coBuilders } = req.body;
    console.log("EDIT /builds/", buildId);
    await updateBuild(buildId as string, demoUrl, videoUrl, desc, image, name, builder, coBuilders);
    return res.status(200).end();
  }

  if (req.method == "DELETE") {
    const { buildId } = req.query;
    console.log("EDIT /builds/", buildId);
    await deleteBuild(buildId as string);
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
