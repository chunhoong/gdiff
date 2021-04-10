import { getChangedFiles } from './app';
import { ERROR_MESSAGE_COMMIT_IDENTICAL } from './app';

it('should return list of changed files between 2 commits', () => {
  const commit1 = '856492b367f132a05a50c16f1d98d48177fb1c55';
  const commit2 = '6ea8b5f303d09abd6f133e4854a8d185e2555d60';
  const changedFiles = getChangedFiles(commit1, commit2);
  expect(changedFiles).toBeDefined();
  expect(changedFiles.length).toEqual(7);
});

it('should throw error when both commits is identical', () => {
  const commitId1 = '';
  const commitId2 = '';
  expect(() => getChangedFiles(commitId1, commitId2)).toThrowError(ERROR_MESSAGE_COMMIT_IDENTICAL);
});
