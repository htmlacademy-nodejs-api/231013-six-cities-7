import {inject, injectable} from 'inversify';
import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

import {
  BaseController,
  HttpMethod,
  HttpError} from '../../libs/rest/index.js';
import {Logger} from '../../libs/logger/index.js';
import {City, Component} from '../../enum/index.js';
import {fillDTO} from '../../helpers/index.js';
import {CommentService} from '../comment/comment-service.interface.js';
import {OfferService} from './offer-service.interface.js';
import {OfferRDO} from './rdo/offer.rdo.js';
import {DetailsOfferRDO} from './rdo/details-offer.rdo.js';
import {CreateOfferDTO} from './dto/create-offer.dto.js';
import {UpdateOfferDTO} from './dto/update-offer.dto.js';


@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentServise: CommentService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/favorites', method: HttpMethod.Get, handler: this.favorites });
    this.addRoute({ path: '/:offerId/update', method: HttpMethod.Post, handler: this.update });
    this.addRoute({ path: '/:offerId/details', method: HttpMethod.Post, handler: this.details });
    this.addRoute({ path: '/:offerId/favorites', method: HttpMethod.Post, handler: this.changeFavorite });
    this.addRoute({ path: '/:offerId/delete', method: HttpMethod.Post, handler: this.delete });
    this.addRoute({ path: '/:city/premium', method: HttpMethod.Get, handler: this.premium });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.getOffersList(60);
    const responseData = fillDTO(OfferRDO, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDTO>,
    res: Response
  ): Promise<void> {
    const newOffer = await this.offerService.create(body);
    this.created(res, fillDTO(DetailsOfferRDO, newOffer));
  }

  public async premium(req: Request, res: Response): Promise<void> {
    const city = req.params.city;

    if (!Object.values(City).includes(city as City)) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `${city} doesn't exists in database.`,
        'CityController'
      );
    }
    const offers = await this.offerService.getPremiumOffersByCity(city as City);
    const responseData = fillDTO(OfferRDO, offers);
    this.ok(res, responseData);
  }

  public async update({ params, body }: Request<Record<string, unknown>, Record<string, unknown>, UpdateOfferDTO>,
    res: Response): Promise<void> {
    const updateOffer = await this.offerService.updateById(params.offerId as string, body);

    const responseData = fillDTO(DetailsOfferRDO, updateOffer);
    this.ok(res, responseData);
  }

  public async details({ params }: Request<Record<string, unknown>, Record<string, unknown>>,
    res: Response): Promise<void> {
    const detailsOffer = await this.offerService.getDetailsById(params.offerId as string);
    const responseData = fillDTO(DetailsOfferRDO, detailsOffer);
    this.ok(res, responseData);
  }

  public async delete({ params }: Request<Record<string, unknown>, Record<string, unknown>>,
    res: Response): Promise<void> {
    const deleteOffer = await this.offerService.deleteById(params.offerId as string);
    await this.commentServise.deleteByOfferId(params.offerId as string);

    const responseData = fillDTO(DetailsOfferRDO, deleteOffer);
    this.ok(res, responseData);
  }

  public async favorites(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }

  public async changeFavorite(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }
}
