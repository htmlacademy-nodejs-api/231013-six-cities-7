import { UserType } from '../enum/user-type.enum.js';

export type User = {
  name: string;
  email: string;
  avatar: string;
  type: typeof UserType;
  //password?: string;
}
