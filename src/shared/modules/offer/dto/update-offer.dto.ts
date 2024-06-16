import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  Max,
  MaxLength,
  Min,
  MinLength,
  IsObject,
  IsOptional,
  ArrayMinSize,
  ArrayMaxSize
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

export class UpdateOfferDTO {
  @IsOptional()
  @MinLength(MIN_OFFER_TITLE_LENGTH, {message: OfferValidationMessage.title.minLength})
  @MaxLength(MAX_OFFER_TITLE_LENGTH, {message: OfferValidationMessage.title.maxLength})
  public title?: string;

  @IsOptional()
  @MinLength(MIN_OFFER_DESCRIPTION_LENGTH, {message: OfferValidationMessage.description.minLength})
  @MaxLength(MAX_OFFER_DESCRIPTION_LENGTH, {message: OfferValidationMessage.description.maxLength})
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: OfferValidationMessage.publicDate.invalidFormat})
  public publicDate?: Date;

  @IsOptional()
  @IsEnum(City, { message: OfferValidationMessage.city.invalid})
  public city?: City;

  @IsOptional()
  @MaxLength(MAX_PICTURE_URL_LENGTH, {message: OfferValidationMessage.previewImg.maxLength})
  public previewImg?: string;

  @IsOptional()
  @IsArray({message: OfferValidationMessage.photos.invalidFormat })
  @ArrayMinSize(REQUIRED_NUMBER_OF_PHOTO, {message: OfferValidationMessage.photos.invalidLength})
  @ArrayMaxSize(REQUIRED_NUMBER_OF_PHOTO, {message: OfferValidationMessage.photos.invalidLength})
  public photos?: string[];

  @IsOptional()
  public isPremium?: boolean;

  @IsOptional()
  public offerType?: OfferType;

  @IsOptional()
  @Min(MIN_ROOMS, {message: OfferValidationMessage.numberOfRooms.minValue})
  @Max(MAX_ROOMS, {message: OfferValidationMessage.numberOfRooms.maxValue})
  public numberOfRooms?: number;

  @IsOptional()
  @Min(MIN_GUESTS, {message: OfferValidationMessage.numberOfGuests.minValue})
  @Max(MAX_GUESTS, {message: OfferValidationMessage.numberOfGuests.maxValue})
  public numberOfGuests?: number;

  @IsOptional()
  @IsInt({message: OfferValidationMessage.rentPrice.invalidFormat})
  @Min(MIN_PRICE, {message: OfferValidationMessage.rentPrice.minValue})
  @Max(MAX_PRICE, {message: OfferValidationMessage.rentPrice.maxValue})
  public rentPrice?: number;

  @IsOptional()
  @IsArray({message: OfferValidationMessage.features.invalidFormat})
  @IsEnum(Feature, {message: OfferValidationMessage.features.invalid, each: true})
  public features?: Feature[];

  @IsOptional()
  @IsInt({message: OfferValidationMessage.numberOfComments.invalidFormat})
  public numberOfComments?: number;

  @IsOptional()
  @IsObject({message: OfferValidationMessage.location.invalidFormat})
  public location?: Location;
}
