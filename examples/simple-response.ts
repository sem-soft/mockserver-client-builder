import { client } from 'mockserver-client-builder';

/**
 * Simple inline expectation settings.
 *
 * @see {@link https://5-1.mock-server.com/mock_server/mockserver_clients.html}
 */


// Config
const config = {
  host: 'mockserver-srv',
  port: 1080,
  tls: false,
};

// Simple plain response mock
client(config)
  .mockSimpleResponse('/simple-request-mock', { music: 'Rock' }, 418);
