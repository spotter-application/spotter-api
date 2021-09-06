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
  arguments?: any[];
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
  registerOptions = 'registerOptions',
}

export interface PluginInfo {
  title: string,
  description: string,
  icon: string | { uri: string },
}

export type InputCommand = {
  type: InputCommandType.onAction;
  action: string;
  arguments: any[];
  storage: Storage,
} | {
  type: InputCommandType.onInit;
  storage: Storage,
} | {
  type: InputCommandType.onOpen;
  storage: Storage,
} | {
  type: InputCommandType.onQuery;
  query: string;
  storage: Storage,
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
} | {
  type: OutputCommandType.registerOptions;
  value: Option[];
}
