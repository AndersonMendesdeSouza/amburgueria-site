import { useEffect, useMemo, useState } from "react";
import { SystemSettingsService } from "../service/system-settings.service";
import {
  DEFAULT_STORE_SETTINGS,
  getStoreStatusFromSettings,
  type StoreSettings,
} from "../utils/storeHours";

export function useStoreStatus() {
  const [settings, setSettings] = useState<StoreSettings>(
    DEFAULT_STORE_SETTINGS,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let active = true;

    async function loadAvailability() {
      try {
        const data = await SystemSettingsService.orderingAvailability();

        if (!active) return;

        setSettings({
          openingTime: data.openingTime,
          closingTime: data.closingTime,
          timezone: data.timezone,
          ordersEnabled: data.ordersEnabled,
          available: data.available,
          reason: data.reason,
        });
        setError("");
      } catch {
        if (!active) return;
        setSettings(DEFAULT_STORE_SETTINGS);
        setError("Não foi possível consultar o horário da loja.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadAvailability();
    const availabilityId = window.setInterval(loadAvailability, 60 * 1000);
    const clockId = window.setInterval(() => setNow(Date.now()), 30 * 1000);

    return () => {
      active = false;
      window.clearInterval(availabilityId);
      window.clearInterval(clockId);
    };
  }, []);

  const status = useMemo(
    () => getStoreStatusFromSettings(settings, new Date(now)),
    [settings, now],
  );

  return {
    ...status,
    settings,
    loading,
    error,
  };
}
