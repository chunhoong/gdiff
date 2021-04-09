import { ShellString } from "shelljs";
import * as app from "./app";

it('should return list of changed files between 2 commits', () => {
  const mockCommitIdOfLatestTag = jest.spyOn(app, 'commitIdOfLatestTag');
  const mockCommitIdOfLatestCommit = jest.spyOn(app, 'commitIdOfLatestCommit');
  
  mockCommitIdOfLatestTag.mockReturnValue('856492b367f132a05a50c16f1d98d48177fb1c55' as ShellString);
  mockCommitIdOfLatestCommit.mockReturnValue('6ea8b5f303d09abd6f133e4854a8d185e2555d60' as ShellString);
  
  const changedFiles = app.changedFiles();

  expect(changedFiles).toBeDefined();
  expect(changedFiles.length).toEqual(7);
});

