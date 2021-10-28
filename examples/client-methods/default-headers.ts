import { client } from 'mockserver-client-builder';

/**
 * Sets the default headers for all requests|responses in this mockClient scope.
 */

// Config
const config = {
  host: 'mockserver-srv',
  port: 1080,
  tls: false,
};

// Set default Request|Response headers for all mocks requests
const mockClient = client(config)
  .setDefaultHeaders({
    'X-Response-Header-1': ['Response-Header-1'],
  }, {});

mockClient.mockSimpleResponse('/simple-request-mock-1', { music: 'Rock' }, 418);
mockClient.mockSimpleResponse('/simple-request-mock-2', { music: 'Hard' }, 200);
mockClient.mockSimpleResponse('/simple-request-mock-3', { music: 'Pop' }, 201);
