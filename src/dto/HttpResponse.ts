import {
  HttpCookies,
  HttpHeaders,
  Delay,
  BodyWithContentType,
  HttpResponseInterface,
  ConnectionOptionsInterface,
} from '../types';

export default class HttpResponse implements HttpResponseInterface {
  delay?: Delay;

  body?: BodyWithContentType;

  cookies?: HttpCookies;

  connectionOptions?: ConnectionOptionsInterface;

  headers?: HttpHeaders;

  statusCode?: number;

  reasonPhrase?: string;
}
