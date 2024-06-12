import {
  NextFunction,
  Request,
  Response
} from 'express';
import {StatusCodes} from 'http-status-codes';

import {AllowingAccess} from '../types/allowing-access.interface.js';
import {Middleware} from './middleware.interface.js';
import {HttpError} from '../errors/index.js';

export class AllowingAccessMiddleware implements Middleware {
  constructor(
    private readonly service: AllowingAccess,
    private readonly paramName: string,
  ) {}

  public async execute({ params, tokenPayload }: Request, _res: Response, next: NextFunction): Promise<void> {
    const documentId = params[this.paramName];
    console.log(params[this.paramName]);
    const documentOwnerId = await this.service.findById(documentId).then((data) => data?.userId.id);

    if(documentOwnerId === undefined) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Document with ${documentId} not found.`,
        'AllowingAccessMiddleware'
      );
    }


    if(String(documentOwnerId) !== tokenPayload.id as string) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `User ${tokenPayload.id} is not authorized to perform this operation`,
        'AllowingAccessMiddleware'
      );
    }

    return next();
  }
}
