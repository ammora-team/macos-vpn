import { Options } from './interfaces';

const path = require('path'); // eslint-disable-line

export const $ = require('@ammora/nodobjc'); // eslint-disable-line

export class Bridge {
  private vpnManager: any;

  private readonly options: any;

  constructor(options: Options) {
    const optionsDefault = {
      log: console
    };

    this.options = { ...optionsDefault, ...options };

    this.importFramework();
    this.create(options);
  }

  private get log(): any {
    return this.options.log;
  }

  private importFramework(): void {
    $.import(path.join(__dirname, '..', 'VPNManager.framework'));

    this.log.info('VPNManager Framework import');
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

    this.log.info('VPNManager created');

    return this;
  }

  connect(username: string, password: string): boolean {
    // @todo get exception
    this.vpnManager('connect', $(username), 'password', $(password));

    return true;
  }
}

export default (options: Options): Bridge =>
  new Bridge(options);
