import crypto from 'crypto';

import axios from 'axios';
import * as jose from 'jose';
import * as models from '../models/models';
import * as utils from '../utils/utils';
import path from 'path';

export class SDK {
  baseURL: string;
  key: string;
  salt: string;

  constructor(baseURL: string, key: string, salt: string) {
    this.baseURL = baseURL;
    this.key = key;
    this.salt = salt;
  }

  public async proxyImage(imageURL: string, options: models.Options | null, expiry: number): Promise<string> {
    let queryString: string = '';
    if (options?.QueryString() !== '' && options != null) {
      queryString = utils.SerializeToQuryString({ img: imageURL }) + '&' + options.QueryString();
    } else {
      queryString = utils.SerializeToQuryString({ img: imageURL });
    }
    const signedQueryString = utils.SignQueryString(this.key, this.salt, 'proxy', queryString, expiry);
    const pathURL: string = `${this.baseURL}/proxy?${signedQueryString}`;
    return pathURL;
  }

  public async cacheImage(imageURL: string, options: models.Options | null, expiry: number): Promise<string | number> {
    let queryString: string = '';
    if (options?.QueryString() !== '' && options != null) {
      queryString = utils.SerializeToQuryString({ img: imageURL }) + '&' + options.QueryString();
    } else {
      queryString = utils.SerializeToQuryString({ img: imageURL });
    }
    const signedQueryString = utils.SignQueryString(this.key, this.salt, 'headsup', queryString, expiry);
    const pathURL: string = `${this.baseURL}/headsup?${signedQueryString}`;
    try {
      const response = await axios.post(pathURL);
      if (response.status === 200) {
        return response.data.signature;
      } else {
        return response.status;
      }
    } catch (error) {
      // console.log(`error while trying to cacheImage with imageURL=${imageURL}`);
      return 503;
    }
  }

  public async tryShortURL(imageURL: string, options: models.Options | null, expiry: number): Promise<string> {
    const signature = await this.cacheImage(imageURL, options, expiry);
    if (typeof signature === 'string') {
      const signedQueryString = utils.SignQueryString(this.key, this.salt, `img/${signature}`, '', expiry);
      const pathURL: string = `${this.baseURL}/img/${signature}?${signedQueryString}`;
      return pathURL;
    }

    return await this.proxyImage(imageURL, options, expiry);
  }
}
