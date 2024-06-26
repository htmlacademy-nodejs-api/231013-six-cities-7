import { Expose } from 'class-transformer';

export class UserRDO {
  @Expose()
  public name: string ;

  @Expose()
  public avatar: string ;

  @Expose()
  public type: string ;

  @Expose()
  public email: string ;

  @Expose()
  public id: string;

  @Expose()
  public favoriteOffersId: string[];
}
