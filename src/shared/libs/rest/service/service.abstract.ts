import {injectable} from 'inversify';
import {DocumentType} from '@typegoose/typegoose';

import {ServiceInterface} from './service.interface.js';

@injectable()
export abstract class AbstractService<T, C = unknown, U = unknown> implements ServiceInterface<T, C, U> {
  public async create(_dto: C): Promise<DocumentType<T>> {
    throw new Error('Not implemtnted');
  }

  public async findById(_documentId: string): Promise<DocumentType<T> | null> {
    throw new Error('Not implemtnted');
  }

  public async find(_limit: number): Promise<DocumentType<T>[]> {
    throw new Error('Not implemtnted');
  }

  public async updateById(_documentId: string, _dto: U): Promise<DocumentType<T> | null> {
    throw new Error('Not implemtnted');
  }

  public async deleteById(_documentId: string): Promise<DocumentType<T> | null> {
    throw new Error('Not implemtnted');
  }
}
