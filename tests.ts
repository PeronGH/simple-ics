import { Event, EventConfig, Calendar } from './mod.ts';

Deno.test({
  name: 'event',
  fn() {
    const cfg: EventConfig = {
      title: 'test',
      beginDate: [2022, 8, 1, 10, 10],
      endDate: [2022, 8, 1, 11, 10],
    };
    const evt = new Event(cfg);

    console.log(evt.toString());
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

    console.log(calendar.toString());
  },
});

Deno.test({
  name: 'doc',
  fn() {
    const cfg1: EventConfig = {
      title: 'Write typescript',
      beginDate: [2022, 9, 6, 9, 30],
      endDate: [2022, 9, 6, 10],
    };

    const cfg2: EventConfig = {
      title: 'Write Rust',
      beginDate: [2022, 9, 7, 8],
      endDate: new Date(),
    };

    const evt1 = new Event(cfg1);
    const evt2 = new Event(cfg2);

    const calendar = new Calendar([evt1, evt2]);

    console.log(calendar.toString());
  },
});
