import {inject, injectable} from 'inversify';
import {Request, Response} from 'express';

import {
  BaseController,
  HttpMethod,
  ValidateDtoMiddleware,
  PrivateRouteMiddleware,
  DocumentExistsMiddleware,
} from '../../libs/rest/index.js';
import {Logger} from '../../libs/logger/index.js';
import {Component} from '../../enum/index.js';
import {CreateCommentDTO} from './dto/create-comment.dto.js';
import {CommentService} from './comment-service.interface.js';
import {OfferService} from '../offer/offer-service.interface.js';
import {fillDTO} from '../../helpers/index.js';
import {CommentRDO} from './rdo/comment.rdo.js';


@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommnetController...');

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDTO),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  public async index({params}: Request<Record<string, unknown>, Record<string, unknown>>, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId as string);
    const responseData = fillDTO(CommentRDO, comments);
    this.ok(res, responseData);
  }

  public async create({params, body, tokenPayload}: Request<Record<string, unknown>, Record<string, unknown>, CreateCommentDTO>, res: Response): Promise<void> {

    const comment = await this.commentService.create({
      ...body,
      userId: tokenPayload.id,
      offerId: params.offerId as string
    });
    await this.offerService.incNumberOfComments(params.offerId as string);
    this.created(res, fillDTO(CommentRDO, comment));
  }
}
