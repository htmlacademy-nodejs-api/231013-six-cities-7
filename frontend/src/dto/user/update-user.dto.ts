const UserType = {
  Ordinary: 'Ordinary',
  Pro: 'Pro'
} as const;

export type UserType = typeof UserType[keyof typeof UserType];

export class UpdateUserDTO {
  public name?: string;

  public type?: UserType;

  public avatar?: string;

  public favoriteOffersId?: string[];
}
