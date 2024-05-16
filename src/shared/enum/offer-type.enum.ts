export const OfferType = {
  Aparment: 'apartment',
  House: 'house',
  Room: 'room',
  Hotel: 'hotel',
} as const;

export type OfferType = typeof OfferType[keyof typeof OfferType];
