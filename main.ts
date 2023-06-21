import { crypto } from 'https://deno.land/std@0.154.0/crypto/mod.ts';
import { parseDate, DateData, Zone } from './date.ts';
import { ContentLine, stringifyLines } from './stringify.ts';
import { parseRRule, RecurrenceRule } from './rrule.ts';

const calendarBegin: ContentLine = ['BEGIN', 'VCALENDAR'];

const calendarProps: ContentLine[] = [
  ['VERSION', '2.0'],
  ['PRODID', 'peron/simple_ics'],
  ['METHOD', 'PUBLISH'],
];

const calendarEnd: ContentLine = ['END', 'VCALENDAR'];

const eventBegin: ContentLine = ['BEGIN', 'VEVENT'];

const eventEnd: ContentLine = ['END', 'VEVENT'];

const parseGeo = (geo?: {lat: number, lon: number}) => {
  return geo ? `${geo.lat};${geo.lon}` : undefined;
}

const parseOrganizer = (organizer?: {name: string, email: string}) => {
  return organizer? `CN=${organizer.name}:mailto:${organizer.email}` : undefined
}

export class Event {
  zone: Zone = 'local'
  constructor (protected config: EventConfig) {
    if (config.zone) this.zone = config.zone
    if (config.duration !== undefined) {
      // Duration is provided
      if (!(config.beginDate instanceof Date)) {
        // Convert beginDate to Date object
        config.beginDate = Date.constructor.apply(null, config.beginDate);
      }
      // Calculate endDate
      const endStamp =
        (config.beginDate.valueOf() as number) + config.duration * 1e3;
      config.endDate = new Date(endStamp);
    } else if (config.endDate === undefined) {
      // Neither duration nor endDate is provided
      throw new TypeError(
        'Invalid Event Config, either duration or endDate should be provided'
      );
    }
  }

  toLines(): ContentLine[] {
    const uid = crypto.randomUUID();
    const { title, desc, rrule, alarm, location, url, organizer, geo, htmlContent } = this.config;

    const result = [
      eventBegin,
      ['UID', uid],
      ['DTSTAMP', parseDate(new Date(), "gmt")],
      ['DTSTART', parseDate(this.config.beginDate, this.zone)],
      ['DTEND', parseDate(this.config.endDate!, this.zone)],
      ['SUMMARY', title],
      ['DESCRIPTION', desc],
      ['LOCATION', location],
      ['URL', url],
      ['GEO', parseGeo(geo)],
      ['RRULE', parseRRule(rrule)],
      ['ORGANIZER', parseOrganizer(organizer)],
      ...parseAlarm(alarm),
      eventEnd,
    ].filter(line => line[1] !== undefined) as ContentLine[];

    return result;
  }
}

export class Calendar {
  constructor(protected events: Event[]) {}

  toLines(): ContentLine[] {
    const eventLines = this.events.map(evt => evt.toLines()).flat();

    return [calendarBegin, ...calendarProps, ...eventLines, calendarEnd];
  }

  toString() {
    return stringifyLines(this.toLines());
  }
}

export interface EventConfig {
  title: string;
  beginDate: DateData;
  endDate?: DateData;
  duration?: number;
  desc?: string;
  rrule?: RecurrenceRule;
  alarm?: AlarmConfig;
  location?: string;
  url?: string;
  organizer?: { name: string; email: string; dir?: string; };
  geo?: { lat: number; lon: number; };
  htmlContent?: string;
  zone?: Zone // default to local 
}

export interface AlarmConfig {
  advance: number; // In minutes
  desc: string;
}

export function parseAlarm(
  config?: AlarmConfig
): ContentLine[] | [[string, undefined]] {
  if (config === undefined) return [['VALARM', undefined]];

  return [
    ['BEGIN', 'VALARM'],
    ['TRIGGER', `-PT${config.advance}M`],
    ['ACTION', 'DISPLAY'],
    ['DESCRIPTION', config.desc],
    ['END', 'VALARM'],
  ];
}
