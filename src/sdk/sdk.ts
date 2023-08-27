import axios from 'axios';
import * as models from '../models/models';
import * as utils from '../utils/utils';

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
      const imageResponse: models.CacheImageResponse = response.data as models.CacheImageResponse;
      if (response.status === 200) {
        const sqs = utils.SignQueryString(this.key, this.salt, `img/${imageResponse.signature}`, '', expiry);
        const URL: string = `${this.baseURL}/img/${imageResponse.signature}?${sqs}`;
        return URL;
      } else {
        return response.status;
      }
    } catch (error) {
      return 503;
    }
  }

  async batchedCacheImage(
    proxyParamsSlice: models.ProxyParams[],
    expiry: number,
  ): Promise<models.CacheImageResponse[]> {
    const signedQueryString = utils.SignQueryString(this.key, this.salt, 'batched-headsup', '', expiry);
    const pathURL = `${this.baseURL}/batched-headsup?${signedQueryString}`;

    try {
      const response = await axios.post(pathURL, proxyParamsSlice, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // TODO: Fix this to check for whether data satisfies interface or not
        const result: models.CacheImageResponse[] = response.data as models.CacheImageResponse[];
        for (const cacheImageResponse of result){
          const sqs = utils.SignQueryString(this.key, this.salt, `img/${cacheImageResponse.signature}`, '', expiry);
          cacheImageResponse.short_url = `${this.baseURL}/img/${cacheImageResponse.signature}?${sqs}`;
        }
        return result;
      } else {
        throw new Error(`Failed when caching image with status code = ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  }

  public async tryShortURL(imageURL: string, options: models.Options | null, expiry: number): Promise<string> {
    const URL = await this.cacheImage(imageURL, options, expiry);
    if (typeof URL === 'string') {
      return URL;
    }

    return await this.proxyImage(imageURL, options, expiry);
  }
}
