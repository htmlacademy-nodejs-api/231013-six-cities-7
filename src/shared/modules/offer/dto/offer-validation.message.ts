import {
  MIN_OFFER_TITLE_LENGTH,
  MAX_OFFER_TITLE_LENGTH,
  MIN_OFFER_DESCRIPTION_LENGTH,
  MAX_OFFER_DESCRIPTION_LENGTH,
  REQUIRED_NUMBER_OF_PHOTO,
  MIN_RATING,
  MAX_RATING,
  MIN_ROOMS,
  MAX_ROOMS,
  MIN_PRICE,
  MAX_PRICE,
  MIN_GUESTS,
  MAX_GUESTS
} from '../../../constants/constants.js';

export const OfferValidationMessage = {
  title: {
    minLength: `Minimum title length must be ${MIN_OFFER_TITLE_LENGTH}`,
    maxLength: `Maximum title length must be ${MAX_OFFER_TITLE_LENGTH}`,
  },
  description: {
    minLength: `Minimum description length must be ${MIN_OFFER_DESCRIPTION_LENGTH}`,
    maxLength: `Maximum description length must be ${MAX_OFFER_DESCRIPTION_LENGTH}`,
  },
  publicDate: {
    invalidFormat: 'PostDate must be a valid ISO date',
  },
  city: {
    invalid: 'City must be Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf',
  },
  previewImg: {
    maxLength: 'Too long for field «image»',
  },
  photos: {
    invalidFormat: 'Field photos must be an array',
    invalidLength: `Array's length must be ${REQUIRED_NUMBER_OF_PHOTO}`,
  },
  offerType: {
    invalid: 'offerType must be house, room, hotel apartment',
  },
  rating: {
    minValue: `Minimum rating must be ${MIN_RATING}`,
    maxValue: `Maximum rating must be ${MAX_RATING}`,
  },
  numberOfRooms: {
    minValue: `Minimum number of rooms in offer must be ${MIN_ROOMS}`,
    maxValue: `Maximum number of rooms in offer must be ${MAX_ROOMS}`,
  },
  numberOfGuests: {
    minValue: `Minimum number of guests in offer must be ${MIN_GUESTS}`,
    maxValue: `Maximum number of guests in offer must be ${MAX_GUESTS}`,
  },
  rentPrice: {
    invalidFormat: 'Price must be an integer',
    minValue: `Minimum price is ${MIN_PRICE}`,
    maxValue: `Maximum price is ${MAX_PRICE}`,
  },
  isPremium: {
    invalid: 'It must be boolean value',
  },
  features: {
    invalidFormat: 'Field features must be an array',
    invalid: 'Invalid value for field features',
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
  numberOfComments: {
    invalidFormat: 'Price must be an integer',
  },
  location: {
    invalidFormat: 'It must be oblect Location'
  }
} as const;
