import {
  InputCommandType,
  InputCommand,
} from "./interfaces";

const input: string = process?.argv[2] ?? '';
const inputCommand: InputCommand = JSON.parse(input);

export const onInit = async (callback: (command: InputCommand) => Promise<void>) => {
  if (inputCommand.type !== InputCommandType.onInit) {
    return;
  }

  await callback(inputCommand);
}

export const onAction = (action: string) => {
  return {
    run: (callback: (...args: any[]) => void) => {
      if (inputCommand.type !== InputCommandType.onAction || !inputCommand.action) {
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

export const onQueryAction = (action: string) => {
  return {
    run: (callback: (...args: any[]) => void) => {
      if (inputCommand.type !== InputCommandType.onQueryAction || !inputCommand.action) {
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
