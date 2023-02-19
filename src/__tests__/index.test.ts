import { pbkdf2Sync } from 'crypto';
import rigelsdk from '../index';
import { ImageType } from '../consts/consts';

describe('RigelSDK', () => {
  const KEY = 'secretkey';
  const SALT = 'secretsalt';
  const rigelSDK = new rigelsdk.SDK('http://localhost:8080/rigel', KEY, SALT);

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
      new rigelsdk.Options({ Width: 100, Height: 100, Type: ImageType.WEBP }),
      -1,
    );
    expect(data).toBe(
      'http://localhost:8080/rigel/proxy?height=100&img=https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg&type=2&width=100&X-Signature=zkEmP1FDNoopC8GoM-caGzx1_1s',
    );
  });

  test('proxyImage with both options and expiry', async () => {
    const data = await rigelSDK.proxyImage(
      'https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg',
      new rigelsdk.Options({ Width: 100, Height: 100, Type: ImageType.WEBP }),
      1000 * 60 * 60 * 24,
    );
    expect(data).toBe(
      'http://localhost:8080/rigel/proxy?X-ExpiresAt=86400000&height=100&img=https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg&type=2&width=100&X-Signature=v6ROumbVPw18CkoBk9auEktWlzo',
    );
  });

  test('cacheImage', async () => {
    const data = await rigelSDK.cacheImage(
      'https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg',
      new rigelsdk.Options({ Width: 300, Height: 300, Type: ImageType.WEBP }),
      -1,
    );
    expect(data).toBe('fde5eda7214568293ad70621aec2ad1efee5c7fd');
  });

  test('tryShortURL', async () => {
    const shortURL = await rigelSDK.tryShortURL(
      'https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg',
      new rigelsdk.Options({ Width: 300, Height: 300, Type: ImageType.WEBP }),
      -1,
    );
    expect(shortURL).toBe(
      'http://localhost:8080/rigel/img/fde5eda7214568293ad70621aec2ad1efee5c7fd?X-Signature=ztW09e3EvM5IE7fJNsg0Z5-lPXg',
    );
  });
});
