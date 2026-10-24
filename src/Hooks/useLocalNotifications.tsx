import { useState } from "react";
import { LocalNotifications } from "@capacitor/local-notifications";

export const useLocalNotifications = () => {
  const [permission, setPermission] = useState<string | null>(null);

  const requestPermission = async () => {
    const result = await LocalNotifications.requestPermissions();
    setPermission(result.display);
    return result.display === "granted";
  };

  const sendNotification = async (title: string, body: string) => {
    await LocalNotifications.schedule({
      notifications: [{ id: Date.now(), title, body }],
    });
  };

  const scheduleNotification = async (title: string, body: string, seconds: number = 5) => {
    await LocalNotifications.schedule({
      notifications: [{
        id: Date.now(),
        title,
        body,
        schedule: { at: new Date(Date.now() + seconds * 1000) },
      }],
    });
  };

  return { permission, requestPermission, sendNotification, scheduleNotification };
};