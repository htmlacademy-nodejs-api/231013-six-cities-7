import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsObject,
  IsEnum,
  IsInt,
  Max,
  MaxLength,
  Min,
  MinLength,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';

import {
  MIN_OFFER_TITLE_LENGTH,
  MAX_OFFER_TITLE_LENGTH,
  MIN_OFFER_DESCRIPTION_LENGTH,
  MAX_OFFER_DESCRIPTION_LENGTH,
  MAX_PICTURE_URL_LENGTH,
  REQUIRED_NUMBER_OF_PHOTO,
  MIN_ROOMS,
  MAX_ROOMS,
  MIN_PRICE,
  MAX_PRICE,
  MIN_GUESTS,
  MAX_GUESTS
} from '../../../constants/constants.js';
import {Location} from '../../../types/index.js';
import {OfferType, City, Feature} from '../../../enum/index.js';
import {OfferValidationMessage} from './offer-validation.message.js';

export class CreateOfferDTO {
  @MinLength(MIN_OFFER_TITLE_LENGTH, {message: OfferValidationMessage.title.minLength})
  @MaxLength(MAX_OFFER_TITLE_LENGTH, {message: OfferValidationMessage.title.maxLength})
  public title: string;

  @MinLength(MIN_OFFER_DESCRIPTION_LENGTH, {message: OfferValidationMessage.description.minLength})
  @MaxLength(MAX_OFFER_DESCRIPTION_LENGTH, {message: OfferValidationMessage.description.maxLength})
  public description: string;

  @IsDateString({}, {message: OfferValidationMessage.publicDate.invalidFormat})
  public publicDate: Date;

  @IsEnum(City, {message: OfferValidationMessage.city.invalid})
  public city: City;

  @MaxLength(MAX_PICTURE_URL_LENGTH, {message: OfferValidationMessage.previewImg.maxLength})
  public previewImg: string;

  @IsArray({message: OfferValidationMessage.photos.invalidFormat})
  @ArrayMinSize(REQUIRED_NUMBER_OF_PHOTO, {message: OfferValidationMessage.photos.invalidLength})
  @ArrayMaxSize(REQUIRED_NUMBER_OF_PHOTO, {message: OfferValidationMessage.photos.invalidLength})
  public photos: string[];

  @IsBoolean({message: OfferValidationMessage.isPremium.invalid})
  public isPremium: boolean;

  @IsEnum(OfferType, {message: OfferValidationMessage.offerType.invalid})
  public offerType: OfferType;

  @Min(MIN_ROOMS, {message: OfferValidationMessage.numberOfRooms.minValue})
  @Max(MAX_ROOMS, {message: OfferValidationMessage.numberOfRooms.maxValue})
  public numberOfRooms: number;

  @Min(MIN_GUESTS, {message: OfferValidationMessage.numberOfGuests.minValue})
  @Max(MAX_GUESTS, {message: OfferValidationMessage.numberOfGuests.maxValue})
  public numberOfGuests: number;

  @IsInt({message: OfferValidationMessage.rentPrice.invalidFormat})
  @Min(MIN_PRICE, {message: OfferValidationMessage.rentPrice.minValue})
  @Max(MAX_PRICE, {message: OfferValidationMessage.rentPrice.maxValue})
  public rentPrice: number;

  @IsArray({ message: OfferValidationMessage.features.invalidFormat })
  @IsEnum(Feature, { message: OfferValidationMessage.features.invalid, each: true })
  public features: Feature[];

  public userId: string;

  @IsObject({message: OfferValidationMessage.location.invalidFormat})
  public location: Location;
}
