import { print } from "./helpers";
import {
  OutputCommand,
  OutputCommandType,
  PluginInfo,
  Storage,
} from "./interfaces";

export const setPluginInfo = (value: PluginInfo) => {
  const command: OutputCommand = {
    type: OutputCommandType.setPluginInfo,
    value,
  };

  print(command);
};

export const setQuery = (value: string): OutputCommand => {
  const command: OutputCommand = {
    type: OutputCommandType.setQuery,
    value,
  };

  print(command);

  return command;
};

export const setStorage = (value: Storage): OutputCommand => {
  const command: OutputCommand = {
    type: OutputCommandType.setStorage,
    value,
  };

  print(command);

  return command;
};
