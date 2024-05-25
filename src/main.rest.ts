import 'reflect-metadata';
import {Container} from 'inversify';

import {RestApplication} from './rest/index.js';
import {Component} from './shared/enum/index.js';
import {createRestApplicationContainer} from './rest/rest.container.js';
import {createUserContainer} from './shared/modules/user/index.js';
import {createOfferContainer} from './shared/modules/offer/index.js';
import {createCommentContainer} from './shared/modules/comment/index.js';

async function bootstrap() {
  const appConteiner = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer(),
  );

  const application = appConteiner.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
