export type Location = {
  lt: number;
  ln: number;
}

const City = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf'
} as const;

export type City = typeof City[keyof typeof City];

const Feature = {
  Breakfast: 'Breakfast',
  AirConditioning: 'Air conditioning',
  Workspace: 'Laptop friendly workspace',
  BabySeat: 'Baby seat',
  Washer: 'Washer',
  Towels: 'Towels',
  Fridge: 'Fridge',
} as const;

export type Feature = typeof Feature[keyof typeof Feature];

const OfferType = {
  Aparment: 'apartment',
  House: 'house',
  Room: 'room',
  Hotel: 'hotel',
} as const;

export type OfferType = typeof OfferType[keyof typeof OfferType];

export const UserType = {
  Ordinary: 'Ordinary',
  Pro: 'Pro'
} as const;

export type UserType = typeof UserType[keyof typeof UserType];
