import { mockServerClient } from 'mockserver-client';
import { MockServerClient, MockServerClientConfiguration } from '../types';

export default class MockServerClientHelper {
  public static initClient(config: MockServerClientConfiguration): MockServerClient {
    const {
      host, port, contextPath, tls, caCertPemFilePath,
    } = config;
    return mockServerClient(host, port, contextPath, tls, caCertPemFilePath);
  }
}
