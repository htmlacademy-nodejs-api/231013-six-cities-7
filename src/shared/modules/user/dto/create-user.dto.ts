import { UserType } from '../../../enum/index.js';

export class CreateUserDTO {
  public email: string;
  public avatar: string;
  public name: string;
  public type: UserType;
  public password: string;
}

