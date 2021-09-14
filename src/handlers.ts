import { getActionArgs, print } from "./helpers";
import { InputCommand, InputCommandType, Option, OutputCommand, OutputCommandType } from "./interfaces";

let inputCommand: InputCommand | null;

if (process && process.argv) {
  try {
    const input: string | null = process?.argv[2] ? process.argv[2] : null;
    inputCommand = input ? JSON.parse(input) : null;
  } catch {
    console.log('Invalid command has been passed!');
  }
}

export const onInit = async (callback: () => void) => {
  if (!callback) {
    return;
  }

  if (inputCommand?.type !== InputCommandType.onInit) {
    return;
  }

  callback();
};

export const registerOptions = async (
  options: Option[],
) => {
  if (!options?.length) {
    return;
  }

  if (
    inputCommand?.type !== InputCommandType.checkForOptionsToRegister &&
    inputCommand?.type !== InputCommandType.onInit
  ) {
    return;
  }

  const command: OutputCommand = {
    type: OutputCommandType.registerOptions,
    value: options,
  };

  print(command);
};

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

export const onQueryAction = async (
  action: string,
  callback: (...args: any[]) => Promise<Option[]> | Option[],
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

  const options: Option[] = await callback(...args);

  if (!options?.length) {
    return;
  }

  const command: OutputCommand = {
    type: OutputCommandType.setOptions,
    value: options,
  };

  print(command);
};

export const onPrefix = async (
  prefix: string | string[],
  callback: (command: InputCommand) => Promise<Option[]> | Option[],
) => {
  if (!callback || !prefix?.length) {
    return;
  }

  if (inputCommand?.type === InputCommandType.checkForOnPrefixMethods) {
    const command: OutputCommand = {
      type: OutputCommandType.registerPrefixes,
      value: typeof prefix === 'string' ? [prefix] : prefix,
    };

    print(command);
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

  const options: Option[] = await callback({
    ...inputCommand,
    prefix: matches,
    query: inputCommand.query.replace(matches, ''),
  });

  if (!options?.length) {
    return;
  }

  const command: OutputCommand = {
    type: OutputCommandType.setOptions,
    value: options,
  };

  print(command);
};
