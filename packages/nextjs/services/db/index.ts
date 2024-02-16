import { Build } from "./build";
import { Notification } from "./notification";
import { User } from "./user";
import { Typesaurus, schema } from "typesaurus";

// Generate the db object from given schem that you can use to access
// Firestore, i.e.:
//   await db.get(userId)
export const db = schema($ => ({
  users: $.collection<User>(),
  notifications: $.collection<Notification>(),
  builds: $.collection<Build>(),
}));

// Infer schema type helper with shortcuts to types in your database:
//   function getUser(id: Schema["users"]["Id"]): Schema["users"]["Result"]
export type Schema = Typesaurus.Schema<typeof db>;
