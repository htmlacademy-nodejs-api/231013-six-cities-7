import {
  IsArray,
  IsEnum,
  MaxLength,
  MinLength,
} from 'class-validator';

import {UserType} from '../../../enum/index.js';
import {UserValidationMessage} from './user-validation.message.js';

export class UpdateUserDTO {
  @MinLength(1, {message: UserValidationMessage.name.minLength})
  @MaxLength(15, {message: UserValidationMessage.name.maxLength})
  public name?: string;

  @IsEnum(UserType, {message: UserValidationMessage.type.invalid})
  public type?: UserType;

  @MaxLength(256, {message: UserValidationMessage.avatar.maxLength})
  public avatar?: string;

  @IsArray({message: UserValidationMessage.favotiteOffersId.invalidType})
  public favoriteOffersId?: string[];
}
