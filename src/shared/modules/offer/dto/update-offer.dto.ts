import {Location} from '../../../types/index.js';
import {OfferType, City, Feature} from '../../../enum/index.js';

export class UpdateOfferDTO {
  public title?: string;
  public description?: string;
  public publicDate?: Date;
  public city?: City;
  public previewImg?: string;
  public photos?: string[];
  public isPremium?: boolean;
  public rating?: number;
  public offerType?: OfferType;
  public numberOfRooms?: number;
  public numberOfGuests?: number;
  public rentPrice?: number;
  public features?: Feature[];
  public numberOfComments?: number;
  public location?: Location;
}