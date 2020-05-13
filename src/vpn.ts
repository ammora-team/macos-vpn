import { Config, ConnectOptions } from './interfaces';

const path = require('path'); // eslint-disable-line

export const $ = require('@ammora/nodobjc'); // eslint-disable-line

export class Bridge {
  private vpnManager: any;

  private readonly config?: Config = {};

  constructor(options: ConnectOptions, config?: Config) {
    this.config = config;

    this.importFramework();
    this.create(options);
  }

  private get log(): any {
    let log = this.config?.log;

    if (log === null || log === undefined) {
      log = console;
    }

    if (typeof log.info !== 'function') {
      throw new Error('Log invalid');
    }

    return log;
  }

  private importFramework(): void {
    let frameworkPath = this.config?.frameworkPath;

    if (frameworkPath === null || frameworkPath === undefined) {
      frameworkPath = path.join(__dirname, '..');
    }

    const fwPath: string = path.join(frameworkPath, 'VPNManager.framework');
    this.log.info('VPNManager Framework path: ' + fwPath);

    $.import(fwPath);

    this.log.info('VPNManager Framework import');
  }

  get manager(): any {
    return this.vpnManager;
  }

  create(options: ConnectOptions): this {
    const json = JSON.stringify(options);
    this.vpnManager = $.VPNManager('alloc')('initWithJson', $(json));

    this.log.info('VPNManager created');

    return this;
  }

  connect(username: string, password: string): void {
    // @todo async/await
    const block = $(function(_self: any, isSuccess: any) {
      // @todo get NSError
      this.log.info('VPNManager connecting');
      if (isSuccess === true) {
        this.log.info('VPNManager connected');
        return;
      }

      this.log.info(`VPNManager error`);
    }, ['v',['?','B']]);

    this.vpnManager('connect', $(username), 'password', $(password), 'complete', block);
  }
}

export default (options: ConnectOptions, config?: Config): Bridge =>
  new Bridge(options, config);

export { ConnectOptions };
