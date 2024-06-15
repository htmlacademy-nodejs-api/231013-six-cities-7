import {Container} from 'inversify';

import {RestApplication} from './rest.application.js';
import {Component} from '../shared/enum/index.js';
import {Logger, PinoLogger} from '../shared/libs/logger/index.js';
import {Config, RestConfig, RestSchema} from '../shared/libs/config/index.js';
import {DatabaseClient, MongoDatabaseClient} from '../shared/libs/database-client/index.js';
import {
  AppExceptionFilter,
  ExceptionFilter,
  ValidateExceptionFilter
} from '../shared/libs/rest/index.js';
import {HttpErrorExceptionFilter} from '../shared/libs/rest/exception-filter/http-error.exception-filter.js';
import {PathTransformer} from '../shared/libs/rest/transform/path-transformer.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer
    .bind<RestApplication>(Component.RestApplication)
    .to(RestApplication)
    .inSingletonScope();
  restApplicationContainer
    .bind<Logger>(Component.Logger)
    .to(PinoLogger)
    .inSingletonScope();
  restApplicationContainer
    .bind<Config<RestSchema>>(Component.Config)
    .to(RestConfig)
    .inSingletonScope();
  restApplicationContainer
    .bind<DatabaseClient>(Component.DatabaseClient)
    .to(MongoDatabaseClient)
    .inSingletonScope();
  restApplicationContainer
    .bind<ExceptionFilter>(Component.ExceptionFilter)
    .to(AppExceptionFilter)
    .inSingletonScope();
  restApplicationContainer
    .bind<ExceptionFilter>(Component.HttpExceptionFilter)
    .to(HttpErrorExceptionFilter)
    .inRequestScope();
  restApplicationContainer
    .bind<ExceptionFilter>(Component.ValidateExceptionFilter)
    .to(ValidateExceptionFilter)
    .inSingletonScope();
  restApplicationContainer
    .bind<PathTransformer>(Component.PathTransformer)
    .to(PathTransformer)
    .inRequestScope();

  return restApplicationContainer;
}
