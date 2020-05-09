import { Options } from './interfaces';

const path = require('path'); // eslint-disable-line

export const $ = require('@ammora/nodobjc'); // eslint-disable-line

$.import(path.join(__dirname, '../vendor/VPNManager.framework'));

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
