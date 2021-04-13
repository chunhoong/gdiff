import * as config from './config';
import { ERROR_MESSAGE_COMMITS_NOT_SPECIFIED } from './error';

afterEach(() => jest.restoreAllMocks());

it('should load config from file when only file config is present', () => {
  const mockFileConfig: config.FileConfig = {
    showDefaultOutput: false,
    commits: ['commitIdA', 'commitIdB'],
    handle: (result) => {
      console.log(`Do something about result: ${JSON.stringify(result)}`);
    }
  };

  jest.spyOn(config, 'loadFileConfig').mockReturnValue(mockFileConfig);

  expect(config.loadConfig()).toStrictEqual(mockFileConfig);
});

it('should load config from command line when only command line config is present', () => {
  const commandLineConfig: config.CommandLineConfig = {
    showDefaultOutput: false,
    commits: ['commitIdC', 'commitIdD']
  };

  expect(config.loadConfig(commandLineConfig)).toStrictEqual({ ...commandLineConfig, handle: undefined });
});

it('should throw error if commits are not specified at both file and command line', () => {
  expect(() => config.loadConfig()).toThrow(ERROR_MESSAGE_COMMITS_NOT_SPECIFIED);
});

it('should consume command line config at higher precedence if both both file and command line is present', () => {
  const mockFileConfig: config.FileConfig = {
    showDefaultOutput: false,
    commits: ['commitIdE', 'commitIdF'],
    handle: (result) => {
      console.log(`Do something about result: ${JSON.stringify(result)}`);
    }
  };

  const commandLineConfig: config.CommandLineConfig = {
    showDefaultOutput: true
  };

  jest.spyOn(config, 'loadFileConfig').mockReturnValue(mockFileConfig);

  expect(config.loadConfig(commandLineConfig)).toStrictEqual({
    showDefaultOutput: commandLineConfig.showDefaultOutput,
    commits: mockFileConfig.commits,
    handle: mockFileConfig.handle
  });
});
