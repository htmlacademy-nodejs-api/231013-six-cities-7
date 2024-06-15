import {inject, injectable} from 'inversify';
import {StatusCodes} from 'http-status-codes';
import {
  NextFunction,
  Request,
  Response,
} from 'express';

import {Component} from '../../../enum/index.js';
import {Logger} from '../../logger/index.js';
import {HttpError} from '../errors/index.js';
import {createErrorObject} from '../../../helpers/common.js';
import {ApplicationError} from '../types/application-error.enum.js';
import {ExceptionFilter} from './exception-filter.interface.js';

@injectable()
export class HttpErrorExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger:Logger
  ) {
    this.logger.info('Register HttpErrorExceptionFilter');
  }

  public catch(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if(!(error instanceof HttpError)) {
      return next(error);
    }

    this.logger.error(`[HttpErrorException]: ${req.path} # ${error.message}`, error);

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createErrorObject(ApplicationError.CommonError, error.message));
  }
}
