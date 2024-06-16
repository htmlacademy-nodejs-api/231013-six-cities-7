import {City, OfferType, Location} from '../backend-types.dto';

export class OfferRDO {
  public id!: string;

  public title!: string;

  public publicDate!: Date;

  public city!: City;

  public previewImg!: string;

  public isPremium!: boolean;

  public rating!: number;

  public offerType!: OfferType;

  public rentPrice!: number;

  public numberOfComments!: number;

  public location!: Location;

  public isFavorite?: boolean;
}
