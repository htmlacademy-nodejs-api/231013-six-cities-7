import {DocumentType} from '@typegoose/typegoose';

import {CreateOfferDTO} from './dto/create-offer.dto.js';
import {UpdateOfferDTO} from './dto/update-offer.dto.js';
import {OfferEntity} from './offer.entity.js';
import {City} from '../../enum/index.js';

export interface OfferService {
  create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDTO): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  getOffersList(limit: number, city?: City): Promise<DocumentType<OfferEntity>[]>;
  getDetailsById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  getPremiumOffersByCity(city: City): Promise<DocumentType<OfferEntity>[] | null>;
  incNumberOfComments(offerId: string, count?: number): Promise<DocumentType<OfferEntity> | null>;
  recalcRatingByOfferId(offerId: string, newRatingItem: number): Promise<DocumentType<OfferEntity> | null >;
}
