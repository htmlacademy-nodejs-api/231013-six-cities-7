import {DocumentType} from '@typegoose/typegoose';

export interface ServiceInterface <T> {
  findById(documentId: string): Promise<DocumentType<T> | null>;
}
