import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
  Ref,
} from '@typegoose/typegoose';

import {User} from '../../types/index.js';
import {UserType} from '../../enum/index.js';
import {createSHA256} from '../../helpers/index.js';
import { OfferEntity } from '../offer/offer.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    unique: true,
    required: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect']
  })
  public email: string;

  @prop({
    required: true,
    minlength: 1,
    maxlength: 15,
    default: ''
  })
  public name: string;

  @prop({required: false, default: ''})
  public avatar?: string;

  @prop ({
    required: false,
    ref: OfferEntity,
    default: [],
    _id: false
  })
  public favoriteOffers!: Ref<OfferEntity>[];

  @prop({
    required: true,
    enum: UserType,
  })
  public type: UserType;

  @prop({
    required: true,
    default: '',
  })
  private password?: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatar = userData.avatar;
    this.name = userData.name;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);

