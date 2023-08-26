// import rigelsdk from '../index';
import { service, models } from '../index';
import { ImageType } from '../consts/consts';


describe('RigelSDK', () => {
  const KEY = 'secretkey';
  const SALT = 'secretsalt';
  const rigelSDK = new service.SDK('http://localhost:8080/rigel', KEY, SALT);

  test('proxyImage without options and expiry', async () => {
    const data = await rigelSDK.proxyImage(
      'https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg',
      null,
      -1,
    );
    expect(data).toBe(
      'http://localhost:8080/rigel/proxy?img=https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg&X-Signature=vX59TgdwdNqZD_jXGOky_zVgttc',
    );
  });

  test('proxyImage with options, without expiry', async () => {
    const data = await rigelSDK.proxyImage(
      'https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg',
      new models.Options({ Width: 100, Height: 100, Type: ImageType.WEBP }),
      -1,
    );
    expect(data).toBe(
      'http://localhost:8080/rigel/proxy?height=100&img=https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg&type=2&width=100&X-Signature=zkEmP1FDNoopC8GoM-caGzx1_1s',
    );
  });

  test('proxyImage with both options and expiry', async () => {
    const data = await rigelSDK.proxyImage(
      'https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg',
      new models.Options({ Width: 100, Height: 100, Type: ImageType.WEBP }),
      1000 * 60 * 60 * 24,
    );
    expect(data).toBe(
      'http://localhost:8080/rigel/proxy?X-ExpiresAt=86400000&height=100&img=https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg&type=2&width=100&X-Signature=v6ROumbVPw18CkoBk9auEktWlzo',
    );
  });

  test('cacheImage', async () => {
    const data = await rigelSDK.cacheImage(
      'https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg',
      new models.Options({ Width: 300, Height: 300, Type: ImageType.WEBP }),
      -1,
    );
    expect(data).toBe('http://localhost:8080/rigel/img/fde5eda7214568293ad70621aec2ad1efee5c7fd?X-Signature=ztW09e3EvM5IE7fJNsg0Z5-lPXg');
  });

  test('batchedCacheImage', async () => {
    const batchedCachedImageArgs: models.ProxyParams[] = [
      new models.ProxyParams({
        img: 'https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg',
        options: new models.Options({
          Height: 100,
          Width: 100,
          Type: ImageType.WEBP,
        }),
      }),
      new models.ProxyParams({
        img: 'hhtps://img.freepik.com/premium-photo/baby-cat-british-shorthair_648604-47.jpg',
        options: new models.Options({
          Height: 100,
          Width: 100,
          Type: ImageType.WEBP,
        }),
      }),
    ];

    try {
      const result: models.CacheImageResponse[] = await rigelSDK.batchedCacheImage(batchedCachedImageArgs, -1);
      expect(result).toMatchObject([
        {
          "img": "https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg",
          "signature": "124799fa1f5d2069e1b56793e01f8fe260b87791",
        },
        {
          "img": "hhtps://img.freepik.com/premium-photo/baby-cat-british-shorthair_648604-47.jpg",
          "signature": "86a9857ba38d4e808dd265f587927858d8917f39",
        }
      ])
    } catch (error) {
      // TODO: How they fail test in jest?
      throw new Error(`Error occurred: ${error}`);
    }
  });

  test('tryShortURL', async () => {
    const shortURL = await rigelSDK.tryShortURL(
      'https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg',
      new models.Options({ Width: 300, Height: 300, Type: ImageType.WEBP }),
      -1,
    );

    expect(shortURL).toBe(
      'http://localhost:8080/rigel/img/fde5eda7214568293ad70621aec2ad1efee5c7fd?X-Signature=ztW09e3EvM5IE7fJNsg0Z5-lPXg',
    );
  });
});
