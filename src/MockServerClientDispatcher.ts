import RequestMatcherBuilder from './builders/RequestMatcherBuilder';
import ExpectationBuilder from './builders/ExpectationBuilder';
import {
  ClearType,
  HttpHeaders,
  MockServerClient,
  Port,
  RequestResponse,
  Times,
} from './types';

/**
 * Class-wrapper for MockServerClient class instance.
 * Dispatches the main methods for client.
 * @see {@link https://www.mock-server.com/mock_server/mockserver_clients.html}
 * @todo implements the next methods wrappers:
 *      - verify
 *      - verifySequence
 *      - retrieveRecordedRequests
 *      - retrieveRecordedRequestsAndResponses
 *      - retrieveActiveExpectations
 *      - retrieveRecordedExpectations
 *      - retrieveLogMessages
 */
export default class MockServerClientDispatcher {
  /**
   * @constructor
   */
  constructor(private client: MockServerClient) {}

  /**
   * Setups expectations and responses for them.
   * @todo implements multiple builders as array for input
   */
  public mockAnyResponse(
    builder: ExpectationBuilder | ExpectationBuilder[],
  ): Promise<RequestResponse> {
    return this.client.mockAnyResponse(
      Array.isArray(builder)
        ? builder.map((b:ExpectationBuilder) => b.getExpectation())
        : builder.getExpectation(),
    );
  }

  /**
   * Setups a simple expectation that returns a JSON body for all requests on a given path.
   * This request was processed only ones (remainingTimes = 1).
   * @see {@link https://5-1.mock-server.com/mock_server/mockserver_clients.html}
   */
  public mockSimpleResponse<T = any>(
    requestPath: string,
    responseBody: T,
    responseStatusCode: number,
  ): Promise<RequestResponse> {
    return this.client.mockSimpleResponse(requestPath, responseBody, responseStatusCode);
  }

  /**
   * Handle request by callback function vie web-sockets.
   * Block nodejs cli until break.
   * @see {@link https://www.mock-server.com/mock_server/creating_expectations.html#button_response_method_or_closure_callback}
   */
  public mockWithCallback(
    requestMatcherBuilder: RequestMatcherBuilder,
    requestHandler: (request: any) => any,
    times?: Times | number,
  ): Promise<RequestResponse> {
    return this.client.mockWithCallback(requestMatcherBuilder.getMatcher(), requestHandler, times);
  }

  /**
   * Sets the default http headers for request & response, for all expectations on this instance of client.
   */
  public setDefaultHeaders(
    responseHeaders: HttpHeaders,
    requestHeaders: HttpHeaders,
  ): MockServerClient {
    return this.client.setDefaultHeaders(responseHeaders, requestHeaders);
  }

  /**
   * Clear several data types by request matcher options. It may be expectations, logs or both.
   * @see {@link https://www.mock-server.com/mock_server/clearing_and_resetting.html}
   */
  public clear(
    requestMatcherBuilder: RequestMatcherBuilder,
    type: ClearType,
  ): Promise<RequestResponse> {
    return this.client.clear(requestMatcherBuilder.getMatcher(), type);
  }

  /**
   * Clear & resets all data: logs, expectations.
   * @see {@link https://www.mock-server.com/mock_server/clearing_and_resetting.html}
   */
  public reset(): Promise<RequestResponse> {
    return this.client.reset();
  }

  /**
   * Bind additional listening ports for mockserver.
   */
  public bind(ports: Port[]): Promise<RequestResponse> {
    return this.client.bind(ports);
  }
}
