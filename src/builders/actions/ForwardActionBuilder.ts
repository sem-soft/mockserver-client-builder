import { ActionType } from '../../types';
import ActionBuilderInterface from './ActionBuilderInterface';
import HttpForward from '../../dto/HttpForward';

/**
 * Forward response action by done http request
 * @see {@link https://www.mock-server.com/mock_server/creating_expectations.html#forward_action}
 */
export default class ForwardActionBuilder implements ActionBuilderInterface {
  /**
     * @type {HttpForward} httpForward
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
     * @param {string} host - the host value
     */
  public toHost(host: string): ForwardActionBuilder {
    this.httpForward.host = host;
    return this;
  }

  /**
     * Sets the port for forwarding
     * @example 443
     * @param {number} port - the port value
     */
  public toPort(port: number): ForwardActionBuilder {
    this.httpForward.port = port;
    return this;
  }

  /**
     * Sets the schema type with forward to
     * @example "HTTPS"
     * @param {"HTTP" | "HTTPS"} scheme - the scheme type of http request
     */
  public withScheme(scheme: 'HTTP' | 'HTTPS'): ForwardActionBuilder {
    this.httpForward.scheme = scheme;
    return this;
  }

  /**
     * @inheritDoc
     */
  getAction(): ActionType {
    return {
      httpForward: this.httpForward,
    };
  }
}
