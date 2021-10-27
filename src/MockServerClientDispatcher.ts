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
   * @param {MockServerClient} client
   */
  constructor(private client: MockServerClient) {}

  /**
   * Setups expectations and responses for them.
   * @todo implements multiple builders as array for input
   * @param {ExpectationBuilder} builder
   * @return {Promise<RequestResponse>}
   */
  public mockAnyResponse(builder: ExpectationBuilder): Promise<RequestResponse> {
    return this.client.mockAnyResponse(builder.getExpectation());
  }

  /**
   * Setups a simple expectation that returns a JSON body for all requests on a given path.
   * This request was processed only ones (remainingTimes = 1).
   * @see {@link https://5-1.mock-server.com/mock_server/mockserver_clients.html}
   * @param {string} requestPath - plain path string for request
   * @param {T} responseBody - expecting body response structure object or simple type
   * @param {number} responseStatusCode - expecting response status code
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
   * @param {RequestMatcherBuilder} requestMatcherBuilder
   * @param {Function} requestHandler
   * @param times
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
   * @param {HttpHeaders} responseHeaders
   * @param {HttpHeaders} requestHeaders
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
   * @param {RequestMatcherBuilder} requestMatcherBuilder - request matcher pattern for data clearing
   * @param {ClearType} type - type or data for clearing
   * @return {Promise<RequestResponse>}
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
     * @return {Promise<RequestResponse>}
     */
  public reset(): Promise<RequestResponse> {
    return this.client.reset();
  }

  /**
     * Bind additional listening ports for mockserver.
     * @todo think about replacement in other dispatcher class for control only
     * @param {Port[]} ports
     */
  public bind(ports: Port[]): Promise<RequestResponse> {
    return this.client.bind(ports);
  }
}
