import {
  ExpectationInterface,
  HttpClassCallback,
  HttpError,
  HttpForwardInterface,
  HttpObjectCallback,
  HttpOverrideForwardedRequest,
  HttpRequestDefinition,
  HttpResponseDefinition,
  HttpTemplate,
  Times,
  TimeToLive,
} from '../types';

/**
 * Implements DTO for Expectation
 */
export default class Expectation implements ExpectationInterface {
  id?: string;

  priority?: number;

  httpRequest?: HttpRequestDefinition;

  httpResponse?: HttpResponseDefinition;

  httpResponseTemplate?: HttpTemplate;

  httpResponseClassCallback?: HttpClassCallback;

  httpResponseObjectCallback?: HttpObjectCallback;

  httpForward?: HttpForwardInterface;

  httpForwardTemplate?: HttpTemplate;

  httpForwardClassCallback?: HttpClassCallback;

  httpForwardObjectCallback?: HttpObjectCallback;

  httpOverrideForwardedRequest?: HttpOverrideForwardedRequest;

  httpError?: HttpError;

  times?: Times;

  timeToLive?: TimeToLive;
}
