import { users } from "~~/local_database/user.json";
import { db } from "~~/services/db";
import "~~/services/firbase";

export async function seedDatabase() {
  const existingUsers = await db.users.all();
  if (existingUsers.length > 0) {
    console.log("*** Local firebase is not empty. Skipping seed import...");
    return;
  }

  Object.entries(users).forEach(([userId, userData]) => {
    //console.log(userId, userData);
    console.log(userId, userData);
  });
}
