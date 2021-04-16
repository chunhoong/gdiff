import shelljs, { ExecFunction } from 'shelljs';
import * as commit from './commit';
import { ERROR_MESSAGE_COMMIT_IDENTICAL, ERROR_MESSAGE_TAG_NOT_FOUND } from './error';

afterEach(jest.restoreAllMocks);

it('should throw error when no commit is found on searching the latest tag', () => {
  jest.spyOn(shelljs, 'exec').mockImplementation(((() => '') as unknown) as ExecFunction);
  expect(() => commit.getCommitIdOfLatestTag()).toThrowError(ERROR_MESSAGE_TAG_NOT_FOUND);
});

it('should return list of changed files between 2 commits', () => {
  const commit1 = '856492b367f132a05a50c16f1d98d48177fb1c55';
  const commit2 = '6ea8b5f303d09abd6f133e4854a8d185e2555d60';
  const changedFiles = commit.getChangedFiles(commit1, commit2);
  expect(changedFiles).toBeDefined();
  expect(changedFiles.length).toEqual(7);
});

it('should throw error when both commits is identical', () => {
  expect(() => commit.getChangedFiles('', '')).toThrowError(ERROR_MESSAGE_COMMIT_IDENTICAL);
});

it('should throw error given the commits are HEAD and latest tag respectively but both refers to the same commit', () => {
  const aCoincidentallySameCommitId = 'aCoincidentallySameCommitId';

  jest.spyOn(commit, 'getCommitIdOfLatestCommit').mockReturnValue(aCoincidentallySameCommitId);
  jest.spyOn(commit, 'getCommitIdOfLatestTag').mockReturnValue(aCoincidentallySameCommitId);

  expect(() => commit.getChangedFiles('HEAD', 'TAG')).toThrowError(ERROR_MESSAGE_COMMIT_IDENTICAL);
});
