export interface Options {
  description: string;
  protocol: 'ikev2';
  server: string;
  remoteId: string;
  localId?: string;
}

export interface Config {
  log?: any;
  frameworkPath?: string;
}
