import { config, supertestRequest } from '../inventory';
import {
  client, request, expectation, response,
} from '../../src';

describe('Test remove expectation by request matcher condition', () => {
  // Declare client dispatcher
  const mockClientDispatcher = client(config);

  // Body for request-response mocks
  const body = {
    id: 13, slug: 'what-is-love', title: 'What is love?', description: "Oh baby, don't hurt me",
  };

  // Loading the mock-data
  beforeAll(async () => {
    // Add new Article
    await mockClientDispatcher.mockAnyResponse(
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
    );

    // Get Article by slug
    await mockClientDispatcher.mockAnyResponse(
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
    );
  });

  // Clearing the mock-data
  afterAll(async () => {
    await mockClientDispatcher.reset();
  });

  // Tests
  it('Reset data by request matcher condition', async () => {
    const result1 = await supertestRequest
      .post('/articles')
      .send(body);
    expect(result1.statusCode).toEqual(201);

    const result2 = await supertestRequest
      .get('/articles/what-is-love');

    // Convert JSON to Object
    const receivedObj = JSON.parse(result2.text);
    expect(result2.statusCode).toEqual(200);
    expect(receivedObj).toEqual(body);

    // Clear data by request matcher
    const reqCondition = request()
      .withMethod('POST')
      .withPath('/articles')
      .withBody(body);
    await mockClientDispatcher.clear(reqCondition, 'ALL');

    // Repeats the first request
    const result12 = await supertestRequest
      .post('/articles')
      .send(body);
    expect(result12.statusCode).toEqual(404);

    // Repeat the second request
    const result21 = await supertestRequest
      .get('/articles/what-is-love');

    // Convert JSON to Object
    const receivedObj21 = JSON.parse(result21.text);
    expect(result21.statusCode).toEqual(200);
    expect(receivedObj21).toEqual(body);
  });
});
