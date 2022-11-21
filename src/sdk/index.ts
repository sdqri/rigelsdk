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

  public async createImageURL(imageURL: string, Options: models.Options): Promise<string> {
    const key = await this.key;
    const res = {
      url: imageURL,
      options: Options,
    };
    const resJson = JSON.stringify(res);
    const jwt = await new jose.SignJWT({ res: resJson })
      .setProtectedHeader({ alg: this.alg })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(key);
    const rigelURL: string = `${this.url}/rigel?req=${jwt}`;
    return rigelURL;
  }
}
