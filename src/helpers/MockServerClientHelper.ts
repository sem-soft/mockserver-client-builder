import { mockServerClient } from 'mockserver-client';
import { MockServerClient, MockServerConnection } from '../types';

export default class MockServerClientHelper {
  public static initClient(config: MockServerConnection): MockServerClient {
    const {
      host, port, contextPath, tls, caCertPemFilePath,
    } = config;
    return mockServerClient(host, port, contextPath, tls, caCertPemFilePath);
  }
}
