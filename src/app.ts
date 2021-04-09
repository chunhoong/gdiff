import { exec } from 'shelljs';

export const commitIdOfLatestTag = () => {
  const tagName = exec('git describe --tags --abbrev=0', { silent: true });
  return exec(`git rev-list -n 1 ${tagName}`, { silent: true }); 
}

export const commitIdOfLatestCommit = () => {
  return exec(`git rev-parse HEAD`, { silent: true });
}

export const changedFiles = () => {
  const output = exec(`git diff --name-only ${commitIdOfLatestTag()} ${commitIdOfLatestCommit()}`, { silent: true });
  const changeFiles = output.split('\n');
  changeFiles.pop();
  return changeFiles;
}