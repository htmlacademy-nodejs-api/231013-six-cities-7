import {Container} from 'inversify';

import {Component} from '../../enum/index.js';
import {ExceptionFilter} from '../../libs/rest/index.js';
import {AuthService} from './auth-service.interface.js';
import {DefaultAuthService} from './default-auth.service.js';
import {AuthExceptionFilter} from './auth.exception-filter.js';

export function createAuthContainer() {
  const authContainer = new Container();
  authContainer
    .bind<AuthService>(Component.AuthService)
    .to(DefaultAuthService)
    .inSingletonScope();
  authContainer
    .bind<ExceptionFilter>(Component.AuthExceptionFilter)
    .to(AuthExceptionFilter)
    .inSingletonScope();

  return authContainer;
}
