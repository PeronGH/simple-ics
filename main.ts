import { crypto } from 'https://deno.land/std@0.154.0/crypto/mod.ts';
import formatDate from 'https://raw.githubusercontent.com/adamgibbons/ics/master/src/utils/format-date.js';

const calendarBegin = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:peron/ics
CALSCALE:GREGORIAN
METHOD:PUBLISH`;

const calendarEnd = 'END:VCALENDAR';

const eventBegin = 'BEGIN:VEVENT';

const eventEnd = 'END:VEVENT';

export class Event {
  constructor(protected config: EventConfig) {}

  public toString() {
    const uid = crypto.randomUUID();
    const { title } = this.config;

    const now = new Date();
    const nowDateArray = [
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
    ];

    return `${eventBegin}
UID:${uid}
DTSTAMP:${formatDate(nowDateArray)}
DTSTART:${formatDate(this.config.beginDate)}
DTEND:${formatDate(this.config.endDate)}
SUMMARY:${title}
${eventEnd}`;
  }
}

export class Calendar {
  constructor(protected events: Event[]) {}

  public toString() {
    const eventText = this.events.map(evt => evt.toString()).join('\n');

    return `${calendarBegin}
${eventText}
${calendarEnd}`;
  }
}

type DateArray = number[];

export interface EventConfig {
  title: string;
  beginDate: DateArray;
  endDate: DateArray;
}
