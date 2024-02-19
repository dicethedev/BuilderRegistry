import { db } from "~~/services/db";

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

interface NotificationResult extends Notification {
  id: string;
}

export async function findAllNotifications(): Promise<NotificationResult[]> {
  const notificationsSnaphot = await db.notifications.all();
  const notifications = notificationsSnaphot.map(notification => ({
    id: notification?.ref?.id as string,
    ...(notification?.data as Notification),
  }));
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
  const notification = {
    id: notificationsSnapshot?.ref?.id as string,
    ...(notificationsSnapshot?.data as Notification),
  };
  return notification;
}
