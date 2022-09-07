import { crypto } from 'https://deno.land/std@0.154.0/crypto/mod.ts';
import parseDate from './date.ts';
import { DateData } from './date.ts';

const calendarBegin = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:peron/ics
CALSCALE:GREGORIAN
METHOD:PUBLISH`;

const calendarEnd = 'END:VCALENDAR';

const eventBegin = 'BEGIN:VEVENT';

const eventEnd = 'END:VEVENT';

export class Event {
  constructor(protected config: EventConfig) {
    if (config.duration !== undefined) {
      if (!(config.beginDate instanceof Date)) {
        config.beginDate = Date.constructor.apply(null, config.beginDate);
      }
      const endStamp =
        (config.beginDate.valueOf() as number) + config.duration * 1e3;
      config.endDate = new Date(endStamp);
    }
  }

  public toString() {
    const uid = crypto.randomUUID();
    const { title } = this.config;

    const now = new Date();

    return `${eventBegin}
UID:${uid}
DTSTAMP:${parseDate(now)}
DTSTART:${parseDate(this.config.beginDate)}
DTEND:${parseDate(this.config.endDate!)}
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

interface EventConfig {
  title: string;
  beginDate: DateData;
  endDate?: DateData;
  duration?: number;
}
