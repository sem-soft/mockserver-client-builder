import { config, supertestRequest } from '../inventory';
import {
  client, request, expectation, response,
} from '../../src';

describe('Test multiple expectations set in mockAnyResponse', () => {
  // Declare client dispatcher
  const mockClientDispatcher = client(config);

  // Body for request-response mocks
  const body = {
    id: 13, slug: 'what-is-love', title: 'What is love?', description: "Oh baby, don't hurt me",
  };

  // Loading the mock-data
  beforeAll(async () => {
    const expectations = [
      expectation()
        .when(
          request()
            .withMethod('POST')
            .withPath('/articles')
            .withBody(body),
        )
        .action(
          response()
            .withStatusCode(201),
        ),
      expectation()
        .when(
          request()
            .withMethod('GET')
            .withPath('/articles/{slug}')
            .withPathParameters({
              slug: ['what-is-love'],
            }),
        )
        .action(
          response()
            .withStatusCode(200)
            .withBody(body),
        ),
    ];

    // Add new Article
    await mockClientDispatcher.mockAnyResponse(expectations);
  });

  // Clearing the mock-data
  afterAll(async () => {
    await mockClientDispatcher.reset();
  });

  // Tests
  it('Trigger requests from multiple expectations population', async () => {
    let result = await supertestRequest
      .post('/articles')
      .send(body);
    expect(result.statusCode).toEqual(201);

    result = await supertestRequest
      .get('/articles/what-is-love');

    // Convert JSON to Object
    const receivedObj = JSON.parse(result.text);
    expect(result.statusCode).toEqual(200);
    expect(receivedObj).toEqual(body);
  });
});
