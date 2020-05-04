import { Options } from './interfaces';

export default (options: Options): void => {};

export const connect = (username: string, password: string): boolean => {
  return true;
};

export const disconnect = (): boolean => {
  return true;
};
