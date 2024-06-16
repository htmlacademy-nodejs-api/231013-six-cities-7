import {UserType} from '../backend-types.dto';

export class CreateUserDTO {
  public email!: string;

  public name!: string;

  public type!: UserType;

  public password!: string;

  public avatar?: File;
}
