import { exec } from 'shelljs';

export const ERROR_MESSAGE_COMMIT_IDENTICAL = 'Both commit is identical - No changed files!';

export const getCommitIdOfLatestTag = () => {
  const tagName = exec('git describe --tags --abbrev=0', { silent: true }).trimEnd();
  return exec(`git rev-list -n 1 ${tagName}`, { silent: true }).trimEnd();
};

export const getCommitIdOfLatestCommit = () => {
  return exec(`git rev-parse HEAD`, { silent: true }).trimEnd();
};

export const getChangedFiles = (commitId1: string, commitId2: string) => {
  if (commitId1 === commitId2) {
    throw new Error(ERROR_MESSAGE_COMMIT_IDENTICAL);
  }
  const output = exec(`git diff --name-only ${commitId1} ${commitId2}`, { silent: true }).trimEnd();
  return output.split('\n');
};
