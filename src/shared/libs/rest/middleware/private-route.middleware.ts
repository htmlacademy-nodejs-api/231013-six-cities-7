import {StatusCodes} from 'http-status-codes';
import {
  NextFunction,
  Request,
  Response
} from 'express';

import {Middleware} from './middleware.interface.js';
import { BaseUserException } from '../../../modules/auth/errors/base-user.exception.js';

export class PrivateRouteMiddleware implements Middleware {
  public async execute({tokenPayload}: Request, _res: Response, next: NextFunction): Promise<void> {
    if(!tokenPayload) {
      throw new BaseUserException(
        StatusCodes.UNAUTHORIZED,
        'PrivateRouteMiddleware'
      );
    }

    return next();
  }
}

