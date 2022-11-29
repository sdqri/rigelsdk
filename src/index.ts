import * as models from './models';
import * as service from './sdk';
import * as consts from './consts';

export const rigelsdk = {
  ...models,
  ...service,
  ...consts,
};

export default rigelsdk;
