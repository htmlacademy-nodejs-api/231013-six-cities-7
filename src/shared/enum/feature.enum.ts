export const Feature = {
  Breakfast: 'Breakfast',
  AirConditioning: 'Air conditioning',
  Workspace: 'Laptop friendly workspace',
  BabySeat: 'Baby seat',
  Washer: 'Washer',
  Towels: 'Towels',
  Fridge: 'Fridge',
} as const;

export type Feature = typeof Feature[keyof typeof Feature];
