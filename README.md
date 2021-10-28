# MockServer client wrapper

![Package release](https://badgen.net/github/release/sem-soft/mockserver-client-builder)

Powerful mockserver client wrapper based on builders with expectation, 
request matcher and action builders in TypeScript notation.

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

## Running MockServer as a Docker Compose service

For running MockServer in Docker for local usage you can apply 
this [docker-compose.yml](./docker-compose.yml).

For advanced manual configuration of MockServer in Docker
see [this](https://www.mock-server.com/where/docker.html) article.

## Usage examples

With installed NPM package and local MockServer
you can work with [some examples](./examples).

After writes some scenarios run the compiled js with nodejs CLI:

```shell
nodejs ./lib/expectations/complex-expectation.js
```

Now your MockServer is ready to accept requests with expectation responses based on `complex-expectation.js` scenario.

## Run tests

For example, the MockServer started on `mockserver-srv`, without https and on 1080 port.

```shell
SCHEMA=http HOST=mockserver-srv PORT=1080 npm run test
```