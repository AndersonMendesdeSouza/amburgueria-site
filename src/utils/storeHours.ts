export type StoreSettings = {
  openingTime: string;
  closingTime: string;
  timezone: string;
  ordersEnabled: boolean;
  available?: boolean;
  reason?: string;
};

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  openingTime: "09:00",
  closingTime: "17:00",
  timezone: "America/Sao_Paulo",
  ordersEnabled: true,
};

function timeToMinutes(time: string) {
  const [hour = "0", minute = "0"] = time.slice(0, 5).split(":");
  return Number(hour) * 60 + Number(minute);
}

function getCurrentMinutes(date: Date, timezone: string) {
  const parts = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: timezone,
  }).formatToParts(date);

  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(
    parts.find((part) => part.type === "minute")?.value ?? 0,
  );

  return hour * 60 + minute;
}

export function isOpenNowBySettings(settings: StoreSettings, date = new Date()) {
  if (!settings.ordersEnabled) return false;

  if (typeof settings.available === "boolean") {
    return settings.available;
  }

  const current = getCurrentMinutes(date, settings.timezone);
  const open = timeToMinutes(settings.openingTime);
  const close = timeToMinutes(settings.closingTime);

  if (open === close) return true;
  if (open < close) return current >= open && current < close;
  return current >= open || current < close;
}

export function hoursUntilOpen(settings: StoreSettings, date = new Date()) {
  if (isOpenNowBySettings(settings, date)) return 0;

  const current = getCurrentMinutes(date, settings.timezone);
  const open = timeToMinutes(settings.openingTime);
  const diff = current < open ? open - current : 24 * 60 - current + open;

  return Math.max(1, Math.ceil(diff / 60));
}

export function getStoreStatusFromSettings(
  settings: StoreSettings,
  date = new Date(),
) {
  const openNow = isOpenNowBySettings(settings, date);

  return {
    openNow,
    openHour: settings.openingTime.slice(0, 5),
    closeHour: settings.closingTime.slice(0, 5),
    hoursToOpen: openNow ? 0 : hoursUntilOpen(settings, date),
    reason: settings.reason,
  };
}
