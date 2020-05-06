import { Options } from './interfaces';

const $ = require('nodobjc'); // eslint-disable-line

$.import('./vendor/VPNManager.framework');

export class Bridge {
  private manager: any;

  constructor(options: Options) {
    this.create(options);
  }

  /* get isConnected(): boolean {
    return $.VPNManager('isConnected');
  } */

  create(options: Options): this {
    const json = JSON.stringify(options);
    this.manager = $.VPNManager('alloc')('initWithJson', $(json));

    return this;
  }

  getManager(): any {
    return this.manager;
  }

  connect(username: string, password: string): boolean {
    this.manager('connect', $(username), 'password', $(password));

    return true;
  }
}

export default (options: Options): Bridge =>
  new Bridge(options);
