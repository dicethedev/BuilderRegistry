import { BuildResult, toBuildResult } from "../db/build";
import { db } from "~~/services/db";

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

interface UserResult extends User {
  id: string;
}

export interface UserAndBuildsResult extends UserResult {
  builds: BuildResult[];
}

export async function findAllUsers(): Promise<UserResult[]> {
  const usersSnaphot = await db.users.all();
  const users = usersSnaphot.map(user => ({ id: user?.ref?.id as string, ...(user?.data as User) }));
  return users;
}

export async function findUserAndBuilds(address: string): Promise<UserAndBuildsResult> {
  const userSnapshot = await db.users.get(db.users.id(address));
  const user = { id: userSnapshot?.ref?.id as string, ...(userSnapshot?.data as User) };
  const userBuilds = (await db.builds.query($ => $.field("builder").eq(address))).map(build => toBuildResult(build));
  return { ...user, builds: userBuilds };
}
export async function findUser(address: string): Promise<UserResult> {
  const userSnapshot = await db.users.get(db.users.id(address));
  const user = { id: userSnapshot?.ref?.id as string, ...(userSnapshot?.data as User) };
  return user;
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
    status,
    socialLinks,
    skills: skills || [],
  }));
  const userSnapshot = await db.users.get(ref.id);
  const user = { id: userSnapshot?.ref?.id as string, ...(userSnapshot?.data as User) };
  return user;
}
