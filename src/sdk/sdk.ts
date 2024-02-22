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
    const queryString: string =
      options?.QueryString() !== '' && options != null
        ? utils.SerializeToQuryString({ img: imageURL }) + '&' + options.QueryString()
        : utils.SerializeToQuryString({ img: imageURL });

    const signedQueryString = utils.SignQueryString(this.key, this.salt, 'proxy', queryString, expiry);
    const pathURL: string = `${this.baseURL}/proxy?${signedQueryString}`;
    return pathURL;
  }

  public async cacheImage(imageURL: string, options: models.Options | null, expiry: number): Promise<string | number> {
    const queryString: string =
      options?.QueryString() !== '' && options != null
        ? utils.SerializeToQuryString({ img: imageURL }) + '&' + options.QueryString()
        : utils.SerializeToQuryString({ img: imageURL });

    const signedQueryString = utils.SignQueryString(this.key, this.salt, 'headsup', queryString, expiry);
    const pathURL: string = `${this.baseURL}/headsup?${signedQueryString}`;

    try {
      const response = await axios.post(pathURL);
      const imageResponse: models.CacheImageResponse = response.data as models.CacheImageResponse;
      if (response.status !== 200) return response.status;

      const sqs = utils.SignQueryString(this.key, this.salt, `img/${imageResponse.signature}`, '', expiry);
      const URL: string = `${this.baseURL}/img/${imageResponse.signature}?${sqs}`;
      return URL;
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

      if (response.status !== 200) throw new Error(`Failed when caching image with status code = ${response.status}`);

      // TODO: Fix this to check for whether data satisfies interface or not
      const result: models.CacheImageResponse[] = response.data as models.CacheImageResponse[];
      for (const cacheImageResponse of result) {
        const sqs = utils.SignQueryString(this.key, this.salt, `img/${cacheImageResponse.signature}`, '', expiry);
        cacheImageResponse.short_url = `${this.baseURL}/img/${cacheImageResponse.signature}?${sqs}`;
      }
      return result;
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
