import { Options } from './interfaces';

export default (_options: Options): void => {};

export const connect = (_username: string, _password: string): boolean => {
  return true;
};

export const disconnect = (): boolean => {
  return true;
};
