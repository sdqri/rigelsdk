import { pbkdf2Sync } from 'crypto';
import rigelsdk from '../index';

describe('RigelSDK', () => {
  const algorithm = 'RS256';
  const pkcs8 = `-----BEGIN PRIVATE KEY-----
  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
  Hzf3lxHghTe7zMA0yxAI+u4d5hpd6w4=
  -----END PRIVATE KEY-----`;
  const rigelSDK = new rigelsdk.SDK('url', algorithm, pkcs8);

  test('defines createImageURL()', () => {
    expect.assertions(1);
    const options = new rigelsdk.Options({
      Height: 120,
      Width: 120,
      Crop: true,
      Gravity: rigelsdk.Gravity.GravitySmart,
      Type: rigelsdk.ImageType.WEBP,
    }); //5 for gravity smart
    const url: string =
      'https://imgv3.fotor.com/images/homepage-feature-card/enhance-photo-of-three-girls-playing-in-the-sunflower-garden.png';
    const Actual =
      'url/rigel?req=eyJhbGciOiJSUzI1NiJ9.eyJyZXMiOiJ7XCJ1cmxcIjpcImh0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvdGh1bWIvYi9iYy9Ud28tYnVybmluZy1tYW4tZm91bmRlcnMucG5nLzMyMXB4LVR3by1idXJuaW5nLW1hbi1mb3VuZGVycy5wbmdcIixcIm9wdGlvbnNcIjp7XCJXaWR0aFwiOjEyMCxcIkhlaWdodFwiOjEwfX0iLCJpYXQiOjE2Njk0OTgyNzUsImV4cCI6MTY2OTUwNTQ3NX0.SeNR2ItHDDl4VCv9K2ouQWicAJVjQ2aQ-hRN55H0A73otQWZ_4AbA8EmQXdmRRxSlfhtD_2XCGBVNVTsenj2i4rnU93b6EeoFcOBZvnBjtHiOE9IzCL3OTR8a3BR5AIzt9oDmFFbx_XdM9XnRV_LKbby1gB3oRvkn17x__RUd6NtAkKwluk75QLg0EYegOFuyP0zH-wPys8Uyu1Ts7H6KxnRt0B33-0vhcwUMfp-e7T80a48H-2ZaqXz2X8IOrS0N_1jVSSwydEh3buZbhGym5gn7jN82Kn7BqS3MOGzLvOMXH_oEyTiEE1i4Cik-mXXg50Ixlb0ge1NJ_V4AwLuulxSLdzN32Ts-f-6nrbd_OcRdiTJGi55jMewBpKb7tLCIFjwBEuXzRpJz7G8Q7tjGRXuN-AepgcALfQvd8dwCjPqOWA_Q2sf_y15r6Ig5_9vugYmzDOm4kYWd2PHWvPXOw5FHSrVQn2C5NE6X8JCakgmQRKTHDwLDkmEHZm4gtBCtrrbrsknzkS40b3cHvSC6q5Epa00z1hgwqi_bQotXmOvuZ-B-WWUzZchPAR8sgYUGBtEE0YL7CK-g9g8yPozjQiaSZ8RGvGNuuqubwKcBS9_BFSrrxML6JlZplj57_ss3h6w0zZdTnv4H9bjLBIZmPhHbcIiTUK8q3-_-heiHxU';
    return rigelSDK.createImageURL(url, options).then((data) => expect(data).toBe(false));
  });
});
