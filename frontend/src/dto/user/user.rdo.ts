import {UserType} from '../backend-types.dto';

export class UserRDO {
  public name!: string ;

  public email!: string;

  public avatar!: string ;

  public type!: UserType ;

  public id!: string;

  public favoriteOffersId!: string[];
}
