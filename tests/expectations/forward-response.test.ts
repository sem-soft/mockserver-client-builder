import { config, supertestRequest } from '../inventory';
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
            .toHost('sem-soft.ru')
            .toPort(443)
            .withScheme('HTTPS'),
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

    // Check some content from https://sem-soft.ru
    expect(result.statusCode).toEqual(200);
    expect(result.text).toMatch(new RegExp('(.*)sem-soft.ru(.*)', 'm'));
  });
});
