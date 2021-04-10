import { getChangedFiles as getChangedFiles, getCommitIdOfLatestCommit, getCommitIdOfLatestTag } from '../app';
import { CommandLineConfig, isFromLatestCommit, isToLatestTag, loadConfig } from '../config';

export default class DetectChangedFilesCommand {
  static run(commandLineConfig: CommandLineConfig) {
    try {
      const config = loadConfig(commandLineConfig);
      const commitId1 = isFromLatestCommit(config) ? getCommitIdOfLatestCommit() : config.from;
      const commitId2 = isToLatestTag(config) ? getCommitIdOfLatestTag() : config.to;
      const changedFiles = getChangedFiles(commitId1 as string, commitId2 as string);

      if (config.showDefaultOutput) {
        console.log(`------- Changed files between latest commit and latest tag -------`);
        changedFiles.forEach((file) => console.log(file));
      }

      if (config.handle) {
        config.handle({ changedFiles, from: commitId1 as string, to: commitId2 as string });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}
