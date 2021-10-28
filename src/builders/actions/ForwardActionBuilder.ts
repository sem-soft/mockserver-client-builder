import { ActionType, HttpSchema } from '../../types';
import ActionBuilderInterface from './ActionBuilderInterface';
import HttpForward from '../../dto/HttpForward';

/**
 * Forward response action by done http request
 * @see {@link https://www.mock-server.com/mock_server/creating_expectations.html#response_action}
 */
export default class ForwardActionBuilder implements ActionBuilderInterface {
  /**
   * Forward action object for building
   * @private
   */
  private httpForward: HttpForward;

  /**
   * @constructor
   */
  constructor() {
    this.httpForward = new HttpForward();
  }

  /**
   * Sets the host for forwarding
   * @example "mock-server.com"
   */
  public toHost(host: string): ForwardActionBuilder {
    this.httpForward.host = host;
    return this;
  }

  /**
   * Sets the port for forwarding
   * @example 443
   */
  public toPort(port: number): ForwardActionBuilder {
    this.httpForward.port = port;
    return this;
  }

  /**
   * Sets the schema type with forward to
   * @example "HTTPS"
   */
  public withScheme(scheme: HttpSchema): ForwardActionBuilder {
    this.httpForward.scheme = scheme;
    return this;
  }

  /**
   * @inheritDoc
   */
  public getAction(): ActionType {
    return {
      httpForward: this.httpForward,
    };
  }
}
