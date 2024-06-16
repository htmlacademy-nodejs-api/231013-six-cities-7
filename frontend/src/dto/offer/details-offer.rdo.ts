import {City, OfferType, Feature, Location} from '../backend-types.dto';
import { UserRDO } from '../user/user.rdo';

export class DetailsOfferRDO {
  public id!: string;

  public title!: string;

  public description!: string;

  public publicDate!: Date;

  public city!: City;

  public previewImg!: string;

  public photos!: string[];

  public isPremium!: boolean;

  public isFavorite?: boolean;

  public rating!: number;

  public offerType!: OfferType;

  public numberOfRooms!: number;

  public numberOfGuests!: number;

  public rentPrice!: number;

  public features!: Feature[];

  public user!: UserRDO;

  public numberOfComments!: number;

  public location!: Location;
}
