import {Expose} from 'class-transformer';

export class LoggedUserRDO {
  @Expose()
  public email: string;

  @Expose()
  public avatar: string;

  @Expose()
  public name: string;

  @Expose()
  public favoriteOffersId: string[];

  @Expose()
  public type: string;
}
