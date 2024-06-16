import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
  Ref,
  Severity,
} from '@typegoose/typegoose';

import {
  MIN_OFFER_TITLE_LENGTH,
  MAX_OFFER_TITLE_LENGTH,
  MIN_OFFER_DESCRIPTION_LENGTH,
  MAX_OFFER_DESCRIPTION_LENGTH,
  MIN_ROOMS, MAX_ROOMS,
  MIN_PRICE, MAX_PRICE,
  MIN_GUESTS, MAX_GUESTS,
  MIN_RATING,MAX_RATING
} from '../../constants/constants.js';
import {UserEntity} from '../user/index.js';
import {Location} from '../../types/index.js';
import {OfferType, City, Feature} from '../../enum/index.js';

const INIT_TOTAL_RATING = 0;
const INIT_NUMBER_OF_COMMENTS = 0;

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {

  @prop({
    required: true,
    trim: true,
    maxlength: MAX_OFFER_TITLE_LENGTH,
    minlength: MIN_OFFER_TITLE_LENGTH,
  })
  public title: string;

  @prop({
    trim: true,
    required: true,
    maxlength: MAX_OFFER_DESCRIPTION_LENGTH,
    minlength: MIN_OFFER_DESCRIPTION_LENGTH,
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

  @prop({
    required: true,
    default: INIT_TOTAL_RATING,
  })
  public totalRating: number;

  @prop({
    required: true,
    default: MAX_RATING,
    max: MAX_RATING,
    min: MIN_RATING,
  })
  public overageRating: number;

  @prop({
    required: true,
    enum: OfferType,
    type: String,
  })
  public offerType!: OfferType;

  @prop({
    required: true,
    max: MAX_ROOMS,
    min: MIN_ROOMS,
  })
  public numberOfRooms: number;

  @prop({
    required: true,
    max: MAX_GUESTS,
    min: MIN_GUESTS,
  })
  public numberOfGuests: number;

  @prop({
    required: true,
    max: MAX_PRICE,
    min: MIN_PRICE,
  })
  public rentPrice: number;

  @prop()
  public features: Feature[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({
    required: true,
    default: INIT_NUMBER_OF_COMMENTS,
  })
  public numberOfComments: number;

  @prop({ required: true })
  public location: Location;

}

export const OfferModel = getModelForClass(OfferEntity);
