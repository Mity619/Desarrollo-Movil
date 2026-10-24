import { useEffect, useState } from "react";
import { Device } from "@capacitor/device";

export const useDevice = () => {
  const [battery, setBattery] = useState<any>(null);
  const [info, setInfo] = useState<any>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setBattery(await Device.getBatteryInfo());
      setInfo(await Device.getInfo());
      const id = await Device.getId();
      setDeviceId(id.identifier);
      setLoading(false);
    };
    loadData();
  }, []);

  return { battery, info, deviceId, loading };
};