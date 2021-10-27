import {
  Body,
  HttpCookies,
  HttpHeaders,
  HttpPathParams,
  HttpQueryStringParams,
  HttpRequestInterface,
  SocketAddress,
} from '../types';

export default class HttpRequest implements HttpRequestInterface {
  secure?: boolean;

  keepAlive?: boolean;

  method?: string;

  path?: string;

  pathParameters?: HttpPathParams;

  queryStringParameters?: HttpQueryStringParams;

  body?: Body;

  headers?: HttpHeaders;

  cookies?: HttpCookies;

  socketAddress?: SocketAddress;
}
