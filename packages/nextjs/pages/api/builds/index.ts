import { NextApiRequest, NextApiResponse } from "next";
import { createBuild, findAllBuilds } from "~~/services/db/build";
import "~~/services/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const builders = await findAllBuilds();
      return res.status(200).json(builders);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  if (req.method === "POST") {
    try {
      const { demoUrl, image, coBuilders, videoUrl, name, builder, branch, desc } = req.body;
      if (!demoUrl || !image || !coBuilders || !name || !builder || !branch || !desc)
        return res.status(400).json({ message: "Missing parameters" });
      const build = await createBuild(branch, demoUrl, videoUrl, desc, image, name, builder, coBuilders);
      return res.status(200).json(build);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed." });
}
