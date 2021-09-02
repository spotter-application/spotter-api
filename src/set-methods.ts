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

export const setOptions = (value: Option[]) => {
  const command: OutputCommand = {
    type: OutputCommandType.setOptions,
    value,
  };

  console.log(JSON.stringify(command));
}

export const setQuery = (value: string) => {
  const command: OutputCommand = {
    type: OutputCommandType.setQuery,
    value,
  };

  console.log(JSON.stringify(command));
}

export const setStorage = (value: Storage) => {
  const command: OutputCommand = {
    type: OutputCommandType.setStorage,
    value,
  };

  console.log(JSON.stringify(command));
}
