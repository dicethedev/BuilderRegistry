import { db } from "~~/services/db";

export interface User {
  creationTimestamp: number;
  role: string;
  ens: string;
  function: string;
  status?: Status;
  socialLinks?: SocialLinks;
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

export async function findAllUsers(): Promise<UserResult[]> {
  const usersSnaphot = await db.users.all();
  const users = usersSnaphot.map(user => ({ id: user?.ref?.id as string, ...(user?.data as User) }));
  return users;
}

export async function findUser(id: string): Promise<UserResult> {
  const userSnapshot = await db.users.get(db.users.id(id));
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
): Promise<UserResult> {
  const userAddress = db.users.id(address);
  const ref = await db.users.set(userAddress, () => ({
    role,
    ens,
    function: functionTitle,
    creationTimestamp: Date.now(),
    status,
    socialLinks,
  }));
  const userSnapshot = await db.users.get(ref.id);
  const user = { id: userSnapshot?.ref?.id as string, ...(userSnapshot?.data as User) };
  return user;
}
