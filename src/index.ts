import {
  InputCommandType,
  InputCommand,
} from "./interfaces";
import {
  setPluginInfo,
  setOptions,
  setQuery,
  setStorage,
} from "./set-methods";

const input: string = process?.argv[2] ?? '';
const inputCommand: InputCommand = JSON.parse(input);

const emptySetMethods = {
  setPluginInfo: () => null,
  setOptions: () => null,
  setQuery: () => null,
  setStorage: () => null,
}

const setMethods = {
  setPluginInfo,
  setOptions,
  setQuery,
  setStorage,
}

export const onInit = (callback: (command: InputCommand) => void) => {
  if (inputCommand.type !== InputCommandType.onInit) {
    return;
  }

  callback(inputCommand);
}

export const onQuery = (callback: (command: InputCommand) => void) => {
  if (inputCommand.type !== InputCommandType.onQuery || !inputCommand.query) {
    return;
  }

  callback(inputCommand);
};

export const forQuery = (query: string) => {
  if (
    inputCommand.type !== InputCommandType.onQuery ||
    !inputCommand.query ||
    !query.toLowerCase().startsWith(inputCommand.query.toLowerCase())
  ) {
    return emptySetMethods;
  }

  return setMethods;
};

export const forAction = (actionName: string) => {
  return {
    run: (callback: () => void) => {
      if (
        inputCommand.type !== InputCommandType.onAction ||
        !inputCommand.query ||
        !actionName.toLowerCase().startsWith(inputCommand.query.toLowerCase())
      ) {
        return;
      }

      callback();
    }
  }
};

export * from './set-methods';
