import { cp, exec } from 'shelljs';
import { ERROR_MESSAGE_COMMIT_IDENTICAL } from './error';

export const getCommitIdOfLatestTag = () => {
  const tagName = exec('git describe --tags --abbrev=0', { silent: true }).trimEnd();
  return exec(`git rev-list -n 1 ${tagName}`, { silent: true }).trimEnd();
};

export const getCommitIdOfLatestCommit = () => {
  return exec(`git rev-parse HEAD`, { silent: true }).trimEnd();
};

export const isLatestCommit = (commitId: string) => {
  return commitId === 'HEAD';
};

export const isLatestTag = (commitId: string) => {
  return commitId === 'TAG';
};

export const getChangedFiles = (commitId1: string, commitId2: string) => {
  commitId1 = isLatestCommit(commitId1)
    ? getCommitIdOfLatestCommit()
    : isLatestTag(commitId1)
    ? getCommitIdOfLatestTag()
    : commitId1;

  commitId2 = isLatestCommit(commitId2)
    ? getCommitIdOfLatestCommit()
    : isLatestTag(commitId2)
    ? getCommitIdOfLatestTag()
    : commitId2;

  if (commitId1 === commitId2) {
    throw new Error(ERROR_MESSAGE_COMMIT_IDENTICAL);
  }
  const output = exec(`git diff --name-only ${commitId1} ${commitId2}`, { silent: true }).trimEnd();
  return output.split('\n');
};
