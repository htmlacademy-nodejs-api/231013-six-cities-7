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
  IsOptional
} from 'class-validator';

import {Location} from '../../../types/index.js';
import {OfferType, City, Feature} from '../../../enum/index.js';
import {OfferValidationMessage} from './offer-validation.message.js';

export class UpdateOfferDTO {
  @IsOptional()
  @MinLength(10, {message: OfferValidationMessage.title.minLength})
  @MaxLength(100, {message: OfferValidationMessage.title.maxLength})
  public title?: string;

  @IsOptional()
  @MinLength(20, {message: OfferValidationMessage.description.minLength})
  @MaxLength(1024, {message: OfferValidationMessage.description.maxLength})
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: OfferValidationMessage.publicDate.invalidFormat})
  public publicDate?: Date;

  @IsOptional()
  @IsEnum(City, { message: OfferValidationMessage.city.invalid})
  public city?: City;

  @IsOptional()
  @MaxLength(256, {message: OfferValidationMessage.previewImg.maxLength})
  public previewImg?: string;

  @IsOptional()
  @IsArray({message: OfferValidationMessage.photos.invalidFormat })
  @MinLength(6, {message: OfferValidationMessage.photos.invalidLength})
  @MaxLength(6, {message: OfferValidationMessage.photos.invalidLength})
  public photos?: string[];

  @IsOptional()
  public isPremium?: boolean;

  @IsOptional()
  public offerType?: OfferType;

  @IsOptional()
  @Min(1, {message: OfferValidationMessage.numberOfRooms.minValue})
  @Max(8, {message: OfferValidationMessage.numberOfRooms.maxValue})
  public numberOfRooms?: number;

  @IsOptional()
  @Min(1, {message: OfferValidationMessage.numberOfGuests.minValue})
  @Max(10, {message: OfferValidationMessage.numberOfGuests.maxValue})
  public numberOfGuests?: number;

  @IsOptional()
  @IsInt({message: OfferValidationMessage.rentPrice.invalidFormat})
  @Min(100, {message: OfferValidationMessage.rentPrice.minValue})
  @Max(100000, {message: OfferValidationMessage.rentPrice.maxValue})
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
