export const UserType = {
  Ordinary: 'Ordinary',
  Pro: 'Pro'
} as const;

export type UserType = typeof UserType[keyof typeof UserType];
