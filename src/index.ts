#!/usr/bin/env node

import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';
import DetectChangedFilesCommand from './commands/detect-changed-files';
import { CommandLineConfig } from './config';

// prettier-ignore
const argv = yargs(hideBin(process.argv))
  .version()
  .argv;

DetectChangedFilesCommand.run(argv as CommandLineConfig);
