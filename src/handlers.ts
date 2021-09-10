import { Storage } from ".";
import {
  InputCommandType,
  InputCommand,
  Action,
} from "./interfaces";

let inputCommand: InputCommand | null;

if (process && process.argv) {
  try {
    const input: string | null = process?.argv[2] ? process.argv[2] : null;
    inputCommand = input ? JSON.parse(input) : null;
  } catch {
    console.log('Invalid command has been passed!');
  }
}

export const onInit = async (
  callback: (command: InputCommand) => Promise<void> | void,
) => {
  if (!callback) {
    return;
  }

  if (inputCommand?.type !== InputCommandType.onInit) {
    return;
  }

  await callback(inputCommand);
}

export const onAction = (
  action: string,
  callback: (...args: any[]) => void,
) => {
  if (!callback) {
    return;
  }

  if (inputCommand?.type !== InputCommandType.onAction || !inputCommand.action) {
    return;
  }

  const actionTitle = typeof inputCommand.action === 'string'
    ? inputCommand.action
    : inputCommand.action.name;

  if (action.toLowerCase() !== actionTitle.toLowerCase()) {
    return;
  }

  const args = getActionArgs(
    inputCommand.action,
    inputCommand.query,
    inputCommand.storage
  );

  callback(...args);
};

export const onQueryAction = (
  action: string,
  callback: (...args: any[]) => void,
) => {
  if (!callback) {
    return;
  }

  if (inputCommand?.type !== InputCommandType.onQueryAction || !inputCommand.queryAction) {
    return;
  }

  const actionTitle = typeof inputCommand.queryAction === 'string'
    ? inputCommand.queryAction
    : inputCommand.queryAction.name;

  if (action.toLowerCase() !== actionTitle.toLowerCase()) {
    return;
  }

  const args = getActionArgs(
    inputCommand.queryAction,
    inputCommand.query,
    inputCommand.storage
  );

  callback(...args);
};

const getActionArgs = (action: Action, query: string, storage: Storage): any[] => {
  if (typeof action === 'string') {
    return [];
  }
  return action.arguments.map(
    arg => {
      if (arg === QUERY) {
        return query;
      }

      if (arg === STORAGE) {
        return storage;
      }

      return arg;
    }
  );
};

export const QUERY = '$query';

export const STORAGE = '$storage';