#!/usr/bin/env node
const { init } = require('./next-to-ts.js');

init().catch((e) => {
  console.error(e);
});
