import { pbkdf2Sync } from 'crypto';
import rigelsdk from '../index';

describe('RigelSDK', () => {
  const algorithm = 'RS256';
  const pkcs8 = `-----BEGIN PRIVATE KEY-----
  MIIJQwIBADANBgkqhkiG9w0BAQEFAASCCS0wggkpAgEAAoICAQCgsfrP4nQbGz1h
  XWXpcZbnokAb8YURzvWW5w+OxHxy6Z//yrKvBCw3k/NSipuyPn/n2bDiAXNlCswR
  Gq8a1fkRagSk/yguQNpjYAXE0OO8iRS/hWAsj0lR+j2Y0FA1Js6dHEs5e5yZNMD+
  iMD0deh0/CflebOsC15jKxIWSR/KVl6zq6ngLisAcqSPTzT8cI1ZQoaIcRkOz0hX
  Z7Rp+Nhs7MUNAeLnH+uP2gAYO+LXHduRqJ7mrGEF7ERgadAkBQkYTtz9cJ0eeq0n
  yvXl2N6srL1vh0fYXthBYvFANAQbUWI/w/sNmXwG5N3LHJOR5dpNZn94HKuPZ5qJ
  CkqFAnWa+fPS3+xYd9vZcKPdYd4X4TQAbmgxr1tTymOdgX+dyRqaG0GC9qoUQX2A
  ZkveymAO4ytR1q2b7lfFE9Qo7RVZ3VqsLQ1hVlkwh9X+yhV5p/i9KWVMRFGWQ9n7
  quPlXhZnLvj0mC88JEJwV1/iFEtf2MLfMqIdt4zDqLAYDPgNB2WQRMmytp7Z+GXV
  ueewY17RBe1z2xFmEu7BrwebbotU8Wcauy/cqJMIOPwipTjdtdat4aAkYg2thIxd
  mB+YZk1XKkk+eq/blHll1uEF0FAdKqbWJ1no/ixZACNd1I+qu1uavlesLczFsV4M
  GJWQFULoGUPgVpME5llNkgS2+Z+EvQIDAQABAoICAASzL+xeNmchWzo6l31GBTpH
  h8VJdLFNcrSaYKocTq3nVCndejxqmToTtoCQU6o/vOrBdme/aYPOPQm2OuJ3pg4M
  VVzXpnIArS9OFhBOy8DH6ANyAAFNosDzDYb0Q/3jlK3W4s+OysjwWHSy+Athjdr3
  q3MN8paL/pOH8ikUtAlTw8SD6mptvA3XTIwK4dHZ7BU52a8QuVrliFTsg5C8TOT8
  R9Pv9vyR9aHPdN4NYlhIV0bhvhDUTQ71sH17ATHZTXRlWhe18Ejj7aYsTLGpFib9
  JmbZd6oSz0bNgTp15JwOVU4bVuYFU/6GBlBA4oM+spPXW5yq7TM68U1XL7bHZTxU
  FJPNr3FV6a0K/N2qBRqMSZXWvnjh2a/cSnAtpFJn6tulUxcBVft6wwR31NAyEe/4
  D5NQ5vndz95n3x4oTcHsQT/SofQ6Y2TlzOwhI576EWaKtJjMTtdHD9t/Rxthfgnu
  XwWPrqR439gCsQLl18JjBEV4WwRY068yGU2eeMCR3hCIArgGYvhZwch/PNms8rCX
  pZgtASqz9lVflopWYla+vhzk1lAIrLgc+ueYLyGvPT8f/pqBFLj04OmQuFOstD36
  xDnPCBZlXhHUzX1W+KVS4MbAfgbsIkPb217Xtr0ylvmLaZ/J/N8ouPc2Boalk+tB
  2B4ZGJp3iEyoYYIuLoIBAoIBAQDE9SeSp/QRrwCp8JBigKEq6CkZnxtG7Icn8lDD
  Vx6wiSE6S7jphn9h/7aTrue+O64ttRapLgc8fvNZFykZgnq8cy0IeVmhSLcJEmy5
  O/Rs2tBF1sJcbM0NYTyrdJzeesl0J745oPQS+LjKYC+OeFJLQ6+HGD4QyczMjB53
  YoINUuNPOLbSde8/mtyd7/lqMoslh5RxO6Im3vmpGLda3amQmVnSGe6hh62QNBlF
  58OEd66XYi8h/8WN54hQ4CNsy6G76CSJfsRrYzhn7pJvSKR3aJ6mNkbOwRdr5SnV
  OyFzIorJ6ND1AuAs3fvEd7yKqs3/kuAN/g/R8iBNTMoIVNmZAoIBAQDQ3f172GVk
  tFvJOTJvZWa2mVcS0hzGilm52ugVmOQIRBFtvJVR7AUsnsylx+m77/cX0eFdRbqE
  9D/QcB7jgUPvVQCMMavhxqImexX1GndvolTVrNeRZc2Njw4tq9Rikfhi3RTHjpTY
  uZJ1JI9qwiQL922pw5UzlCnM5uW9wvkavHO73Q161pn0+2SsIotarGNEbt8Q+X2T
  B0ThuWzSTlHpV/PNTh7iS8h7gOh6oCGtBr+NN21ixnmzFQOlBL8YE0zbEP9v3rx3
  +5LEFhB8b9HD82vnEmchzEWtIkbRSFdQo/732zJaJI+41mc4o5zuC2H8Lc2w0nOQ
  1Aa2pWt88+LFAoIBAEjUhn+aj4wCdHJivGFQQ0iEdL4+sW12hTvmRKsXCggpjRnr
  akMgMvZgAnl10cfsdan9LpX8qTxbjUzCXbZLI2uQA3UAun4DT3uRTpbobqfZ+e35
  TgGzUdfCvxZ/lopGSTwkfhj9RYPGaT6cdrluELA4JS4Fbt3yYUK6BYIL8R9QKTHg
  POpyJbgVYcMdO9NjQUTtb5y3emx5Q0SeGR8GnG8V5brlT/J3I10Rhs7stsXDI9Ji
  wh8GX1zr4uJVH4RZgELlwqz9LVCwbekwtQFlkTt+ejvoEiLeD/Ub1m484U+b1Ep5
  Rtty5sZwh2rNA/Ea2/XHsAY8jkkKCZvL62FNTvECggEBAJ0+cwaYvITbT7qnJ/Q7
  d9+Cg840httl7vT/+/e+efZLIH/oGNZrBN4500H/xlTp7LFvHeZ1h11u8NgAgRCw
  EbAN43KoNomsXAjyY256dW6C3LFdBZF9/glTqM3zbdqjoEb1wB4YlrCuzLcKRjqO
  XEryBQpop1wEcI/FSTLapWVeeRb27Z4MEC4iUQFSpG0oGTe87Iy/960ILPBvA6E0
  u3Ab+f0XkiK2AQIR43PmOFQmH3G2R9C0MY0EBhFnCGKcrSDDpDrZijQeHrknD1RP
  brHCAfsdnK0SN2aHxp7qgmnAfUSmLjs1CUqTh3RZoNyJj0QmS5OSbNSc+0zoLosM
  pS0CggEBAL2bsgNz7z4qwGFhM9xQfmVH6wh8DVYIzF6L/kzeE3XzwEcjObMChKDp
  YY8EHsXAi127XpIsHlWKhswjlbnsFZQ8LjLmb1IWt2bvRT7EdlQxgFui4bH0w4Mp
  dOskGuFlxYz5TyUQBDjGgpyjykuz8IsXu884xTTt6JAct5IsiOWGu97vmXD8L+ie
  cz4u+Ez4nvaeTW9FEinjppZxu7mtKXZ99gTSeO2Z1WgJxetY2K7H71/CfJIPSRZ5
  H21/UeCaMot7PENYkWQvsTEGA1JbgqOesKgbVOVC++ZlAOnEQoeK9Sww5pUU5bgs
  PjJTeVctyjChz/jmnZhMmYP+FvmgEvw=
  -----END PRIVATE KEY-----`;
  const rigelSDK = new rigelsdk.SDK('http://localhost:8080/rigel', algorithm, pkcs8);

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
    return rigelSDK.createImageURL(url, options, "12h").then((data) => expect(data).toBeTruthy());
  });
});
