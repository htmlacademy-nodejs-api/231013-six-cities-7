import {inject, injectable} from 'inversify';
import {Request, Response} from 'express';

import {BaseController, HttpMethod} from '../../libs/rest/index.js';
import {Logger} from '../../libs/logger/index.js';
import {Component} from '../../enum/index.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
  ) {
    super(logger);

    this.logger.info('Register routes for CommnetController...');

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.index
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.create
    });
  }

  public index(_eq: Request, _res: Response): void {
    //Код обработчика
  }

  public create(_req: Request, _res: Response): void {
    //Код обработчика
  }
}
