declare var process : {
  argv: Array<string>;
}

export interface Storage {
  [key: string]: any;
}

export interface Option {
  title: string;
  subtitle?: string;
  action?: string;
  icon?: string;
}

export enum InputCommandType {
  onInit = 'onInit',
  onOpen = 'onOpen',
  onQuery = 'onQuery',
  onAction = 'onAction',
}

export enum OutputCommandType {
  setOptions = 'setOptions',
  setQuery = 'setQuery',
  setPluginInfo = 'setPluginInfo',
  setStorage = 'setStorage',
}

export interface PluginInfo {
  title: string,
  description: string,
  icon: string | { uri: string },
}

export type InputCommand = {
  type: InputCommandType,
  storage: Storage,
  query: string,
}

export type OutputCommand = {
  type: OutputCommandType.setOptions;
  value: Option[];
} | {
  type: OutputCommandType.setQuery;
  value: string;
} | {
  type: OutputCommandType.setPluginInfo;
  value: PluginInfo;
} | {
  type: OutputCommandType.setStorage;
  value: Storage;
}
