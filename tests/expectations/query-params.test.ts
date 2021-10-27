import { config, supertestRequest } from '../inventory';
import {
  client, request, expectation, response,
} from '../../src';

describe('Test requests with Get Params', () => {
  // Declare client dispatcher
  const mockClientDispatcher = client(config);

  // Body for request-response mocks
  const body = {
    items: [],
  };

  // Loading the mock-data
  beforeAll(async () => {
    // Add new Article
    await mockClientDispatcher.mockAnyResponse(
      expectation()
        .when(
          request()
            .withMethod('GET')
            .withPath('/models')
            .withQueryStringParameters({
              'filter[id]': ['11', '12'],
              name: ['iPhone 12 Pro Max 256Gb'],
            }),
        )
        .action(
          response()
            .withStatusCode(200)
            .withBody(body),
        ),
    );
  });

  // Clearing the mock-data
  afterAll(async () => {
    await mockClientDispatcher.reset();
  });

  // Tests
  it('Request with GET-query params matches', async () => {
    const result = await supertestRequest
      .get('/models')
      .query({
        filter: [
          {
            id: 11,
          },
          {
            id: 12,
          },
        ],
        name: 'iPhone 12 Pro Max 256Gb',
      });

    // Convert JSON to Object
    const receivedObj = JSON.parse(result.text);
    expect(result.statusCode).toEqual(200);
    expect(receivedObj).toEqual(body);
  });

  it('Request with GET-query params without matches', async () => {
    const result = await supertestRequest
      .get('/models')
      .query({
        filter: [
          {
            id: 11,
          },
          {
            id: 123,
          },
        ],
        name: 'iPhone 12 Pro Max 512Gb',
      });
    expect(result.statusCode).toEqual(404);
  });
});
