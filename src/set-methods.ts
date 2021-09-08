import {
  OutputCommand,
  Option,
  OutputCommandType,
  PluginInfo,
  Storage,
} from "./interfaces";

export const setPluginInfo = (value: PluginInfo) => {
  const command: OutputCommand = {
    type: OutputCommandType.setPluginInfo,
    value,
  };

  console.log(JSON.stringify(command));
}

export const setOptions = (value: Option[]): OutputCommand => {
  const command: OutputCommand = {
    type: OutputCommandType.setOptions,
    value,
  };

  console.log(JSON.stringify(command));

  return command;
}

export const setQuery = (value: string): OutputCommand => {
  const command: OutputCommand = {
    type: OutputCommandType.setQuery,
    value,
  };

  console.log(JSON.stringify(command));

  return command;
}

export const setStorage = (value: Storage): OutputCommand => {
  const command: OutputCommand = {
    type: OutputCommandType.setStorage,
    value,
  };

  console.log(JSON.stringify(command));

  return command;
}

export const registerOptions = (value: Option[]): OutputCommand => {
  const command: OutputCommand = {
    type: OutputCommandType.registerOptions,
    value,
  };

  console.log(JSON.stringify(command));

  return command;
}
