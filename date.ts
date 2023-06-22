export type Zone = "local" | "utc";

export const short_utc = (utc_ts: number) =>{
  const utc = new Date(utc_ts),
    fmt = utc.toJSON()
      .replaceAll(":", "")
      .replaceAll("-", "")
      .slice(0, 15)
  return `${fmt}Z`
}

export function parseDate(
  date: DateData | undefined,
  zone: Zone = "local",
) {
  if (date === undefined) return;

  if (date instanceof Date) {
    date = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ];
  }
  return formatDate(date, zone);
}

type DateArray = number[];
export type DateData = DateArray | Date;

// The following code is copied from https://github.com/adamgibbons/ics/blob/master/src/utils/format-date.js
// Tiny modification is done to make it compatible with typescript

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

function formatDate(
  args: number[] = [],
  zone: Zone = "local",
) {
  if (Array.isArray(args) && args.length === 3) {
    const [year, month, date] = args;
    return `${year}${pad(month)}${pad(date)}`;
  }

  let outDate = new Date(new Date().setUTCSeconds(0, 0));
  if (Array.isArray(args) && args.length > 0 && args[0]) {
    const [year, month, date, hours = 0, minutes = 0, seconds = 0] = args;
    if (zone === "local") {
      outDate = new Date(year, month - 1, date, hours, minutes, seconds);
    } else {
      outDate = new Date(
        Date.UTC(year, month - 1, date, hours, minutes, seconds),
      );
    }
  }

  if (zone === "local") {
    const year = outDate.getFullYear(),
      month = outDate.getMonth() + 1,
      day = outDate.getDate(),
      hour = outDate.getHours(),
      minute = outDate.getMinutes(),
      second = outDate.getSeconds();
    return `${(year)}${pad(month)}${pad(day)}T${pad(hour)}${pad(minute)}${pad(second)}`;
  }
    return short_utc(outDate.valueOf());
}
