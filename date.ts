export default function parseDate(date: DateData) {
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
  return formatDate(date);
}

type DateArray = number[];
export type DateData = DateArray | Date;

// The following code is copied from https://github.com/adamgibbons/ics/blob/master/src/utils/format-date.js

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

function formatDate(
  args: number[] = [],
  outputType = 'utc',
  inputType = 'local'
) {
  if (Array.isArray(args) && args.length === 3) {
    const [year, month, date] = args;
    return `${year}${pad(month)}${pad(date)}`;
  }

  let outDate = new Date(new Date().setUTCSeconds(0, 0));
  if (Array.isArray(args) && args.length > 0 && args[0]) {
    const [year, month, date, hours = 0, minutes = 0, seconds = 0] = args;
    if (inputType === 'local') {
      outDate = new Date(year, month - 1, date, hours, minutes, seconds);
    } else {
      outDate = new Date(
        Date.UTC(year, month - 1, date, hours, minutes, seconds)
      );
    }
  }

  if (outputType === 'local') {
    return [
      outDate.getFullYear(),
      pad(outDate.getMonth() + 1),
      pad(outDate.getDate()),
      'T',
      pad(outDate.getHours()),
      pad(outDate.getMinutes()),
      pad(outDate.getSeconds()),
    ].join('');
  }

  return [
    outDate.getUTCFullYear(),
    pad(outDate.getUTCMonth() + 1),
    pad(outDate.getUTCDate()),
    'T',
    pad(outDate.getUTCHours()),
    pad(outDate.getUTCMinutes()),
    pad(outDate.getUTCSeconds()),
    'Z',
  ].join('');
}
