<p align="center">
 <h2 align="center">rigelsdk</h2>
 <p align="center">Typescript SDK for <a href="[rigel](https://github.com/sdqri/rigel)">rigel</a></p>
  <p align="center">
  <a href="https://github.com/sdqri/rigelsdk/issues">
      <img alt="Issues" src="https://img.shields.io/github/issues/sdqri/rigelsdk?style=flat&color=336791" />
    </a>
    <a href="https://github.com/sdqri/rigelsdk/pulls">
      <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/sdqri/rigelsdk?style=flat&color=336791" />
    </a>
     <a href="https://github.com/sdqri/rigelsdk">
      <img alt="GitHub Downloads" src="https://img.shields.io/npm/dw/rigelsdk?style=flat&color=336791" />
    </a>
    <a href="https://github.com/sdqri/rigelsdk">
      <img alt="GitHub Total Downloads" src="https://img.shields.io/npm/dt/rigelsdk?color=336791&label=Total%20downloads" />
    </a>
 <a href="https://github.com/sdqri/rigelsdk">
      <img alt="GitHub release" src="https://img.shields.io/github/release/sdqri/rigelsdk.svg?style=flat&color=336791" />
    </a>
    <br />
  <a href="https://github.com/sdqri/rigelsdk/issues/new/choose">Report Bug</a> /
  <a href="https://github.com/sdqri/rigelsdk/issues/new/choose">Request Feature</a>
  </p>

# Getting started

## Installation

> Install with yarn or npm: `yarn` or `npm`:

```bash
# yarn
yarn add rigelsdk
```

```bash
# npm
npm i rigelsdk --save
```

### Import the lib with es6 or cjs

```mjs
// es6
import rigelsdk from 'rigelsdk';
```

```cjs
// cjs
const rigelsdk = require('rigelsdk');
```

### Usage examples

```cjs
#!/usr/bin/env node
const KEY = 'secretkey';
const SALT = 'secretsalt';
const BASE_URL = '<put rigel url here>'; //~http://localhost:8080/rigel

const rigelSDK = new rigelsdk.SDK(BASE_URL, KEY, SALT);

const proxyURL = await rigelSDK.proxyImage(
  'https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg',
  new rigelsdk.Options({ Width: 100, Height: 100, Type: ImageType.WEBP }),
  Date.now() + 1000 * 60 * 60 * 24, // 1 day expiry
);

// Creating short url
const shortURL = await rigelSDK.tryShortURL(
  'https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg',
  new rigelsdk.Options({ Width: 100, Height: 100, Type: ImageType.WEBP }),
  Date.now() + 1000 * 60 * 60 * 24, // 1 day expiry
);

// BatchedCache
const batchedCachedImageArgs: models.ProxyParams[] = [
  new models.ProxyParams({
    img: 'https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg',
    options: new models.Options({
      Height: 100,
      Width: 100,
      Type: ImageType.WEBP,
    }),
  }),
  new models.ProxyParams({
    img: 'hhtps://img.freepik.com/premium-photo/baby-cat-british-shorthair_648604-47.jpg',
    options: new models.Options({
      Height: 100,
      Width: 100,
      Type: ImageType.WEBP,
    }),
  }),
];
const result: models.CacheImageResponse[] = await rigelSDK.batchedCacheImage(batchedCachedImageArgs, -1);
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This SDK is distributed under the
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0),
see LICENSE.txt for more information.
