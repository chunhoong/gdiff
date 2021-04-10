#!/usr/bin/env node

import { changedFiles, commitIdOfLatestCommit, commitIdOfLatestTag } from "./app";

console.log(`------- Changed files between latest commit and latest tag -------`);
try {
  changedFiles(commitIdOfLatestCommit(), commitIdOfLatestTag()).forEach(file => console.log(file));
} catch (error) {
  console.log(error.message);
}