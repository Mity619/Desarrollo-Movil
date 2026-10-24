import { useEffect, useState } from "react";
import { PushNotifications } from "@capacitor/push-notifications";

export const usePushNotifications = () => {
  const [token, setToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<any>(null);

  const requestPermission = async () => {
    const result = await PushNotifications.requestPermissions();
    if (result.receive === "granted") {
      await PushNotifications.register();
    }
  };

  useEffect(() => {
    PushNotifications.addListener("registration", (t) => setToken(t.value));
    PushNotifications.addListener("pushNotificationReceived", (n) => setNotification(n));
    
    return () => {
      PushNotifications.removeAllListeners();
    };
  }, []);

  return { token, notification, requestPermission };
};