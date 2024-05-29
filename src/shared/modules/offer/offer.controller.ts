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
import {OfferService} from './offer-service.interface.js';
import {OfferRdo} from './rdo/offer.rdo.js';
import {OfferResponseRdo} from './rdo/offer-response.rdo.js';
import {CreateOfferDTO} from './dto/create-offer.dto.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    //Q: Как задать количество при методе get?
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    //Q: Как задать город?
    this.addRoute({ path: '/:city/premium', method: HttpMethod.Get, handler: this.premium });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.getOffersList(60);
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  //Q: Как быть с полями, которые должны быть из БД?
  //Q: А какие данные должны отдавать?
  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDTO>,
    res: Response
  ): Promise<void> {
    const newOffer = await this.offerService.create(body);
    this.created(res, fillDTO(OfferResponseRdo, newOffer));
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
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }
}
