import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';

import {CommentService} from './comment-service.interface.js';
import {Component} from '../../enum/index.js';
import {CommentEntity} from './comment.entity.js';
import {CreateCommentDTO} from './dto/create-comment.dto.js';
import {DEFAULT_MAX_COMMENT_COUNT} from '../../constants/constants.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDTO): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return await comment.populate('userId');
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId})
      .limit(DEFAULT_MAX_COMMENT_COUNT)
      .populate('userId')
      .exec();
  }

  public async deleteByOfferId(offerId: string): Promise<number | null> {
    const result = await this.commentModel
      .deleteMany({offerId})
      .exec();

    return result.deletedCount;
  }
}
