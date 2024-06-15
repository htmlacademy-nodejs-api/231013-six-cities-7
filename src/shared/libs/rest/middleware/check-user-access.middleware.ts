import {
  NextFunction,
  Request,
  Response
} from 'express';
import {StatusCodes} from 'http-status-codes';

import {ServiceInterface} from '../service/service.interface.js';
import {Middleware} from './middleware.interface.js';
import {HttpError} from '../errors/index.js';

type RequiredType = {
  userId: {
    id: Uint8Array;
  }
};

export class CheckUserAccessMiddleware implements Middleware {
  constructor(
    private readonly service: ServiceInterface<RequiredType>,
    private readonly paramName: string,
  ) {}

  public async execute({ params, tokenPayload }: Request, _res: Response, next: NextFunction): Promise<void> {
    const documentId = params[this.paramName];

    const document = await this.service.findById(documentId);

    if(document === undefined) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Document with ${documentId} not found.`,
        'CheckUserAccessMiddleware'
      );
    }

    const documentOwnerId = document?.userId.id;

    if(String(documentOwnerId) !== tokenPayload.id as string) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `User ${tokenPayload.id} is not authorized to perform this operation`,
        'CheckUserAccessMiddleware'
      );
    }

    return next();
  }
}
