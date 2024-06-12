import {
  IsDateString,
  IsInt,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import {CommentValidationMessage} from './comment-validation.message.js';

export class CreateCommentDTO {
  @MinLength(5, {message: CommentValidationMessage.content.minLength})
  @MaxLength(1024, {message: CommentValidationMessage.content.maxLength})
  public content: string;

  @IsInt({message: CommentValidationMessage.rating.invalidFormat})
  @Min(1, {message: CommentValidationMessage.rating.minValue})
  @Max(5, {message: CommentValidationMessage.rating.maxValue})
  public rating: number;

  @IsDateString({}, {message: CommentValidationMessage.date.invalidFormat})
  public date: Date;

  public offerId: string;

  public userId: string;
}
