import { Expose } from 'class-transformer';

export class OfferResponseRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;
}
