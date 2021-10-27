import {
  Delay,
  HttpForwardInterface,
} from '../types';

export default class HttpForward implements HttpForwardInterface {
  delay?: Delay;

  host?: string;

  port?: number;

  scheme?: 'HTTP' | 'HTTPS';
}
