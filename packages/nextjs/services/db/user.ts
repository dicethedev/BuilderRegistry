import { Build, BuildResult } from "../db/build";
import { Result, Schema, db, toResult } from "~~/services/db";

export interface User {
  creationTimestamp: number;
  role: string;
  ens: string;
  function: string;
  status?: Status;
  socialLinks?: SocialLinks;
  skills: string[];
}

export interface SocialLinks {
  telegram: string;
  twitter: string;
  github: string;
  discord: string;
  email: string;
  instagram: string;
}

export interface Status {
  text: string;
  timestamp: number;
}

export interface BuilderFuntionsStats {
  name: string;
  count: number;
  total: number;
}

export type UserDoc = Schema["users"]["Doc"];
export type UserResult = Result<User>;

export interface UserAndBuildsResult extends UserResult {
  builds: BuildResult[];
}

export async function findAllUsers(): Promise<UserResult[]> {
  const usersSnaphot = await db.users.all();
  const users = usersSnaphot.map(user => toResult<User>(user));
  return users;
}

export async function findAllUserAndBuilds(): Promise<UserAndBuildsResult[]> {
  const users = await findAllUsers();
  const usersAndBuilds = [];
  for (let index = 0; index < users.length; index++) {
    const userAndBuild = await findUserAndBuilds(users[index].id);
    usersAndBuilds.push(userAndBuild);
  }
  return usersAndBuilds;
}

export async function findUserAndBuilds(address: string): Promise<UserAndBuildsResult> {
  const user = await findUser(address);
  const userBuilds = (
    await db.builds.query($ => $.or($.field("builder").eq(address), $.field("coBuilders").contains(address)))
  ).map(build => toResult<Build>(build));
  return { ...user, builds: [...userBuilds], exist: user.exist };
}

export async function findUser(address: string): Promise<UserResult> {
  const userSnapshot = await db.users.get(db.users.id(address));
  return toResult<User>(userSnapshot);
}

export async function createUser(
  role: string,
  ens: string,
  functionTitle: string,
  address: string,
  status?: Status,
  socialLinks?: SocialLinks,
  skills?: string[],
): Promise<UserResult> {
  const userAddress = db.users.id(address);
  const ref = await db.users.set(userAddress, () => ({
    role,
    ens,
    function: functionTitle,
    creationTimestamp: Date.now(),
    status: status || { text: "Hi i am new here", timestamp: Date.now() },
    socialLinks: socialLinks,
    skills: skills || [],
  }));
  const userSnapshot = await db.users.get(ref.id);
  return toResult<User>(userSnapshot);
}

export async function getUserFunctionStats(): Promise<BuilderFuntionsStats[]> {
  const functionsTypesMap = new Map();
  const users = await findAllUsers();
  users.map(user => {
    if (!functionsTypesMap.has(user.function)) {
      functionsTypesMap.set(user.function, 1);
    } else {
      functionsTypesMap.set(user.function, functionsTypesMap.get(user.function) + 1);
    }
  });
  const builderFuntionsStats: BuilderFuntionsStats[] = [];
  for (const [key, value] of functionsTypesMap) {
    builderFuntionsStats.push({ name: key, count: value, total: users.length });
  }
  return builderFuntionsStats;
}

export async function updateUser(
  address: string,
  status: string,
  socialLinks: SocialLinks,
  skills: string[],
): Promise<UserResult> {
  const userSnapshot = await db.users.get(db.users.id(address));
  await userSnapshot?.ref?.update(() => ({
    status: { text: status, timestamp: Date.now() },
    socialLinks,
    skills,
  }));
  return toResult<User>(userSnapshot);
}
