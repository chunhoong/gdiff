import { changedFiles, commitIdOfLatestTag } from "./index"

it('should return commit id of latest tag', () => {
  expect(commitIdOfLatestTag()).toBeDefined();
});

it('should return list of changed files since last tag', () => {
  expect(changedFiles()).toBeDefined();
})

