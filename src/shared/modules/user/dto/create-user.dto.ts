import {
  IsEnum,
  MaxLength,
  MinLength,
  IsEmail,
} from 'class-validator';

import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
} from '../../../constants/constants.js';
import {UserType} from '../../../enum/index.js';
import {UserValidationMessage} from './user-validation.message.js';

export class CreateUserDTO {
  @IsEmail({}, {message: UserValidationMessage.email.invalid})
  public email: string;

  @MinLength(MIN_NAME_LENGTH, {message: UserValidationMessage.name.minLength})
  @MaxLength(MAX_NAME_LENGTH, {message: UserValidationMessage.name.maxLength})
  public name: string;

  @IsEnum(UserType, {message: UserValidationMessage.type.invalid})
  public type: UserType;

  @MinLength(MIN_PASSWORD_LENGTH, {message: UserValidationMessage.password.minLength})
  @MaxLength(MAX_PASSWORD_LENGTH, {message: UserValidationMessage.password.maxLength})
  public password: string;
}
