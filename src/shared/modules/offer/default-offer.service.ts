import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';

import {OfferService} from './offer-service.interface.js';
import {Logger} from '../../libs/logger/index.js';
import {OfferEntity} from './offer.entity.js';
import {CreateOfferDTO} from './dto/create-offer.dto.js';
import {UpdateOfferDTO} from './dto/update-offer.dto.js';
import {
  Component,
  City,
  SortType
} from '../../enum/index.js';
import {DEFAULT_OFFERS_COUNT, DEFAULT_PREMIUM_OFFERS_COUNT} from '../../constants/constants.js';


@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId'])
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDTO): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
    this.logger.info(`Offer updated: ${offerId}`);

    //Q: Как правильно обрабатывать ошибки? например, если документ не найден
    if (!result) {
      throw new Error(`No document found with id ${offerId}`);
    }

    return result;
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel.findByIdAndDelete(offerId).exect();

    this.logger.info(`Offer deleted: ${offerId}`);

    return result;
  }

  //Q: А нужен ли тут город?
  public async getOffersList(limit: number = DEFAULT_OFFERS_COUNT, city?: City): Promise<DocumentType<OfferEntity>[]> {
    /*const result = await this.offerModel
      .find({city: city}, {}, {limit})
      .populate(['userId'])
      .sort({publicDate: SortType.Down})
      .exec();*/

    const result = await this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'offers',
            let: { userId: '$_id'},
            pipeline: [
              { $match: { $expr: { $in: ['$$userId', 'users']}}},
              { $project: {_id: 1}}
            ],
            as: 'offers'
          }
        },
      ]).exec();

    return result;
  }

  public async getDetails(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId'])
      .exec();
  }

  public async getPremiumOffersByCity(city: City): Promise<DocumentType<OfferEntity>[] | null> {
    const result = await this.offerModel
      .find({city: city, isPremium: true}, {}, {DEFAULT_PREMIUM_OFFERS_COUNT})
      .exec();

    return result;
  }

  public async incNumberOfComments(offerId: string): Promise<DocumentType<OfferEntity>| null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        numberOfComments: 1,
      }}).exec();
  }

  //Q:
  public async getFavoriteOffers(): Promise<DocumentType<OfferEntity>[] | null> {
    const result = await this.offerModel.find({
      isFavorite: true
    }).exec();

    return result;
  }

  public async switchFavoriteOffer(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.offerModel.findById(offerId);

    if (!offer) {
      throw new Error(`No book found with id ${offerId}`);
    }

    const newFavoriteStatus = !offer;
    const result = await this.offerModel.findByIdAndUpdate(offerId, {isFavorite: newFavoriteStatus}, {new: true});

    return result;
  }
}
