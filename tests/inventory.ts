import * as request from 'supertest';
import { MockServerClientConfiguration } from '../src/types';

/**
 * @todo Move to env
 */
export const schema: string = 'http';
export const host: string = 'mockserver-srv';
export const port: number = 1080;

// Mockserver configuration object
export const config: MockServerClientConfiguration = {
  host,
  port,
  tls: false,
};

// Supertest Request client for API
export const supertestRequest = request(`${schema}://${host}:${port}`);
