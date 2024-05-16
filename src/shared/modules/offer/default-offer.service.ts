import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';

import {OfferService} from './offer-service.interface.js';
import {Logger} from '../../libs/logger/index.js';
import {OfferEntity} from './offer.entity.js';
import {CreateOfferDTO} from './dto/create-offer.dto.js';
import {OfferUpdates} from '../../types/offer-updates.type.js';
import {City, Component} from '../../enum/index.js';

const DEFAULT_OFFERS_LIMIT = 60;

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
    return this.offerModel.findById(offerId).exec();
  }

  /* Пока лишнее
  public async update(offerId: string, updates: OfferUpdates): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel.findByIdAndUpdate(offerId, updates, {new: true});
    this.logger.info(`Offer updated: ${offerId}`);

    //Q: Как правильно обрабатывать ошибки? например, если документ не найден
    if (!result) {
      throw new Error(`No document found with id ${offerId}`);
    }

    return result;
  }

  public async delete(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel.findByIdAndDelete(offerId);

    this.logger.info(`Offer deleted: ${offerId}`);

    return result;
  }

  //Q: Как вернуть только нужные поля? пройтись map по полученному массиву?
  public async getOffersList(limit: number = DEFAULT_OFFERS_LIMIT): Promise<DocumentType<OfferEntity>[]> {
    const result = await this.offerModel.find().sort({publicDate: -1}).limit(limit).exec();

    return result;
  }

  public async getDetails(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }

  public async getPremiumOffersByCity(city: typeof City): Promise<DocumentType<OfferEntity>[] | null> {
    const result = await this.offerModel.find({
      city: city,
      isPremium: true
    }).exec();

    return result;
  }

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

    const newFavoriteStatus = !offer.isFavorite;
    const result = await this.offerModel.findByIdAndUpdate(offerId, {isFavorite: newFavoriteStatus}, {new: true});

    return result;
  }*/
}
