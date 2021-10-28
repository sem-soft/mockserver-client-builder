import { client, request } from 'mockserver-client-builder';

/**
 * Clear several data types by request matcher options. It may be expectations, logs or both.
 * @see {@link https://www.mock-server.com/mock_server/clearing_and_resetting.html}
 */

// Config
const config = {
  host: 'mockserver-srv',
  port: 1080,
  tls: false,
};

client(config)
  .clear(
    request().withMethod('GET')
      .withPath('/cities'),
    'ALL',
  );
