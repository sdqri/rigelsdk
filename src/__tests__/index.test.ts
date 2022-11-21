import rigelsdk from '../index';

describe('RigelSDK', () => {
  const algorithm = 'ES256';
  const pkcs8 = `-----BEGIN PRIVATE KEY-----
    MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgiyvo0X+VQ0yIrOaN
    nlrnUclopnvuuMfoc8HHly3505OhRANCAAQWUcdZ8uTSAsFuwtNy4KtsKqgeqYxg
    l6kwL5D4N3pEGYGIDjV69Sw0zAt43480WqJv7HCL0mQnyqFmSrxj8jMa
    -----END PRIVATE KEY-----`;
  const rigelSDK = new rigelsdk.SDK('url', algorithm, pkcs8);

  test('defines createImageURL()', () => {
    expect.assertions(1);
    const options = new rigelsdk.Options({ Width: 120, Height: 10 });
    const url: string =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Two-burning-man-founders.png/321px-Two-burning-man-founders.png';
    const Actual =
      'eyJhbGciOiJFUzI1NiJ9.eyJyZXMiOiJ7XCJ1cmxcIjpcImh0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvdGh1bWIvYi9iYy9Ud28tYnVybmluZy1tYW4tZm91bmRlcnMucG5nLzMyMXB4LVR3by1idXJuaW5nLW1hbi1mb3VuZGVycy5wbmdcIixcIm9wdGlvbnNcIjp7XCJXaWR0aFwiOjEyMCxcIkhlaWdodFwiOjEwfX0iLCJpYXQiOjE2NjkwNDA1OTcsImV4cCI6MTY2OTA0Nzc5N30.PGvVJEyVs9pQt26cq4Nc67usfDaj9cFQb1q_-DKlxoW2KXIgCNojut4FAZQYRJDi4EyizbK7xSoRqxTY0OH2mw';
    return rigelSDK.createImageURL(url, options).then((data) => expect(data).toBe(Actual));
  });
});
