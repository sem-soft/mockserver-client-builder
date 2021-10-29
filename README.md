<div align="center">
    <img src="assets/mockserver-client-builder.png" alt="mockserver-client-builder"/>
</div>

<div align="center">
  <a href="https://npmjs.org/package/mockserver-client-builder">
    <img alt="npm" src="https://img.shields.io/npm/v/mockserver-client-builder.svg" />
  </a>
  <a href="https://github.com/sem-soft/mockserver-client-builder/actions">
    <img alt="build" src="https://img.shields.io/github/workflow/status/sem-soft/mockserver-client-builder/ci-cd-to-npmjs/main.svg" />
  </a>
  <a href="https://npmjs.org/package/mockserver-client-builder">
    <img alt="one dependency only" src="https://badgen.net/bundlephobia/dependency-count/mockserver-client-builder" />
  </a>
  <a href="https://npmjs.org/package/mockserver-client-builder">
    <img alt="types included" src="https://badgen.net/npm/types/mockserver-client-builder" />
  </a>
</div>

<div align="center">
  Powerful <strong>mockserver client wrapper</strong> based on builders with expectation, request matcher and action builders in TypeScript notation.

  Based around <a href="https://github.com/mock-server/mockserver-client-node">mockserver-client-node</a>.
</div>

## About

The package provides the ability to program the MockServer in design mode.

Configure expectations, scheduling requests and responses through a convenient builder system.

Detailed API documentation of MockServer can be found on the [official website](https://www.mock-server.com).

## Basics

```
npm i mockserver-client-builder
```

```typescript
import { client } from 'mockserver-client-builder';

// Config
const config = {
  host: 'mockserver-srv',
  port: 1080,
  tls: false,
};

// Simple plain response mock
client(config)
  .mockSimpleResponse('/simple-mock-request', { music: 'Rock' }, 418);
```

## Running MockServer in the Docker

For running MockServer in Docker for local usage you can apply 
this [docker-compose.yml](./docker-compose.yml).

For advanced manual configuration of MockServer in Docker
see [this](https://www.mock-server.com/where/docker.html) article.

## Usage examples

To run some scenario use nodejs CLI for compiled js.

```shell
$ eslint . --ext .ts
...
$ tcs --build
...
$ nodejs ./lib/path/complex-expectation.js
```

Now your MockServer is ready to accept requests with expectation responses based on `complex-expectation.js` scenario.

### Example #1. Complex expectation creation

Let's create a new file `complex-expectation.ts` for mock expectation implementation.
<details>
  <summary>src/path/complex-expectation.ts</summary>

```typescript
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
// After 30 seconds the expectation will be deleted
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

```
</details>

### Example #2. Clear all expecattions data from mockserver

Let's write a small code in file `reset-all.ts`.

<details>
  <summary>src/path/reset-all.ts</summary>

```typescript
import { client } from 'mockserver-client-builder';

/**
 * Clear & resets all data: logs, expectations.
 *
 * @see {@link https://www.mock-server.com/mock_server/clearing_and_resetting.html}
 */

// Config
const config = {
  host: 'mockserver-srv',
  port: 1080,
  tls: false,
};

// Reset all saved expectations in Mockserver
client(config)
  .reset()
  .then((/* value */) => {
    console.log('OK: Clear All');
  }, (/* reason */) => {
    console.log('FAIL: Clear All');
  });

```
</details>

### Other examples

See other [examples](./examples) with creation of requests, responses, expectations and also control it in mockserver.

## Run tests

For example, the MockServer started on `mockserver-srv`, without https and on 1080 port.

```shell
SCHEMA=http HOST=mockserver-srv PORT=1080 npm run test
```