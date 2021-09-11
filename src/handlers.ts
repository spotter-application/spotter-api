import { getActionArgs } from "./helpers";
import { InputCommand, InputCommandType, Option } from "./interfaces";
import { registerPrefix, setOptions } from "./set-methods";

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
  callback: (command: InputCommand) => Promise<void | Option[]> | void | Option[],
) => {
  if (!callback) {
    return;
  }

  if (inputCommand?.type !== InputCommandType.onInit) {
    return;
  }

  const options = await callback(inputCommand);
  if (options) {
    setOptions(options);
  }
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

export const onPrefix = async (
  prefix: string | string[],
  callback: (command: InputCommand) => Promise<void | Option[]> | void | Option[],
) => {
  if (!callback) {
    return;
  }

  if (inputCommand?.type === InputCommandType.checkForOnPrefixMethods) {
    registerPrefix(prefix);
    return;
  }

  if (inputCommand?.type !== InputCommandType.onPrefix) {
    return;
  }

  const matches: string | undefined = typeof prefix === 'string'
    ? (prefix.startsWith(inputCommand.query) ? prefix : '')
    : prefix.find(p =>
      inputCommand?.type === InputCommandType.onPrefix && p.startsWith(inputCommand.query)
    );

  if (!matches?.length) {
    return;
  }

  const options = await callback({
    ...inputCommand,
    query: inputCommand.query.replace(matches, ''),
  });
  if (options) {
    setOptions(options);
  }
};
