import {City, OfferType, Feature, Location} from '../backend-types.dto';

export class CreateOfferDTO {
  public title!: string;

  public description!: string;

  public publicDate!: Date;

  public city!: City;

  public previewImg!: string;

  public photos!: string[];

  public isPremium!: boolean;

  public offerType!: OfferType;

  public numberOfRooms!: number;

  public numberOfGuests!: number;

  public rentPrice!: number;

  public features!: Feature[];

  public location!: Location;
}
