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
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exect();
  }

  public async getOffersList(limit: number = DEFAULT_OFFERS_COUNT): Promise<DocumentType<OfferEntity>[]> {
    const result = await this.offerModel
      .find({}, {}, {limit})
      .populate(['userId'])
      .sort({publicDate: SortType.Down})
      .exec();

    return result;
  }

  public async getDetailsById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId'])
      .exec();
  }

  public async getPremiumOffersByCity(city: City): Promise<DocumentType<OfferEntity>[] | null> {
    return this.offerModel
      .find({city: city, isPremium: true}, {}, {DEFAULT_PREMIUM_OFFERS_COUNT})
      .exec();
  }

  public async incNumberOfComments(offerId: string): Promise<DocumentType<OfferEntity>| null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        numberOfComments: 1,
      }}).exec();
  }

  public async recalcRatingByOfferId(offerId: string, newRatingItem: number): Promise<DocumentType<OfferEntity> | null > {
    const offer = await this.offerModel.findById(offerId);

    if(!offer) {
      throw new Error(`No document found with id ${offerId}`);
    }

    return this.offerModel.findByIdAndUpdate(offerId, {rating: ((offer.rating * offer.numberOfComments + newRatingItem) / (offer.numberOfComments + 1))}).exec();
  }

  //Not implemented yet getFavoriteOffers, switchFavoriteOffer
}
