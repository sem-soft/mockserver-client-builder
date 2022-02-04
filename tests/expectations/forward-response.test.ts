import {
  config, host, port, supertestRequest,
} from '../inventory';
import {
  client, request, expectation, forward,
} from '../../src';

describe('Test requests with forwarding response', () => {
  // Declare client dispatcher
  const mockClientDispatcher = client(config);

  // Loading the mock-data
  beforeAll(async () => {
    await mockClientDispatcher.mockAnyResponse(
      expectation()
        .when(
          request()
            .withMethod('GET')
            .withPath('/from-forward-location'),
        )
        .action(
          forward()
            .toHost(`${host}:${port}`)
            .withScheme('HTTP'),
        ),
    );
  });

  // Clearing the mock-data
  afterAll(async () => {
    await mockClientDispatcher.reset();
  });

  // Tests
  it('Forwarded response', async () => {
    const result = await supertestRequest
      .get('/from-forward-location');

    // Stupid test to root of mockserver for 404
    expect(result.statusCode).toEqual(404);
  });
});
