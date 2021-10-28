import {
  Delay,
  HttpForwardInterface,
} from '../types';

/**
 * Implements DTO for Forward Action
 */
export default class HttpForward implements HttpForwardInterface {
  delay?: Delay;

  host?: string;

  port?: number;

  scheme?: 'HTTP' | 'HTTPS';
}
