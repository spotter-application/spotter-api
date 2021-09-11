import { QUERY, STORAGE } from "./constants";
import { Action, Storage } from "./interfaces";

export const getActionArgs = (action: Action, query: string, storage: Storage): any[] => {
  if (typeof action === 'string') {
    return [];
  }
  return action.arguments.map(
    arg => {
      if (arg === QUERY) {
        return query;
      }

      if (arg === STORAGE) {
        return storage;
      }

      return arg;
    }
  );
};
