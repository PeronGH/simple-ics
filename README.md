# Simple ICS
## A super simple deno module for generating .ics files.

### Example
```typescript
import {
  Event,
  EventConfig,
  Calendar,
} from 'https://deno.land/x/simple_ics@0.0.11/mod.ts';

const cfg1: EventConfig = {
  title: 'Write Typescript',
  beginDate: [2022, 9, 6, 9, 30],
  endDate: [2022, 9, 6, 10],
  desc: 'Implement a module to generate .ics files',
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
```

### Credits
Some code is borrowed from https://github.com/adamgibbons/ics
