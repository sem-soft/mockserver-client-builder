import { client } from 'mockserver-client-builder';

/**
 * Clear & resets all data: logs, expectations.
 *
 * @see {@link https://www.mock-server.com/mock_server/clearing_and_resetting.html}
 */


// Config
const config = {
  host: 'mockserver-srv',
  port: 1080,
  tls: false,
};

// Reset all saved expectations in Mockserver
client(config).reset();
