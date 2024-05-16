import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
} from '@typegoose/typegoose';

import {UserEntity} from '../user/index.js';
import {Offer, Location} from '../../types/index.js';
import {OfferType, City, Feature} from '../../enum/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps implements Offer {

  @prop({
    required: true,
    trim: true,
    maxlength: 100,
    minlength: 10,
  })
  public title: string;

  @prop({
    trim: true,
    required: true,
    maxlength: 1024,
    minlength: 20,
  })
  public description: string;

  @prop({ required: true })
  public publicDate: Date;

  @prop({
    required: true,
    enum: City,
  })
  public city!: City;

  @prop({ required: true })
  public previewImg: string;

  @prop({ required: true, type: () => [String] })
  public photos!: string[];

  @prop({ required: true, default: false })
  public isPremium: boolean;

  @prop({ required: true, default: false })
  public isFavorite: boolean;

  @prop({
    required: true,
    max: 5,
    min: 1,
  })
  public rating: number;

  @prop({
    required: true,
    enum: OfferType,
    type: String,
  })
  public offerType!: OfferType;

  @prop({
    required: true,
    max: 8,
    min: 1,
  })
  public numberOfRooms: number;

  @prop({
    required: true,
    max: 10,
    min: 1,
  })
  public numberOfGuests: number;

  @prop({
    required: true,
    max: 100000,
    min: 100,
  })
  public rentPrice: number;

  @prop()
  public features: Feature[];

  @prop({
    ref: () => UserEntity,
    required: true,
  })
  //Q: так как использовали не ссылку на пользователя, а пользователя полностью тип задается не так, как в учебном проекте. Надо ли переделать?
  public user: UserEntity;

  @prop({
    required: true,
    default: 0,
  })
  public numberOfComments: number;

  @prop({ required: true })
  public location: Location;

}

export const OfferModel = getModelForClass(OfferEntity);
