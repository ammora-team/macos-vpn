const $ = require('nodobjc'); // eslint-disable-line

$.import('./ammora_vpn.framework');

export class Bridge {
  get isConnected(): boolean {
    return $.VPN('isConnected');
  }
}
