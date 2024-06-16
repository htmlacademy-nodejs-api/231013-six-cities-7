import {injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';

import {ServiceInterface} from './service.interface.js';

@injectable()
export abstract class AbstractService<T> implements ServiceInterface<T> {
  private readonly abstactModel: types.ModelType<DocumentType<T>>

  public async findById(documentId: string): Promise<DocumentType<T> | null> {
    return this.abstactModel.findById(documentId);
  }
}
