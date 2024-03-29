import { assertEquals } from 'https://deno.land/std@0.154.0/testing/asserts.ts';

import { Event, EventConfig, Calendar } from './mod.ts';
import { short_utc } from './date.ts';

Deno.test('UTC event',
  () => {
    const cfg: EventConfig = {
      title: 'test',
      beginDate: [2022, 8, 1, 10, 10],
      endDate: [2022, 8, 1, 11, 10],
      desc: 'Hello',
      zone: 'utc' // Universal time required
    };
    const evt = new Event(cfg);
    const lines = evt.toLines()
    assertEquals(lines[0][0], "BEGIN")
    assertEquals(lines[0][1], "VEVENT")

    // Note 'Z' suffix for UTC (precaution against daylight saving time surprises)
    assertEquals(lines[3], ["DTSTART", "20220801T101000Z"])
    assertEquals(lines[4], ["DTEND", "20220801T111000Z"]) 

  },
);

Deno.test({
  name: 'calendar',
  fn() {
    const cfg: EventConfig = {
      title: 'test',
      beginDate: [2022, 8, 1, 10, 10],
      endDate: [2022, 8, 1, 11, 10],
    };
    const evt = new Event(cfg);
    const calendar = new Calendar([evt]);

    console.log(calendar.toLines());
  },
});

Deno.test({
  name: 'doc',
  fn() {
    const cfg1: EventConfig = {
      title: 'Write Typescript',
      beginDate: [2022, 9, 6, 9, 30],
      endDate: [2022, 9, 6, 10],
      desc: 'Implement a module to generate .ics files',
      organizer: {
        name: 'Sam Worthington',
        email: 'sam@dev.com'
      },
      url: 'https://www.google.com/',
      location: 'ABC Tank Warehouse',
      geo: { lat: 10.4, lon: 44.5 }
    };

    const cfg2: EventConfig = {
      title: 'Write Rust for 3 days',
      beginDate: new Date(),
      duration: 3600, // Duration: 3600s, or 1h
      rrule: {
        freq: 'DAILY',
        count: 3,
      },
      alarm: {
        desc: 'Write Rust NOW',
        advance: 30,
      },
    };

    const evt1 = new Event(cfg1);
    const evt2 = new Event(cfg2);

    const calendar = new Calendar([evt1, evt2]);

    console.log(calendar.toString());
  },
});
