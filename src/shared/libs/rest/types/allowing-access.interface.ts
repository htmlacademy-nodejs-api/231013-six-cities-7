import {DocumentType} from '@typegoose/typegoose';
import {OfferEntity} from '../../../modules/offer/index.js';

export interface AllowingAccess {
  findById(documentId: string): Promise<DocumentType<OfferEntity> | null>;
}
