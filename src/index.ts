import { exec } from 'shelljs';

export const commitIdOfLatestTag = () => {
  const tagName = exec('git describe --tags --abbrev=0');
  return exec(`git rev-list -n 1 ${tagName}`); 
}

export const changedFiles = () => {
  return exec(`git diff --name-only ${commitIdOfLatestTag()} HEAD`);
}