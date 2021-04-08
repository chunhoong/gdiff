#!/usr/bin/env node

import { exec } from 'shelljs';

export const commitIdOfLatestTag = () => {
  const tagName = exec('git describe --tags --abbrev=0', { silent: true });
  return exec(`git rev-list -n 1 ${tagName}`, { silent: true }); 
}

export const changedFiles = () => {
  const output = exec(`git diff --name-only ${commitIdOfLatestTag()} HEAD`, { silent: true });
  const changeFiles = output.split('\n');
  changeFiles.pop();
  return changeFiles;
}

console.log(`------- Changed files between latest commit and latest git tag -------`);
changedFiles().forEach(file => console.log(file));