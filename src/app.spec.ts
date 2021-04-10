import * as app from './app';

it('should return list of changed files between 2 commits', () => {
  const commitIdOfLatestTag = '856492b367f132a05a50c16f1d98d48177fb1c55';
  const commitIdOfLatestCommit = '6ea8b5f303d09abd6f133e4854a8d185e2555d60';
  const changedFiles = app.changedFiles(commitIdOfLatestTag, commitIdOfLatestCommit);
  expect(changedFiles).toBeDefined();
  expect(changedFiles.length).toEqual(7);
});
``