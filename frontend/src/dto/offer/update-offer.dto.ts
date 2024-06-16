type Location = {
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

type City = typeof City[keyof typeof City];

const Feature = {
  Breakfast: 'Breakfast',
  AirConditioning: 'Air conditioning',
  Workspace: 'Laptop friendly workspace',
  BabySeat: 'Baby seat',
  Washer: 'Washer',
  Towels: 'Towels',
  Fridge: 'Fridge',
} as const;

type Feature = typeof Feature[keyof typeof Feature];

const OfferType = {
  Aparment: 'apartment',
  House: 'house',
  Room: 'room',
  Hotel: 'hotel',
} as const;

type OfferType = typeof OfferType[keyof typeof OfferType];

export class UpdateOfferDTO {
  public title?: string;

  public description?: string;

  public publicDate?: Date;

  public city?: City;

  public previewImg?: string;

  public photos?: string[];

  public isPremium?: boolean;

  public offerType?: OfferType;

  public numberOfRooms?: number;

  public numberOfGuests?: number;

  public rentPrice?: number;

  public features?: Feature[];

  public numberOfComments?: number;

  public location?: Location;
}
