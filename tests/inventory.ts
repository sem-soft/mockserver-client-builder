import * as request from 'supertest';
import { MockServerConnection } from '../src/types';

/**
 * /app # SCHEMA=http HOST=mockserver-srv PORT=1080 npm run test
 */
export const schema: string = process.env.SCHEMA || 'http';
export const host: string = process.env.HOST || 'mockserver-srv';
export const port: number = <number>(process.env.PORT || 1080);

// Mockserver configuration object
export const config: MockServerConnection = {
  host,
  port,
  tls: false,
};

// Supertest Request client for API
export const supertestRequest = request(`${schema}://${host}:${port}`);
