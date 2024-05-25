export const SortType = {
  Down: -1,
  Up: 1,
} as const;

export type SortType = typeof SortType[keyof typeof SortType]
