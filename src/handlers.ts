import {
  InputCommandType,
  InputCommand,
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
  if (inputCommand?.type !== InputCommandType.onInit) {
    return;
  }

  await callback(inputCommand);
}

export const onAction = (
  action: string,
) => {
  return {
    run: (callback: (...args: any[]) => void) => {
      if (inputCommand?.type !== InputCommandType.onAction || !inputCommand.action) {
        return;
      }

      const actionTitle = typeof inputCommand.action === 'string'
        ? inputCommand.action
        : inputCommand.action.name;

      if (!action.toLowerCase().startsWith(actionTitle.toLowerCase())) {
        return;
      }

      const args = typeof inputCommand.action === 'string'
        ? [inputCommand.query]
        : inputCommand.action.arguments;

      callback(...args);
    }
  }
};

export const onQueryAction = (
  action: string,
) => {
  return {
    run: (callback: (...args: any[]) => void) => {
      if (inputCommand?.type !== InputCommandType.onQueryAction || !inputCommand.action) {
        return;
      }

      const actionTitle = typeof inputCommand.action === 'string'
        ? inputCommand.action
        : inputCommand.action.name;

      if (!action.toLowerCase().startsWith(actionTitle.toLowerCase())) {
        return;
      }

      const args = typeof inputCommand.action === 'string'
        ? [inputCommand.query]
        : inputCommand.action.arguments;

      callback(...args);
    }
  }
};
