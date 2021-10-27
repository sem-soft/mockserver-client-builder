import { config, supertestRequest } from '../inventory';
import { client } from '../../src';

describe('Test mockWithCallback for mockserver client', () => {
  // Three testcase with different bodies, status & url
  const testCasesTimes = [
    ['/simple-request-mock-1', { music: 'Rock' }, 418],
    ['/simple-request-mock-2', { music: 'Hard' }, 200],
    ['/simple-request-mock-3', { music: 'Pop' }, 201],
  ];

  // Declare client dispatcher
  const mockClientDispatcher = client(config);

  // Loading the mock-data
  beforeAll(async () => {
    // Set default Request|Response headers for all mocks requests
    const cl = mockClientDispatcher
      .setDefaultHeaders({
        'X-Response-Header-1': ['Response-Header-1'],
      }, {
        'X-Request-Header-1': ['Request-Header-1'],
      });

    await cl.mockSimpleResponse('/simple-request-mock-1', { music: 'Rock' }, 418);
    await cl.mockSimpleResponse('/simple-request-mock-2', { music: 'Hard' }, 200);
    await cl.mockSimpleResponse('/simple-request-mock-3', { music: 'Pop' }, 201);
  });

  // Clearing the mock-data
  afterAll(async () => {
    // Reset all saved expectations in Mockserver
    await mockClientDispatcher
      .reset();
  });

  // Tests
  it.each(testCasesTimes)(
    "Series# %p with '%p' path, '%p' body, %p status",
    async (path, body, status) => {
      const result = await supertestRequest
        .get(path as string)
      // Sets request header
        .set({
          'X-Request-Header-1': 'Request-Header-1',
        });

      // Checks Response header
      expect(result.header).toHaveProperty('x-response-header-1', 'Response-Header-1');
      // Response text
      expect(result.text).toEqual(JSON.stringify(body));
      // Response status
      expect(result.statusCode).toEqual(status);
    },
  );
});
