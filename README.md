<div align="center">
    <img src="assets/mockserver-client-builder.png" alt="mockserver-client-builder"/>
</div>

<div align="center">
  <a href="https://npmjs.org/package/mockserver-client-builder">
    <img alt="npm" src="https://img.shields.io/npm/v/mockserver-client-builder.svg" />
  </a>
  <a href="https://npmjs.org/package/mockserver-client-builder">
    <img alt="one dependency only" src="https://badgen.net/bundlephobia/dependency-count/mockserver-client-builder" />
  </a>
  <a href="https://npmjs.org/package/mockserver-client-builder">
    <img alt="types included" src="https://badgen.net/npm/types/mockserver-client-builder" />
  </a>
</div>

<div align="center">
  Powerful mockserver client wrapper based on builders with expectation, request matcher and action builders in TypeScript notation.

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

After installing this NPM-package and setup local MockServer
you can try this [examples](./examples).

To run some scenario use nodejs CLI for compiled js.

```shell
$ eslint . --ext .ts
...
$ tcs --build
...
nodejs ./lib/expectations/complex-expectation.js
```

Now your MockServer is ready to accept requests with expectation responses based on `complex-expectation.js` scenario.

## Run tests

For example, the MockServer started on `mockserver-srv`, without https and on 1080 port.

```shell
SCHEMA=http HOST=mockserver-srv PORT=1080 npm run test
```