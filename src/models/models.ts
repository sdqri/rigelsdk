import * as consts from '../consts/consts';

export class ProxyParams {
  img: string = "";
  options: Options = new Options();

  constructor(source?: Partial<ProxyParams>) {
    Object.assign(this, source);
  }
}

export interface CacheImageResponse {
  img: string;
  signature: string;
}


export class Options {
  Height?: number;
  Width?: number;
  AreaHeight?: number;
  AreaWidth?: number;
  Top?: number;
  Left?: number;
  Quality?: number;
  Compression?: number;
  Zoom?: number;
  Crop?: boolean;
  Enlarge?: boolean;
  Embed?: boolean;
  Flip?: boolean;
  Flop?: boolean;
  Force?: boolean;
  NoAutoRotate?: boolean;
  NoProfile?: boolean;
  Interlace?: boolean;
  StripMetadata?: boolean;
  Trim?: boolean;
  Lossless?: boolean;
  Extend?: string;
  Rotate?: string;
  Background?: string;
  Gravity?: consts.Gravity;
  Watermark?: string;
  WatermarkImage?: string;
  Type?: consts.ImageType;
  Interpolator?: string;
  Interpretation?: string;
  GaussianBlur?: string;
  Sharpen?: string;
  Threshold?: number; // flaot
  Gamma?: number; // flaot
  Brightness?: number; // flaot
  Contrast?: number; // flaot
  OutputICC?: string;
  InputICC?: string;
  Palette?: boolean;

  constructor(source?: Partial<Options>) {
    Object.assign(this, source);
  }

  QueryString() {
    const queryParams = [];
    for (const p in this)
      if (this.hasOwnProperty(p)) {
        queryParams.push(encodeURIComponent(p).toLowerCase() + '=' + encodeURIComponent(String(this[p])));
      }
    return queryParams.join('&');
  }
}
