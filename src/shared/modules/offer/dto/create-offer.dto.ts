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

import {Location} from '../../../types/index.js';
import {OfferType, City, Feature} from '../../../enum/index.js';
import {OfferValidationMessage} from './offer-validation.message.js';

export class CreateOfferDTO {
  @MinLength(10, {message: OfferValidationMessage.title.minLength})
  @MaxLength(100, {message: OfferValidationMessage.title.maxLength})
  public title: string;

  @MinLength(20, {message: OfferValidationMessage.description.minLength})
  @MaxLength(1024, {message: OfferValidationMessage.description.maxLength})
  public description: string;

  @IsDateString({}, {message: OfferValidationMessage.publicDate.invalidFormat})
  public publicDate: Date;

  @IsEnum(City, {message: OfferValidationMessage.city.invalid})
  public city: City;

  @MaxLength(256, {message: OfferValidationMessage.previewImg.maxLength})
  public previewImg: string;

  @IsArray({message: OfferValidationMessage.photos.invalidFormat})
  @ArrayMinSize(6, {message: OfferValidationMessage.photos.invalidLength})
  @ArrayMaxSize(6, {message: OfferValidationMessage.photos.invalidLength})
  public photos: string[];

  @IsBoolean({message: OfferValidationMessage.isPremium.invalid})
  public isPremium: boolean;

  @IsEnum(OfferType, {message: OfferValidationMessage.offerType.invalid})
  public offerType: OfferType;

  @Min(1, {message: OfferValidationMessage.numberOfRooms.minValue})
  @Max(8, {message: OfferValidationMessage.numberOfRooms.maxValue})
  public numberOfRooms: number;

  @Min(1, {message: OfferValidationMessage.numberOfGuests.minValue})
  @Max(10, {message: OfferValidationMessage.numberOfGuests.maxValue})
  public numberOfGuests: number;

  @IsInt({message: OfferValidationMessage.rentPrice.invalidFormat})
  @Min(100, {message: OfferValidationMessage.rentPrice.minValue})
  @Max(100000, {message: OfferValidationMessage.rentPrice.maxValue})
  public rentPrice: number;

  @IsArray({ message: OfferValidationMessage.features.invalidFormat })
  @IsEnum(Feature, { message: OfferValidationMessage.features.invalid, each: true })
  public features: Feature[];

  public userId: string;

  @IsObject({message: OfferValidationMessage.location.invalidFormat})
  public location: Location;
}
