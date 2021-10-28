import { client, request } from 'mockserver-client-builder';

/**
 * Implementation of callback-function response configuration.
 * @see {@link https://www.mock-server.com/mock_server/creating_expectations.html#button_response_method_or_closure_callback}
 */

// Config
const config = {
  host: 'mockserver-srv',
  port: 1080,
  tls: false,
};

// Callback function — response generator
const handler = () => ({
  statusCode: 418,
  reasonPhrase: 'Rooock!',
});

client(config)
  .mockWithCallback(
    request().withMethod('GET')
      .withPath('/callback-request-handler'),
    handler,
    10,
  ).then((/* value */) => {
    console.log('OK: /callback-request-handler');
  }, (/* reason */) => {
    console.log('FAIL: /callback-request-handler');
  });
