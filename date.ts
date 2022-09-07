import formatDate from 'https://raw.githubusercontent.com/adamgibbons/ics/master/src/utils/format-date.js';

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
