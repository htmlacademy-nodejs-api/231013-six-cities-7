import {DocumentType} from '@typegoose/typegoose';

import {CreateOfferDTO} from './dto/create-offer.dto.js';
import {OfferEntity} from './offer.entity.js';
//import {OfferUpdates} from '../../types/offer-updates.type.js';
//import {City} from '../../enum/index.js';

export interface OfferService {
  create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  /* Пока лишнее
  //Q: Как должны быть представлены апдейты?
  update(offerId: string, updates: OfferUpdates): Promise<DocumentType<OfferEntity> | null>;
  delete(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  getOffersList(limit: number): Promise<DocumentType<OfferEntity>[]>;
  //Q: А может ли быть null в getDetails?
  getDetails(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  getPremiumOffersByCity(city: typeof City): Promise<DocumentType<OfferEntity>[] | null>;
  //Q: Тут как будто привязка к пользователю нужна
  getFavoriteOffers(): Promise<DocumentType<OfferEntity>[] | null>;
  switchFavoriteOffer(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  */
}
