import { NextApiRequest, NextApiResponse } from "next";
import { createNotification, findAllNotifications } from "~~/services/db/notification";
import "~~/services/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const notifications = await findAllNotifications();
    return res.status(200).json(notifications);
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
    const { component, active, title, content, criteria } = req.body;
    if (!active || !title || !content) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const newNotification = await createNotification(component, active, title, criteria, component);
    // Respond with the new  user
    return res.status(201).json(newNotification);
  } catch (error: any) {
    console.error("Error creating new notification:", error);
    return res.status(500).json({ message: "An unexpected error occurred while creating the user." });
  }
}
