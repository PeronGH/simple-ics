import { Event, EventConfig, Calendar } from './mod.ts';

Deno.test({
  name: 'event',
  fn() {
    const cfg: EventConfig = {
      title: 'test',
      beginDate: [2022, 8, 1, 10, 10],
      endDate: [2022, 8, 1, 11, 10],
      desc: 'Hello',
    };
    const evt = new Event(cfg);

    console.log(evt.toLines());
  },
});

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
    };

    const cfg2: EventConfig = {
      title: 'Write Rust for next 3 days',
      beginDate: new Date(),
      duration: 3600, // Duration: 3600s, or 1h
      rrule: {
        freq: 'DAILY',
        count: 3,
      },
    };

    const evt1 = new Event(cfg1);
    const evt2 = new Event(cfg2);

    const calendar = new Calendar([evt1, evt2]);

    console.log(calendar.toString());
  },
});
