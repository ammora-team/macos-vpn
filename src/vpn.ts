import { Config, ConnectOptions } from './interfaces';

const path = require('path'); // eslint-disable-line

export class Bridge {
  private vpnManager: any;

  private readonly config?: Config = {};

  private $: any;

  private fwImported = false;

  private readonly options: any;

  constructor(options?: ConnectOptions, config?: Config) {
    this.config = config;

    this.options = options;
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

  get objC(): any {
    if (this.$ !== undefined) {
      return this.$;
    }

    try {
      this.$ = require('@ammora/nodobjc'); // eslint-disable-line
    } catch (e) {
      this.log.info('Error import Objc: ', e.message);
      throw e;
    }

    return this.$;
  }

  private importFramework(): void {
    if (this.fwImported) {
      return;
    }

    let frameworkPath = this.config?.frameworkPath;

    if (frameworkPath === null || frameworkPath === undefined) {
      frameworkPath = path.join(__dirname, '..');
    }

    const fwPath: string = path.join(frameworkPath, 'VPNManager.framework');
    this.log.info('VPNManager Framework path: ' + fwPath);

    this.objC.import(fwPath);

    this.log.info('VPNManager Framework import');
    this.fwImported = true;
  }

  get manager(): any {
    return this.vpnManager;
  }

  create(options: ConnectOptions): this {
    this.importFramework();
    const json = JSON.stringify(options);
    this.vpnManager = this.objC.VPNManager('alloc')('initWithJson', this.objC(json));

    this.log.info('VPNManager created');

    return this;
  }

  connect(username: string, password: string): void {
    if (this.vpnManager === undefined && this.options !== undefined) {
      this.create(this.options);
    }

    if (this.vpnManager === undefined) {
      throw new Error('VPNManager no created!');
    }

    const self = this; // eslint-disable-line
    const block = this.objC(function(_self: any, isSuccess: any) {
      // @todo get NSError
      self.log.info('VPNManager connecting');
      if (isSuccess === true) {
        self.log.info('VPNManager connected');
        return;
      }

      self.log.info(`VPNManager error`);
    }, ['v',['?','B']]);

    this.vpnManager('connect', this.objC(username), 'password', this.objC(password), 'complete', block);
  }
}

export default (options: ConnectOptions, config?: Config): Bridge =>
  new Bridge(options, config);

export { ConnectOptions };
