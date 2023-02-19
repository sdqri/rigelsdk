import * as models from './models/models';
import * as service from './sdk/sdk';
import * as consts from './consts/consts';

export const rigelsdk = {
  ...models,
  ...service,
  ...consts,
};

export default rigelsdk;
