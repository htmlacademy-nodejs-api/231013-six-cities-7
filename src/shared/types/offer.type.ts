import {Location} from './location.type.js';
import {User} from './user.type.js';
import {OfferType} from './offer-type.enum.js';
import {Feature} from './feature.enum.js';

export type Offer = {
  title: string;
  description: string;
  publicDate: Date;
  city: string;
  previewImg: string;
  photos: string [];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  offerType: OfferType;
  numberOfRooms: number;
  numberOfGuests: number;
  rentPrice: number;
  features: Feature[];
  user: User;
  numberOfComments: number;
  location: Location;
}
