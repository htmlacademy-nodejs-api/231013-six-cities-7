import {User, Location} from '../../../types/index.js';
import {OfferType, City, Feature} from '../../../enum/index.js';

export class CreateOfferDTO {
  public title: string;
  public description: string;
  public publicDate: Date;
  public city: typeof City;
  public previewImg: string;
  public photos: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public offerType: typeof OfferType;
  public numberOfRooms: number;
  public numberOfGuests: number;
  public rentPrice: number;
  public features: (typeof Feature)[];
  public user: User;
  public numberOfComments: number;
  public location: Location;
}
