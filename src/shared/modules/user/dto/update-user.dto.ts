import {
  IsArray,
  IsEnum,
  MaxLength,
  MinLength,
} from 'class-validator';

import {
  MAX_PICTURE_URL_LENGTH,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
} from '../../../constants/constants.js';
import {UserType} from '../../../enum/index.js';
import {UserValidationMessage} from './user-validation.message.js';

export class UpdateUserDTO {
  @MinLength(MIN_NAME_LENGTH, {message: UserValidationMessage.name.minLength})
  @MaxLength(MAX_NAME_LENGTH, {message: UserValidationMessage.name.maxLength})
  public name?: string;

  @IsEnum(UserType, {message: UserValidationMessage.type.invalid})
  public type?: UserType;

  @MaxLength(MAX_PICTURE_URL_LENGTH, {message: UserValidationMessage.avatar.maxLength})
  public avatar?: string;

  @IsArray({message: UserValidationMessage.favotiteOffersId.invalidType})
  public favoriteOffersId?: string[];
}
