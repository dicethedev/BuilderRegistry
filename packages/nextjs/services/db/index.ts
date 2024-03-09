import { Bounty, Submisssion } from "./bounty";
import { Build } from "./build";
import { Log } from "./log";
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
  bounties: $.collection<Bounty>().sub({
    submissions: $.collection<Submisssion>(),
  }),
  logs: $.collection<Log>(),
}));

// Infer schema type helper with shortcuts to types in your database:
//   function getUser(id: Schema["users"]["Id"]): Schema["users"]["Result"]
export type Schema = Typesaurus.Schema<typeof db>;

export type SchemaKeys = keyof Schema;
export type SubSchemas = Schema[SchemaKeys]["sub"];
export type SubSchemaKeys = keyof SubSchemas;
export type Document = Schema[SchemaKeys]["Doc"];
export type SubDocument = SubSchemas[SubSchemaKeys]["Doc"];

export type Result<T> = {
  id: string;
} & T & {
    exist: boolean;
  };

export function toResult<U>(doc: Document | SubDocument | null): Result<U> {
  return { id: doc?.ref?.id as string, ...(doc?.data as U), exist: !!doc };
}
