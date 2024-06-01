import { Expose } from 'class-transformer';
import {Location} from '../../../types/index.js';
import {OfferType, City} from '../../../enum/index.js';

export class OfferRDO {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public publicDate: Date;

  @Expose()
  public city: City;

  @Expose()
  public previewImg: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public offerType: OfferType;

  @Expose()
  public rentPrice: number;

  @Expose()
  public numberOfComments: number;

  @Expose()
  public location: Location;
}
