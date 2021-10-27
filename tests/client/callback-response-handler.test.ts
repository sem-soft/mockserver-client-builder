import { config, supertestRequest } from '../inventory';
import { client, request } from '../../src';

describe('Test mockWithCallback for mockserver client', () => {
  // We test 11 series: 10 with 418 status code, on 11 time — 404
  const testCasesTimes = [
    [1, 418],
    [2, 418],
    [3, 418],
    [4, 418],
    [5, 404],
  ];

  // Declare client dispatcher
  const mockClientDispatcher = client(config);

  // Loading the mock-data
  beforeAll(async () => {
    await mockClientDispatcher
      .mockWithCallback(
        request()
          .withMethod('GET')
          .withPath('/callback-request-handler'),
        () => ({
          statusCode: 418,
          reasonPhrase: 'Rooock!',
        }),
        (testCasesTimes.length - 1),
      );
  });

  // Clearing the mock-data
  afterAll(async () => {
    // Reset all saved expectations in Mockserver
    await mockClientDispatcher
      .reset();
  });

  // Tests
  it.each(testCasesTimes)(
    'Series# %p of 11 with code %p',
    async (series, exepectedStatusCode) => {
      const result = await supertestRequest.get('/callback-request-handler');
      expect(result.statusCode).toEqual(exepectedStatusCode);
    },
  );
});
