import { Expose, Type } from 'class-transformer';
import {Location} from '../../../types/index.js';
import {
  OfferType,
  City,
  Feature
} from '../../../enum/index.js';
import { UserResponseRdo } from '../../user/rdo/user-response.rdo.js';

export class DetailsOfferRDO {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public publicDate: Date;

  @Expose()
  public city: City;

  @Expose()
  public previewImg: string;

  @Expose()
  public photos: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public offerType: OfferType;

  @Expose()
  public numberOfRooms: number;

  @Expose()
  public numberOfGuests: number;

  @Expose()
  public rentPrice: number;

  @Expose()
  public features: Feature[];

  @Expose({name: 'userId'})
  @Type(() => UserResponseRdo)
  public user: UserResponseRdo;

  @Expose()
  public numberOfComments: number;

  @Expose()
  public location: Location;
}
