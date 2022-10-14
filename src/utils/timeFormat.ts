import { format } from "date-fns";
import { formatInTimeZone, zonedTimeToUtc } from "date-fns-tz";
import { useTimezoneStore } from "~/store/timezone";

export const formatBirthDay = (date: Date) => format(date, "Y/MM/dd");
export const formatDate = (date: Date) => format(date, "Y/MM/dd");
export const formatDateTime = (date: Date) => {
  const timezoneStore = useTimezoneStore();

  return formatInTimeZone(date, timezoneStore.timezone, "Y/MM/dd HH:mm:ss");
};
export const formatScheduleTime = (date: Date) => {
  const timezoneStore = useTimezoneStore();

  return formatInTimeZone(date, timezoneStore.timezone, "Y/MM/dd HH:mm");
};

export const formatClock = (date: Date) => {
  const timezoneStore = useTimezoneStore();

  return formatInTimeZone(
    date,
    timezoneStore.timezone,
    "Y/MM/dd hh:mm:ss a XX"
  );
};

export const parseZonedTimeToUtc = (date: Date) => {
  const timezoneStore = useTimezoneStore();
  const utcDate = zonedTimeToUtc(date, timezoneStore.timezone);
  return utcDate.toISOString();
};
