#!/usr/bin/env node

import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';
import DetectChangedFilesCommand from './commands/detect-changed-files';
import { CommandLineConfig, config } from './config';

// prettier-ignore
const argv = yargs(hideBin(process.argv))
  .version()
  .array('commits')
  .option('v', {
    alias: 'verbose',
    type: 'boolean',
    default: false
  })
  .argv;

const { v, verbose, ...args } = argv;

if (verbose) {
  config.isPrintingVerboseLog = true;
}

DetectChangedFilesCommand.run(args as CommandLineConfig);
