import {Coordinates} from './coordinates.type.js';
import {HousingType} from './housing-type.enum.js';
import {Feature} from './feature.enum.js';

export type RentOffer = {
  title: string;
  description: string;
  publicDate: Date;
  city: string;
  previewImg: string;
  photos: string [];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  numberOfRooms: number;
  numberOfGuests: number;
  rentPrice: number;
  features: Feature[];
  author: string;
  numberOfComments: number;
  coordinates: Coordinates;
}
