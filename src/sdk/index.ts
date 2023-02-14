const crypto = require("crypto");

import axios from 'axios';
import * as jose from 'jose';
import * as models from '../models';

export class SDK {
  url: string;
  alg: string;
  key: Promise<jose.KeyLike>;

  constructor(url: string, alg: string, pkcs8Key: string) {
    this.url = url;
    this.alg = alg;
    this.key = jose.importPKCS8(pkcs8Key, alg);
  }

  public async createImageURL(imageURL: string, Options: models.Options, exp: string|number): Promise<string> {
    const key = await this.key;
    const res = {
      url: imageURL,
      options: Options,
    };
    const resJson = JSON.stringify(res);
    const jwt = await new jose.SignJWT({ res: resJson })
      .setProtectedHeader({ alg: this.alg })
      .setIssuedAt()
      .sign(key);
    
    const rigelURL: string = `${this.url}/img/${jwt}`;
    return rigelURL;
  }

  public async createImageHeadsupURL(imageURL: string, Options: models.Options, exp: string|number): Promise<string> {
    const key = await this.key;
    const res = {
      url: imageURL,
      options: Options,
    };
    const resJson = JSON.stringify(res);
    const jwt = await new jose.SignJWT({ res: resJson })
      .setProtectedHeader({ alg: this.alg })
      .setIssuedAt()
      .sign(key);
    
    const rigelURL: string = `${this.url}/headsup/${jwt}`;
    return rigelURL;
  }

  public async CacheShortURL(imageURL: string, Options: models.Options, exp: string|number): Promise<string> {
    const rigelURL = await this.createImageHeadsupURL(imageURL, Options,exp)
    await axios.head(rigelURL);
    const sha1 = crypto.createHash("sha1")
    var token = rigelURL.split('/headsup/')[1]
    sha1.update(token)
    var shasum = sha1.digest("hex")
    return shasum
  }

}
