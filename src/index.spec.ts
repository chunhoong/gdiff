import { ShellString } from "shelljs";
import * as index from "./index";

it('should return list of changed files between latest commit and the latest tag', () => {
  const mockCommitIdOfLatestTag = jest.spyOn(index, 'commitIdOfLatestTag');
  mockCommitIdOfLatestTag.mockReturnValue('856492b367f132a05a50c16f1d98d48177fb1c55' as ShellString);
  const changedFiles = index.changedFiles();
  expect(changedFiles).toBeDefined();
  expect(changedFiles.length).toEqual(5);
});

