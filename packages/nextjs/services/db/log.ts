import { Result, Schema, db, toResult } from "~~/services/db";

export interface Log {
  type: string;
  timestamp: number;
  signature?: string;
  payload: object;
}

export type LogDoc = Schema["logs"]["Doc"];
export type LogResult = Result<Log>;

export async function createLog(type: string, signature: string, payload: object): Promise<LogResult> {
  const ref = await db.logs.add(() => ({ type, signature, timestamp: Date.now(), payload }));
  const notificationsSnapshot = await db.logs.get(ref.id);
  return toResult<LogResult>(notificationsSnapshot);
}
