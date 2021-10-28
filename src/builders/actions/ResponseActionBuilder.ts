import HttpResponse from '../../dto/HttpResponse';
import ActionBuilderInterface from './ActionBuilderInterface';
import {
  ActionType,
  Body,
  ConnectionOptionsInterface,
  Delay,
  HttpCookies,
  HttpHeaders,
} from '../../types';

/**
 * Response builder action by done http request
 */
export default class ResponseActionBuilder implements ActionBuilderInterface {
  /**
   * Response action object for building
   * @private
   */
  private httpResponse: HttpResponse;

  /**
   * @constructor
   */
  constructor() {
    this.httpResponse = new HttpResponse();
  }

  /**
   * Http status code for response
   * @see {@link https://www.mock-server.com/mock_server/creating_expectations.html#button_response_literal_status_code_and_reason_phrase}
   */
  withStatusCode(code: number): ResponseActionBuilder {
    this.httpResponse.statusCode = code;
    return this;
  }

  /**
   * Override response reason phrase
   * @see {@link https://www.mock-server.com/mock_server/creating_expectations.html#button_response_literal_status_code_and_reason_phrase}
   * @example "OK"
   */
  withReasonPhrase(phrase: string): ResponseActionBuilder {
    this.httpResponse.reasonPhrase = phrase;
    return this;
  }

  /**
   * Body of response
   * @see {@link https://www.mock-server.com/mock_server/creating_expectations.html#button_response_literal_binary_PNG_body}
   */
  withBody(body: Body): ResponseActionBuilder {
    this.httpResponse.body = body;
    return this;
  }

  /**
   * Cookies sets by response
   * @see {@link https://www.mock-server.com/mock_server/creating_expectations.html#button_response_literal_with_cookie}
   */
  withCookies(cookies: HttpCookies): ResponseActionBuilder {
    this.httpResponse.cookies = cookies;
    return this;
  }

  /**
   * Headers sets by response
   * @see {@link https://www.mock-server.com/mock_server/creating_expectations.html#button_response_literal_with_header}
   */
  withHeaders(headers: HttpHeaders): ResponseActionBuilder {
    this.httpResponse.headers = headers;
    return this;
  }

  /**
   * Delay time for response throttling
   * @see {@link https://www.mock-server.com/mock_server/creating_expectations.html#button_response_literal_with_10_second_delay}
   */
  withDelay(delay: Delay): ResponseActionBuilder {
    this.httpResponse.delay = delay;
    return this;
  }

  /**
   * Additions connection options
   * @see {@link https://www.mock-server.com/mock_server/creating_expectations.html#button_response_literal_with_connection_options_to_suppress_headers}
   */
  withConnectionOptions(options: ConnectionOptionsInterface): ResponseActionBuilder {
    this.httpResponse.connectionOptions = options;
    return this;
  }

  /**
   * @inheritDoc
   */
  public getAction(): ActionType {
    return {
      httpResponse: this.httpResponse,
    };
  }
}
