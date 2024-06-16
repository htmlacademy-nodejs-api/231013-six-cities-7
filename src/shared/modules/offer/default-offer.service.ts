import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';

import {OfferService} from './offer-service.interface.js';
import {DEFAULT_PREMIUM_OFFERS_COUNT} from '../../constants/constants.js';
import {AbstractService} from '../../libs/rest/service/service.abstract.js';
import {
  Component,
  City,
  SortType
} from '../../enum/index.js';
import {Logger} from '../../libs/logger/index.js';
import {OfferEntity} from './offer.entity.js';
import {CreateOfferDTO} from './dto/create-offer.dto.js';
import {UpdateOfferDTO} from './dto/update-offer.dto.js';

@injectable()
export class DefaultOfferService extends AbstractService<OfferEntity, CreateOfferDTO, UpdateOfferDTO> implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {
    super();
  }

  public async create(dto: CreateOfferDTO) {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return await result.populate('userId');
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
    return this.offerModel
      .findByIdAndDelete(offerId)
      .populate(['userId'])
      .exec();
  }

  public async find(limit: number): Promise<DocumentType<OfferEntity>[]> {
    const result = await this.offerModel
      .find({}, {}, {limit})
      .populate(['userId'])
      .sort({publicDate: SortType.Down})
      .exec();

    return result;
  }

  public async getPremiumOffersByCity(city: City): Promise<DocumentType<OfferEntity>[] | null> {
    return this.offerModel
      .find({city: city, isPremium: true}, {}, {DEFAULT_PREMIUM_OFFERS_COUNT})
      .exec();
  }

  public async updateOfferStatistic(offerId: string, newRatingItem: number): Promise<DocumentType<OfferEntity> | null > {
    const offer = await this.offerModel.findById(offerId);
    return this.offerModel.findByIdAndUpdate(offerId, {
      '$inc': {
        numberOfComments: 1,
        totalRating: newRatingItem,
      },
      overageRating: ((offer!.totalRating + newRatingItem) / (offer!.numberOfComments + 1))
    }).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }
}
