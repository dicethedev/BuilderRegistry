import { Result, Schema, db, toResult } from "~~/services/db";

export interface Notification {
  criteria?: Criteria;
  title: string;
  content?: string;
  active: boolean;
  component?: string;
}

export interface Criteria {
  minBuilds?: number;
  daysJoinedBefore?: number;
  hasStream?: boolean;
  daysJoinedAfter?: number;
}

export type NotificationDoc = Schema["notifications"]["Doc"];
export type NotificationResult = Result<Notification>;

export async function findAllNotifications(): Promise<NotificationResult[]> {
  const notificationsSnaphot = await db.notifications.all();
  const notifications = notificationsSnaphot.map(notification => toResult<Notification>(notification));
  return notifications;
}

export async function createNotification(
  title: string,
  active: boolean,
  content?: string,
  criteria?: Criteria,
  component?: string,
): Promise<NotificationResult> {
  const ref = await db.notifications.add(() => ({
    title,
    active,
    content,
    criteria,
    component,
  }));
  const notificationsSnapshot = await db.notifications.get(ref.id);
  return toResult<Notification>(notificationsSnapshot);
}
