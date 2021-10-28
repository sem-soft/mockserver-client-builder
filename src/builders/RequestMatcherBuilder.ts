import {
  HttpCookies,
  HttpHeaders,
  HttpPathParams,
  HttpQueryStringParams,
  SocketAddress,
  Body,
  HttpMethod,
} from '../types';
import HttpRequest from '../dto/HttpRequest';

/**
 * Request matcher builder class
 * @see {@link https://www.mock-server.com/mock_server/creating_expectations.html#request_properties_matchers}
 */
export default class RequestMatcherBuilder {
  /**
   * Request matcher object for building
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
   * Sets Http method type for request
   * @example 'GET'
   */
  public withMethod(method: HttpMethod): RequestMatcherBuilder {
    this.requestMatcher.method = method;
    return this;
  }

  /**
   * Sets the path of http request
   * @example '/api/v3/product/{productId}'
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
   */
  public withQueryStringParameters(params: HttpQueryStringParams): RequestMatcherBuilder {
    this.requestMatcher.queryStringParameters = params;
    return this;
  }

  /**
   * Sets the http request headers
   */
  public withHeaders(headers: HttpHeaders): RequestMatcherBuilder {
    this.requestMatcher.queryStringParameters = headers;
    return this;
  }

  /**
   * Sets the http request cookies
   */
  public withCookies(cookies: HttpCookies): RequestMatcherBuilder {
    this.requestMatcher.cookies = cookies;
    return this;
  }

  /**
   * Sets the body of http request
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

  /**
   * Returns Request matcher object after all with-building steps
   */
  public getMatcher(): HttpRequest {
    return this.requestMatcher;
  }
}
