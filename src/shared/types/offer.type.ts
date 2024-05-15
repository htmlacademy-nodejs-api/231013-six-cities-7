import {Location} from './location.type.js';
import {User} from './user.type.js';
import {OfferType, Feature, City} from '../enum/index.js';

export type Offer = {
  title: string;
  description: string;
  publicDate: Date;
  city: typeof City;
  previewImg: string;
  photos: string [];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  offerType: typeof OfferType;
  numberOfRooms: number;
  numberOfGuests: number;
  rentPrice: number;
  features: typeof Feature[];
  user: User;
  numberOfComments: number;
  location: Location;
}
