import { getChangedFiles as getChangedFiles, isLatestCommit, isLatestTag } from '../commit';
import { CommandLineConfig, loadConfig } from '../config';

export default class DetectChangedFilesCommand {
  static run(commandLineConfig: CommandLineConfig) {
    try {
      const config = loadConfig(commandLineConfig);
      const changedFiles = getChangedFiles(config.commits[0], config.commits[1]);

      if (config.showDefaultOutput) {
        DetectChangedFilesCommand.printTitle(config.commits[0], config.commits[1]);
        changedFiles.forEach((file) => console.log(file));
      }

      if (config.handle) {
        config.handle({ changedFiles, commits: [config.commits[0], config.commits[1]] });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  static printTitle(commitId1: string, commitId2: string) {
    commitId1 = isLatestCommit(commitId1) ? 'latest commit' : isLatestTag(commitId1) ? 'latest tag' : commitId1;
    commitId2 = isLatestCommit(commitId2) ? 'latest commit' : isLatestTag(commitId2) ? 'latest tag' : commitId2;
    console.log(`------- Changed files between ${commitId1} and ${commitId2} -------`);
  }
}
