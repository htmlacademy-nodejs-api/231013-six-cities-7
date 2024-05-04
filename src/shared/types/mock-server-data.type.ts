type MockUser = {
  name: string;
  email: string;
  avatar?: string;
};

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  previewImages: string[];
  photos: string[];
  user: MockUser[];
}
