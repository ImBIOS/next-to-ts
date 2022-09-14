#!/usr/bin/env node

import { init } from './next-to-ts';

init().catch((e) => {
  console.error(e);
});
