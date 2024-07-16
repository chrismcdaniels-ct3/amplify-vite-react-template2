import { defineBackend } from '@aws-amplify/backend';
import { sayHello } from './functions/say-hello/resource';
import { auth } from './auth/resource';
import { data } from './data/resource';

defineBackend({
  auth,
  data,
  sayHello
});
