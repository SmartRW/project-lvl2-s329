#!/usr/bin/env node

import commander from 'commander';
import { description, version } from '../../package.json';
import genDiff from '..';

commander
  .version(`${version}`, '-V, --version')
  .description(`${description}`)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, commander.format));
  })
  .parse(process.argv);
