import { parseDate, DateData } from './date.ts';

export interface RecurrenceRule {
  freq: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  until?: DateData;
  interval?: number;
  count?: number;
}

export function parseRRule(rrule: RecurrenceRule | undefined) {
  if (rrule === undefined) return;

  const { freq, until, interval, count } = rrule;

  return [
    ['FREQ', freq],
    ['UNTIL', parseDate(until)],
    ['INTERVAL', interval],
    ['COUNT', count],
  ]
    .filter(line => line[1] !== undefined)
    .map(line => `${line[0]}=${line[1]};`)
    .join('');
}
