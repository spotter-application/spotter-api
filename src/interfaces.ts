declare var process : {
  argv: Array<string>;
}

export interface Storage {
  [key: string]: any;
}

export type Action = string | {
  name: string,
  arguments: any[],
}

export interface Option {
  title: string;
  subtitle?: string;
  action?: Action,
  queryAction?: Action;
  icon?: string | { uri: string };
  forceReplaceOption?: string;
}

export enum InputCommandType {
  onInit = 'onInit',
  onPrefix = 'onPrefix',
  onAction = 'onAction',
  onQueryAction = 'onQueryAction',
  checkForOnPrefixMethods = 'checkForOnPrefixMethods',
}

export enum OutputCommandType {
  setOptions = 'setOptions',
  setQuery = 'setQuery',
  setPluginInfo = 'setPluginInfo',
  setStorage = 'setStorage',
  registerOptions = 'registerOptions',
  registerOnPrefix = 'registerOnPrefix',
}

export interface PluginInfo {
  title: string,
  description: string,
  icon: string | { uri: string },
}

export type InputCommand = {
  type: InputCommandType.onAction;
  action: string | {
    name: string,
    arguments: any[],
  },
  query: string;
  storage: Storage,
} | {
  type: InputCommandType.onInit;
  storage: Storage,
} | {
  type: InputCommandType.onQueryAction;
  queryAction: string | {
    name: string,
    arguments: any[],
  },
  query: string;
  storage: Storage,
} | {
  type: InputCommandType.onPrefix;
  prefix: string,
  query: string;
  storage: Storage,
} | {
  type: InputCommandType.checkForOnPrefixMethods;
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
} | {
  type: OutputCommandType.registerOnPrefix;
  value: string | string[];
}
