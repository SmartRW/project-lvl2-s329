#!/usr/bin/env node

import commander from 'commander';
import { description, version } from '../../package.json';
import genDiff from '..';

commander
  .version(`${version}`, '-V, --version')
  .description(`${description}`)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]',
    `Output format:
    "tree" (default) - shows diff as a tree;
    "plain" - shows diff as a list;
    "json" - shows diff as a JSON string`)
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, commander.format));
  })
  .parse(process.argv);
