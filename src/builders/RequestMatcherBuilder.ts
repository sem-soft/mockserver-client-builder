import {
  HttpCookies,
  HttpHeaders,
  HttpPathParams,
  HttpQueryStringParams,
  SocketAddress,
  Body,
} from '../types';
import HttpRequest from '../dto/HttpRequest';

/**
 * Request matcher builder class
 * @see {@link https://www.mock-server.com/mock_server/creating_expectations.html#request_properties_matchers}
 */
export default class RequestMatcherBuilder {
  /**
     * @type {Array<string>} httpMethods - the list of http methods
     */
  public static httpMethods: Array<string> = [
    'GET',
    'HEAD',
    'POST',
    'PUT',
    'DELETE',
    'CONNECT',
    'OPTIONS',
    'TRACE',
    'PATCH',
  ];

  /**
     * @type {HttpRequest} requestMatcher - Request matcher for building
     * @private
     */
  private requestMatcher: HttpRequest;

  /**
     * @constructor
     */
  constructor() {
    this.requestMatcher = new HttpRequest();
  }

  /**
     * Returns Request matcher object after all with-building steps
     * @return {HttpRequest}
     */
  public getMatcher(): HttpRequest {
    return this.requestMatcher;
  }

  /**
     * Sets Http method type for request
     * @example 'GET'
     * @param {string} method - method type
     */
  public withMethod(method: string): RequestMatcherBuilder {
    if (RequestMatcherBuilder.httpMethods.indexOf(method) === -1) {
      const allowedMethods = RequestMatcherBuilder.httpMethods.join(', ');
      throw new Error(`Method name can by only one of the following ${allowedMethods}`);
    }
    this.requestMatcher.method = method;

    return this;
  }

  /**
     * Sets the path of http request
     * @example '/api/v3/product/{productId}'
     * @param {string} path - path of http request
     */
  public withPath(path: string): RequestMatcherBuilder {
    this.requestMatcher.path = path;
    return this;
  }

  /**
     * Sets the path parameters of http request.
     * @example <caption>See example value below for example of path method.</caption>
     * {
     *     "productId": ["055CA455-1DF7-45BB-8535-4F83E7266092"]
     * }
     * @param {HttpPathParams} params
     */
  public withPathParameters(params: HttpPathParams): RequestMatcherBuilder {
    this.requestMatcher.pathParameters = params;
    return this;
  }

  /**
     * Sets the query parameters of http request or rule for their construction
     * @example <caption>Example of regexp rule for path parameters</caption>
     * {
     *     "type": ["[A-Z0-9\\-]+"]
     * }
     * @example <caption>Example of static sets of query params</caption>
     * {
     *      "filter[id]": ["11", "12"],
     *      "code": ["61"]
     * }
     * @param {HttpQueryStringParams} params
     */
  public withQueryStringParameters(params: HttpQueryStringParams): RequestMatcherBuilder {
    this.requestMatcher.queryStringParameters = params;
    return this;
  }

  /**
     * Sets the http request headers
     * @param {HttpHeaders} headers
     */
  public withHeaders(headers: HttpHeaders): RequestMatcherBuilder {
    this.requestMatcher.queryStringParameters = headers;
    return this;
  }

  /**
     * Sets the http request cookies
     * @param {HttpCookies} cookies
     */
  public withCookies(cookies: HttpCookies): RequestMatcherBuilder {
    this.requestMatcher.cookies = cookies;
    return this;
  }

  /**
     * Sets the body of http request
     * @param {Body} body
     */
  public withBody(body: Body): RequestMatcherBuilder {
    this.requestMatcher.body = body;
    return this;
  }

  /**
     * Enables connection keepalive option
     */
  public withKeepAlive(): RequestMatcherBuilder {
    this.requestMatcher.keepAlive = true;
    return this;
  }

  /**
     * Sets web-socket address
     * @param {SocketAddress} address
     */
  public withSocketAddress(address: SocketAddress): RequestMatcherBuilder {
    this.requestMatcher.socketAddress = address;
    return this;
  }

  /**
     * Enables https for request
     */
  public withHttps(): RequestMatcherBuilder {
    this.requestMatcher.secure = true;
    return this;
  }
}
