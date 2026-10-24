import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";

export const useHaptics = () => {
  const impact = async (style: "light" | "medium" | "heavy" = "medium") => {
    const map = { light: ImpactStyle.Light, medium: ImpactStyle.Medium, heavy: ImpactStyle.Heavy };
    await Haptics.impact({ style: map[style] });
  };

  const notify = async (type: "success" | "warning" | "error" = "success") => {
    const map = { success: NotificationType.Success, warning: NotificationType.Warning, error: NotificationType.Error };
    await Haptics.notification({ type: map[type] });
  };

  const vibrate = async (duration = 100) => {
    await Haptics.vibrate({ duration });
  };

  return { impact, notify, vibrate };
};