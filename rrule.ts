import { parseDate, DateData } from './date.ts';

export interface RecurrenceRule {
  freq: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  until?: DateData;
  interval?: number;
  count?: number;
  byDay?: Day[];
}

export function parseRRule(rrule: RecurrenceRule | undefined) {
  if (rrule === undefined) return;

  const { freq, until, interval, count, byDay } = rrule;

  return [
    ['FREQ', freq],
    ['UNTIL', parseDate(until)],
    ['INTERVAL', interval],
    ['COUNT', count],
    ['BYDAY', byDay ? byDay.join() : undefined],
  ]
    .filter(line => line[1] !== undefined)
    .map(line => `${line[0]}=${line[1]};`)
    .join('');
}

export type Day = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';
