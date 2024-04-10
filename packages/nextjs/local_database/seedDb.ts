import fs from "fs";
import { db } from "~~/services/db";
import { Bounty, applyForBounty, createBounty } from "~~/services/db/bounty";
import { Build, createBuild } from "~~/services/db/build";
import { Notification, createNotification } from "~~/services/db/notification";
import { User, createUser } from "~~/services/db/user";
import "~~/services/firebase";

export async function seedDatabase() {
  const existingUsers = await db.users.all();
  if (existingUsers.length > 0) {
    console.log("*** Local firebase is not empty. Skipping seed import...");
    return;
  }

  const USER_SEED_DATA = "./local_database/users.json";
  const seedUsers = JSON.parse(fs.readFileSync(USER_SEED_DATA, "utf8"));

  Object.entries(seedUsers.users).forEach(async ([userId, userData]) => {
    const { role, ens, function: functionTitle, status, socialLinks, skills } = userData as User;
    await createUser(role, ens, functionTitle, userId, status, socialLinks, skills);
  });

  const NOTIFICATION_SEED_DATA = "./local_database/notifications.json";
  const seedNotifications = JSON.parse(fs.readFileSync(NOTIFICATION_SEED_DATA, "utf8"));

  Object.entries(seedNotifications.notifications).forEach(async ([, notificationData]) => {
    const { title, active, content, criteria, component } = notificationData as Notification;
    await createNotification(title, active, content, criteria, component);
  });

  const BUILD_SEED_DATA = "./local_database/builds.json";
  const seedBuilds = JSON.parse(fs.readFileSync(BUILD_SEED_DATA, "utf8"));

  Object.entries(seedBuilds.builds).forEach(async ([, buildData]) => {
    const { branch, demoUrl, videoUrl, desc, image, name, builder, coBuilders, likes } = buildData as Build;
    await createBuild(branch, demoUrl, videoUrl, desc, image, name, builder, coBuilders, likes);
  });

  const BOUNTY_SEED_DATA = "./local_database/bounty.json";
  const seedBounties = JSON.parse(fs.readFileSync(BOUNTY_SEED_DATA, "utf8"));

  Object.entries(seedBounties.bounties).forEach(async ([, bountyData]) => {
    const { title, details, deadLine, applications, createdBy, skills, resources, announcementDate, reward } =
      bountyData as Bounty;
    const bounty = await createBounty(title, createdBy, deadLine, skills, details, resources, announcementDate, reward);
    applications.forEach(async application => {
      await applyForBounty(application, bounty.id);
    });
  });
}
