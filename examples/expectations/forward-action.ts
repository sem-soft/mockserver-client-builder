import {
  client, expectation, forward, request,
} from 'mockserver-client-builder';

/**
 * Building the expectation with forward action in response.
 * @see {@link https://www.mock-server.com/mock_server/creating_expectations.html}
 */

// Config
const config = {
  host: 'mockserver-srv',
  port: 1080,
  tls: false,
};

// Expectation
const expectationBuilder = expectation();

expectationBuilder
  .when(
    request()
      .withMethod('GET')
      .withPath('/from-forward-location'),
  )
  .action(
    forward()
      .toHost('sem-soft.ru')
      .toPort(443)
      .withScheme('HTTPS'),
  );

client(config)
  .mockAnyResponse(expectationBuilder);
