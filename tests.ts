import { Event, EventConfig, Calendar } from './main.ts';
import parseDate from 'https://raw.githubusercontent.com/adamgibbons/ics/master/src/utils/format-date.js';

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
  name: 'date',
  fn() {
    const date = parseDate([2022, 10, 11, 5, 2]);
    console.log(date);
  },
});
