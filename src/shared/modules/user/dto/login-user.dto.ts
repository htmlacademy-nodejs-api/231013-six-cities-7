import {
  MaxLength,
  MinLength,
  IsEmail,
} from 'class-validator';

import {UserValidationMessage} from './user-validation.message.js';

export class LoginUserDTO {
  @IsEmail({}, {message: UserValidationMessage.email.invalid})
  public email: string;

  @MinLength(6, {message: UserValidationMessage.password.minLength})
  @MaxLength(12, {message: UserValidationMessage.password.maxLength})
  public password: string;
}
