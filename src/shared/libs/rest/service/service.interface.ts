import {DocumentType} from '@typegoose/typegoose';

export interface ServiceInterface <T, C = unknown, U = unknown> {
  find(limit: number): Promise<DocumentType<T>[]>
  create(dto: C): Promise<DocumentType<T>>;
  findById(documentId: string): Promise<DocumentType<T> | null>;
  updateById(documentId: string, dto: U): Promise<DocumentType<T> | null>;
  deleteById(documentId: string): Promise<DocumentType<T> | null>;
}
