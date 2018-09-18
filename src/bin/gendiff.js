#!/usr/bin/env node

import * as commander from 'commander';

commander
  .version('0.0.3')
  .description('Compares two configuration files and shows a difference.')
  .args('<firstConfig> <secondConfig>')
  .option('-h, --help', 'output usage information')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
