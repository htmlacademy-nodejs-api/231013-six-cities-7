import {DocumentType} from '@typegoose/typegoose';

import {DocumentExists} from '../../libs/rest/index.js';
import {CreateOfferDTO} from './dto/create-offer.dto.js';
import {UpdateOfferDTO} from './dto/update-offer.dto.js';
import {OfferEntity} from './offer.entity.js';
import {City} from '../../enum/index.js';
import {ServiceInterface} from '../../libs/rest/service/service.interface.js';

export interface OfferService extends ServiceInterface<OfferEntity>, DocumentExists {
  create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDTO): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(limit: number): Promise<DocumentType<OfferEntity>[]>;
  getPremiumOffersByCity(city: City): Promise<DocumentType<OfferEntity>[] | null>;
  updateOfferStatistic(offerId: string, newRatingItem: number): Promise<DocumentType<OfferEntity> | null >;
  exists(documentId: string): Promise<boolean>;
}
