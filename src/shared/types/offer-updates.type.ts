import {Location} from './location.type.js';
import {OfferType, Feature, City} from '../enum/index.js';

export type OfferUpdates = {
  title?: string;
  description?: string;
  city?: typeof City;
  previewImg?: string;
  photos?: string [];
  isPremium?: boolean;
  isFavorite?: boolean;
  rating?: number;
  offerType?: typeof OfferType;
  numberOfRooms?: number;
  numberOfGuests?: number;
  rentPrice?: number;
  features?: typeof Feature[];
  numberOfComments?: number;
  location?: Location;
}
