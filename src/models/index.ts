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
  Gravity?: string;
  Watermark?: string;
  WatermarkImage?: string;
  Type?: string;
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
}
