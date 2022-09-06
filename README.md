# Simple ICS
## A super simple deno module for generating .ics files.

### Example
```typescript
import {
  Event,
  EventConfig,
  Calendar,
} from 'https://deno.land/x/simple_ics@0.0.1/mod.ts';

const evtCfg: EventConfig = {
  title: 'Write typescript',
  beginDate: [2022, 9, 6, 9, 0],
  endDate: [2022, 9, 6, 10, 0],
};

const evt = new Event(evtCfg);

const calendar = new Calendar([evt]);

console.log(calendar.toString());
```

### Credits
Some code is borrowed from https://github.com/adamgibbons/ics
