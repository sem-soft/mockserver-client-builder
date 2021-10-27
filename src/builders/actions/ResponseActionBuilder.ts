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

export default class ResponseActionBuilder implements ActionBuilderInterface {
  /**
     * @type {HttpResponse} httpResponse
     * @private
     */
  private httpResponse: HttpResponse;

  /**
     * @constructor
     */
  constructor() {
    this.httpResponse = new HttpResponse();
  }

  withStatusCode(code: number): ResponseActionBuilder {
    this.httpResponse.statusCode = code;
    return this;
  }

  withReasonPhrase(phrase: string): ResponseActionBuilder {
    this.httpResponse.reasonPhrase = phrase;
    return this;
  }

  withBody(body: Body): ResponseActionBuilder {
    this.httpResponse.body = body;
    return this;
  }

  withCookies(cookies: HttpCookies): ResponseActionBuilder {
    this.httpResponse.cookies = cookies;
    return this;
  }

  withHeaders(headers: HttpHeaders): ResponseActionBuilder {
    this.httpResponse.headers = headers;
    return this;
  }

  withDelay(delay: Delay): ResponseActionBuilder {
    this.httpResponse.delay = delay;
    return this;
  }

  withConnectionOptions(options: ConnectionOptionsInterface): ResponseActionBuilder {
    this.httpResponse.connectionOptions = options;
    return this;
  }

  /**
     * @inheritDoc
     */
  getAction(): ActionType {
    return {
      httpResponse: this.httpResponse,
    };
  }
}
