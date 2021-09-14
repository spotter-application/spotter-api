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
  checkForOptionsToRegister = 'checkForOptionsToRegister',
  checkForOnPrefixMethods = 'checkForOnPrefixMethods',
  onInit = 'onInit',
  onPrefix = 'onPrefix',
  onAction = 'onAction',
  onQueryAction = 'onQueryAction',
}

export enum OutputCommandType {
  setOptions = 'setOptions',
  setQuery = 'setQuery',
  setErrors = 'setErrors',
  setPluginInfo = 'setPluginInfo',
  setStorage = 'setStorage',
  registerOptions = 'registerOptions',
  registerPrefixes = 'registerPrefixes',
}

export interface PluginInfo {
  title: string,
  description: string,
  icon: string | { uri: string },
}

export type InputCommand = {
  type: InputCommandType.checkForOptionsToRegister;
} | {
  type: InputCommandType.checkForOnPrefixMethods;
} | {
  type: InputCommandType.onInit;
  storage: Storage,
} | {
  type: InputCommandType.onAction;
  action: string | {
    name: string,
    arguments: any[],
  },
  query: string;
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
}

export type OutputCommand = {
  type: OutputCommandType.setOptions;
  value: Option[];
} | {
  type: OutputCommandType.setQuery;
  value: string;
} | {
  type: OutputCommandType.setErrors;
  value: string[];
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
  type: OutputCommandType.registerPrefixes;
  value: string[];
}
