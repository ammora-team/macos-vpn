import { Options } from './interfaces';

export const $ = require('nodobjc'); // eslint-disable-line

$.import('./vendor/VPNManager.framework');

export class Bridge {
  private vpnManager: any;

  constructor(options: Options) {
    this.create(options);
  }

  /* get isConnected(): boolean {
    return this.vpnManager('isConnected');
  } */

  get manager(): any {
    return this.vpnManager;
  }

  create(options: Options): this {
    const json = JSON.stringify(options);
    this.vpnManager = $.VPNManager('alloc')('initWithJson', $(json));

    return this;
  }

  connect(username: string, password: string): boolean {
    this.vpnManager('connect', $(username), 'password', $(password));

    return true;
  }
}

export default (options: Options): Bridge =>
  new Bridge(options);
