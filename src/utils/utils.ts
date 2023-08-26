import crypto from 'crypto';

export function SerializeToQuryString(obj: any) {
  const str = [];
  for (const p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(p + '=' + String(obj[p]));
    }
  return str.join('&');
}

export function Sign(key: string, salt: string, input: string): string {
  const h = crypto.createHmac('sha1', key);
  h.update(input + salt);
  return h.digest('base64url');
}

export function SignQueryString(
  key: string,
  salt: string,
  requestPath: string,
  queryString: string,
  expiry: number,
): string {
  const signableSlice: string[] = Array();
  signableSlice.push(`request_path=${requestPath}`);
  if (queryString !== '') {
    let querySlice = queryString.split('&');
    if (expiry !== 0 && expiry !== -1 && expiry != null) {
      querySlice.push(`X-ExpiresAt=${expiry}`);
    }
    querySlice = querySlice.sort();
    signableSlice.push(...querySlice);
  }

  const signableString = signableSlice.join('&');
  const signature = Sign(key, salt, signableString);
  signableSlice.push(`X-Signature=${signature}`);
  
  // Removing request_path
  signableSlice.shift();

  return signableSlice.join('&');
}
