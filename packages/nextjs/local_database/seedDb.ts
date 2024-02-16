import fs from "fs";
import { db } from "~~/services/db";
import { Notification, createNotification } from "~~/services/db/notification";
import { User, createUser } from "~~/services/db/user";
import "~~/services/firbase";

export async function seedDatabase() {
  const existingUsers = await db.users.all();
  if (existingUsers.length > 0) {
    console.log("*** Local firebase is not empty. Skipping seed import...");
    return;
  }

  const USER_SEED_DATA = "./local_database/users.json";
  const seedUsers = JSON.parse(fs.readFileSync(USER_SEED_DATA, "utf8"));

  const NOTIFICATION_SEED_DATA = "./local_database/notifications.json";
  const seedNotifications = JSON.parse(fs.readFileSync(NOTIFICATION_SEED_DATA, "utf8"));

  Object.entries(seedUsers.users).forEach(async ([userId, userData]) => {
    const { role, ens, function: functionTitle, status, socialLinks } = userData as User;
    await createUser(role, ens, functionTitle, userId, status, socialLinks);
  });

  Object.entries(seedNotifications.notifications).forEach(async ([, notificationData]) => {
    const { title, active, content, criteria, component } = notificationData as Notification;
    await createNotification(title, active, content, criteria, component);
  });
}
