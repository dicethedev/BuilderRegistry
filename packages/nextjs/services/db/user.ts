import { Schema, db } from "~~/services/db";

export interface User {
  creationTimestamp: number;
  role: string;
  ens: string;
  function: string;
}

interface UserResult {
  id: string;
  data: User;
}

export async function findAllUsers(): Promise<UserResult[]> {
  const usersSnaphot = await db.users.all();
  const users = usersSnaphot.map(user => ({ id: user?.ref?.id as string, data: user?.data as User }));
  return users;
}

export async function findUser(id: Schema["users"]["Id"]): Promise<UserResult> {
  const userSnapshot = await db.users.get(id);
  const user = { id: userSnapshot?.ref?.id as string, data: userSnapshot?.data as User };
  return user;
}

export async function createUser(role: string, ens: string, functionTitle: string): Promise<UserResult> {
  const ref = await db.users.add(() => ({
    role,
    ens,
    function: functionTitle,
    creationTimestamp: Date.now(),
  }));

  const userSnapshot = await db.users.get(ref.id);
  const user = { id: userSnapshot?.ref?.id as string, data: userSnapshot?.data as User };
  return user;
}
