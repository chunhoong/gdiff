#!/usr/bin/env node

import { changedFiles } from "./app";

console.log(`------- Changed files between latest commit and latest tag -------`);
changedFiles().forEach(file => console.log(file));