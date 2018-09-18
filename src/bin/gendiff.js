#!/usr/bin/env node

const Program = require('commander');

Program
  .version('0.0.3')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-h, --help', 'output usage information')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
