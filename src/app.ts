import { exec as app } from 'shelljs';

export const commitIdOfLatestTag = () => {
  const tagName = app('git describe --tags --abbrev=0', { silent: true });
  return app(`git rev-list -n 1 ${tagName}`, { silent: true }); 
}

export const commitIdOfLatestCommit = () => {
  return app(`git rev-parse HEAD`, { silent: true });
}

export const changedFiles = () => {
  const output = app(`git diff --name-only ${commitIdOfLatestTag()} ${commitIdOfLatestCommit()}`, { silent: true });
  const changeFiles = output.split('\n');
  changeFiles.pop();
  return changeFiles;
}