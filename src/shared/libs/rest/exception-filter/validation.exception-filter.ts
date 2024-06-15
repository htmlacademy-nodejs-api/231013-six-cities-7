import {inject, injectable} from 'inversify';
import {
  Request,
  Response,
  NextFunction
} from 'express';
import {StatusCodes} from 'http-status-codes';

import {Component} from '../../../enum/index.js';
import {createErrorObject} from '../../../helpers/index.js';
import {Logger} from '../../logger/index.js';
import {ValidationError} from '../errors/index.js';
import {ApplicationError} from '../types/application-error.enum.js';
import {ExceptionFilter} from './exception-filter.interface.js';

@injectable()
export class ValidateExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register ValidationExceptionFilter');
  }

  public catch(
    error: unknown,
    _req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if(! (error instanceof ValidationError)) {
      return next(error);
    }

    this.logger.error(`[ValidationException]: ${error.message}`, error);

    error.details.forEach(
      (errorField) => this.logger.warn(`[${errorField.property}] — ${errorField.messages}`)
    );

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createErrorObject(ApplicationError.ValidationError, error.message, error.details));
  }
}
