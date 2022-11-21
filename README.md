<p align="center">
 <h2 align="center">rigelsdk</h2>
 <p align="center">Typescript SDK for <a href="[rigel](https://github.com/sdqri/rigel)">rigel</a></p>
  <p align="center">
    <br />
  <a href="https://github.com/hebertcisco/emoji-library/issues/new/choose">Report Bug</a> /
  <a href="https://github.com/hebertcisco/emoji-library/issues/new/choose">Request Feature</a>
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
const algorithm = 'ES256'
const pkcs8 = `-----BEGIN PRIVATE KEY-----
PRIVATEKEYPRIVATEKEYPRIVATEKEYPRIVATEKEYPRIVATEKEYPRIVATEKEY
PRIVATEKEYPRIVATEKEYPRIVATEKEYPRIVATEKEYPRIVATEKEYPRIVATEKEY
PRIVATEKEYPRIVATEKEYPRIVATEKEYPRIVATEKEYPRIVATEKEYPRIVATEKEY
-----END PRIVATE KEY-----`
const url = "<put rigel url here>"
const imageURL = "<put image url here>"

const rigelSDK = new rigelsdk.SDK(url, algorithm, pkcs8);
const imageURL = await rigelSDK.createImageURL(imageURL, options)
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This SDK is distributed under the
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0),
see LICENSE.txt for more information.