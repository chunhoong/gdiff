import { cosmiconfigSync } from 'cosmiconfig';

export interface FileConfig {
  showDefaultOutput?: boolean;
  from?: 'latestCommit' | string;
  to?: 'latestTag' | string;
  handle?: (result: Result) => void;
}

export interface CommandLineConfig extends Omit<FileConfig, 'handle'> {}

export interface Result {
  changedFiles: string[];
  from: string;
  to: string;
}

const DEFAULT_CONFIG: FileConfig = {
  showDefaultOutput: true
};

export const loadConfig = (commandLineConfig: CommandLineConfig): FileConfig => {
  try {
    const fileConfig = loadFileConfig();
    return { ...DEFAULT_CONFIG, ...fileConfig, ...commandLineConfig };
  } catch (error) {
    return DEFAULT_CONFIG;
  }
};

/**
 * Load `gdiff.config.js` from the path that executes GDiff.
 * @returns config
 */
const loadFileConfig = (): FileConfig => {
  const explorerSync = cosmiconfigSync('gdiff');
  return explorerSync.load('gdiff.config.js')?.config as FileConfig;
};

export const isFromLatestCommit = (config: FileConfig) => {
  return config.from === undefined || config.from === 'latestCommit';
};

export const isToLatestTag = (config: FileConfig) => {
  return config.to === undefined || config.to === 'latestTag';
};
