import { exec } from 'shelljs';

export const commitIdOfLatestTag = () => {
  const tagName = exec('git describe --tags --abbrev=0', { silent: true }).trimEnd();
  return exec(`git rev-list -n 1 ${tagName}`, { silent: true }).trimEnd();
};

export const commitIdOfLatestCommit = () => {
  return exec(`git rev-parse HEAD`, { silent: true }).trimEnd();
};

export const changedFiles = (commitId1: string, commitId2: string) => {
  const output = exec(`git diff --name-only ${commitId1} ${commitId2}`, { silent: true }).trimEnd();
  return output.split('\n');
};
