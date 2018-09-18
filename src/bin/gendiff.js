#!/usr/bin/env node

import commander from 'commander';
import { description, version } from '../../package.json';

commander
  .version(`${version}`, '-V, --version')
  .description(`${description}`)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
