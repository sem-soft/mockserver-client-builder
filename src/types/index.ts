import {
  BasicClearType,
  BasicPort,
  BasicHost,
  BasicTLS,
  BasicRequestResponse,
  BasicMockServerClient,
  BasicCaCertPemFilePath,
  BasicContextPath,
} from './client';

import {
  KeyToValue,
  KeyToMultiValue,
  BasicTimes,
  BasicBody,
  BasicHttpTemplate,
  BasicHttpClassCallback,
  BasicHttpError,
  BasicHttpObjectCallback,
  BasicHttpOverrideForwardedRequest,
  BasicTimeToLive,
  BasicDelay,
  BasicSocketAddress,
  BasicBodyWithContentType,
  ExpectationInterface as BasicExpectationInterface,
  HttpForwardInterface as BasicHttpForwardInterface,
  HttpResponseInterface as BasicHttpResponseInterface,
  HttpRequestInterface as BasicHttpRequestInterface,
  ConnectionOptionsInterface as BasicConnectionOptionsInterface,
} from './server';

// Primitives
export type HttpHeaders = KeyToMultiValue;

export type HttpCookies = KeyToValue;

export type HttpPathParams = KeyToMultiValue;

export type HttpQueryStringParams = KeyToMultiValue;

export type ActionType = {
  httpForward: BasicHttpForwardInterface
} | {
  httpResponse: BasicHttpResponseInterface
};

// Server types
export type HttpRequestDefinition = HttpRequestInterface;

export type HttpResponseDefinition = BasicHttpResponseInterface;

export type HttpTemplate = BasicHttpTemplate;

export type HttpClassCallback = BasicHttpClassCallback;

export type HttpError = BasicHttpError;

export type HttpObjectCallback = BasicHttpObjectCallback;

export type HttpOverrideForwardedRequest = BasicHttpOverrideForwardedRequest;

export type TimeToLive = BasicTimeToLive;

export type Times = BasicTimes;

export type SocketAddress = BasicSocketAddress;

export type Body = BasicBody;

export type Delay = BasicDelay;

export type BodyWithContentType = BasicBodyWithContentType;

export interface MockServerClient extends BasicMockServerClient{}

export interface ExpectationInterface extends BasicExpectationInterface{}

export interface HttpForwardInterface extends BasicHttpForwardInterface{}

export interface HttpRequestInterface extends BasicHttpRequestInterface{}

export interface HttpResponseInterface extends BasicHttpResponseInterface{}

export interface ConnectionOptionsInterface extends BasicConnectionOptionsInterface{}

// Client types
export type ClearType = BasicClearType;

export type RequestResponse = BasicRequestResponse;

export type Host = BasicHost;

export type Port = BasicPort;

export type TLS = BasicTLS;

export type CaCertPemFilePath = BasicCaCertPemFilePath;

export type ContextPath = BasicContextPath;

export interface MockServerConnection {
  host: Host,
  port: Port,
  contextPath?: ContextPath,
  tls?: TLS,
  caCertPemFilePath?: CaCertPemFilePath
}
