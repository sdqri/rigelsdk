import * as models from './models';
import * as service from './sdk';

export const rigelsdk = {
  ...models,
  ...service,
};

export default rigelsdk;
