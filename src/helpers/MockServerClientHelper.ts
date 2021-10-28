import { mockServerClient } from 'mockserver-client';
import { MockServerClient, MockServerConnection } from '../types';

/**
 * Static helper class for configuration mockserver client
 */
export default class MockServerClientHelper {
  /**
   * Initialize mockserver client based on connection configuration
   */
  public static initClient(config: MockServerConnection): MockServerClient {
    const {
      host, port, contextPath, tls, caCertPemFilePath,
    } = config;
    return mockServerClient(host, port, contextPath, tls, caCertPemFilePath);
  }
}
