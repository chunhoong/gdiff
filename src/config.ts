import { cosmiconfigSync } from 'cosmiconfig';
import { ERROR_MESSAGE_COMMITS_NOT_SPECIFIED } from './error';

export interface Config {
  showDefaultOutput: boolean;
  commits: [string, string];
  handle?: (result: Result) => void;
}

export interface FileConfig extends Partial<Config> {}

export interface CommandLineConfig extends Omit<FileConfig, 'handle'> {}

export interface Result {
  changedFiles: string[];
  commits: string[];
}

export const loadConfig = (commandLineConfig?: CommandLineConfig): Config => {
  let fileConfig;

  try {
    fileConfig = loadFileConfig();
  } catch (error) {
    console.log('Unable to load file config');
  }

  const isCommitSpecifiedInCommandLineArgument = commandLineConfig?.commits && commandLineConfig.commits.length == 2;
  const isCommitSpecifiedInFile = fileConfig?.commits && fileConfig.commits.length == 2;

  if (!isCommitSpecifiedInCommandLineArgument && !isCommitSpecifiedInFile) {
    throw new Error(ERROR_MESSAGE_COMMITS_NOT_SPECIFIED);
  }

  const commits: [string, string] =
    (commandLineConfig?.commits as [string, string]) ?? (fileConfig?.commits as [string, string]);

  return {
    showDefaultOutput: commandLineConfig?.showDefaultOutput ?? fileConfig?.showDefaultOutput ?? true,
    commits,
    handle: fileConfig?.handle
  };
};

/**
 * Load `gdiff.config.js` from the path that executes GDiff.
 * @returns config
 */
export const loadFileConfig = (): FileConfig => {
  const explorerSync = cosmiconfigSync('gdiff');
  return explorerSync.load('gdiff.config.js')?.config as FileConfig;
};
