import {
  client, expectation, request, response,
} from 'mockserver-client-builder';

/**
 * Complex expectation building with some advanced params for request matcher, response and expectation.
 * @see {@link https://www.mock-server.com/mock_server/creating_expectations.html}
 */

// Config
const config = {
  host: 'mockserver-srv',
  port: 1080,
  tls: false,
};

// Expectation
const expectationBuilder = expectation()
// When we send request
  .when(
    request()
      .withMethod('GET')
      .withPath('/cities')
      .withQueryStringParameters({
        'filter[id]': ['11', '12'],
        code: ['61'],
      }),
  )
// We expect a respond
  .action(
    response()
      .withStatusCode(200)
      .withBody({
        items: [
          {
            id: '1',
            name: 'Ростов-на-Дону',
          },
          {
            id: '2',
            name: 'Москва',
          },
          {
            id: '3',
            name: 'Таганрог',
          },
        ],
      })
      .withCookies({
        session_id: 'Rftre5638jucg93',
      })
      .withHeaders({
        'Content-Type': [
          'application/json; charset=utf-8',
        ],
        'Cache-Control': [
          'public, max-age=86400',
        ],
        'X-Vendor': [
          'Oleg Chulakov Studio',
        ],
      }),
  )
// Sets priority of expectation
  .withPriority(100)
// After 2 calls the expectation will be cleared
  .withTimes({
    remainingTimes: 2,
  })
// After 60 seconds the expectation will be deleted
  .withTimeToLive({
    timeUnit: 'SECONDS',
    timeToLive: 30,
  })
// Set custom expectation id for simple update (replace)
  .withId('the-on-of-123');

// Send our expectation into mocksever
client(config)
  .mockAnyResponse(expectationBuilder)
  .then((/* value */) => {
    console.log('OK: /cities');
  }, (/* reason */) => {
    console.log('FAIL: /cities');
  });
