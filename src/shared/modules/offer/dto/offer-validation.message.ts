export const OfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
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
    invalidLength: 'Array`s length must be 6',
  },
  offerType: {
    invalid: 'offerType must be house, room, hotel apartment',
  },
  rating: {
    minValue: 'Minimum rating must be 1',
    maxValue: 'Maximum rating must be 5',
  },
  numberOfRooms: {
    minValue: 'Minimum number of rooms in offer must be 1',
    maxValue: 'Maximum number of rooms in offer must be 8',
  },
  numberOfGuests: {
    minValue: 'Minimum number of guests in offer must be 1',
    maxValue: 'Maximum number of guests in offer must be 10',
  },
  rentPrice: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100000',
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
