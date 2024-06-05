import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  Max,
  MaxLength,
  Min,
  MinLength,
  IsMimeType,
} from 'class-validator';

import {Location} from '../../../types/index.js';
import {OfferType, City, Feature} from '../../../enum/index.js';
import {OfferValidationMessage} from './offer-validation.message.js';

export class UpdateOfferDTO {
  @MinLength(10, { message: OfferValidationMessage.title.minLength })
  @MaxLength(100, { message: OfferValidationMessage.title.maxLength })
  public title?: string;

  @MinLength(20, { message: OfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: OfferValidationMessage.description.maxLength })
  public description?: string;

  @IsDateString({}, { message: OfferValidationMessage.publicDate.invalidFormat })
  public publicDate?: Date;

  @IsEnum(City, { message: OfferValidationMessage.city.invalid })
  public city?: City;

  @IsMimeType(['image/jpeg', 'image/png'], { message: OfferValidationMessage.previewImg.invalidType })
  @MaxLength(256, { message: OfferValidationMessage.previewImg.maxLength })
  public previewImg?: string;

  @IsArray({ message: OfferValidationMessage.photos.invalidFormat })
  @MinLength(6, { message: OfferValidationMessage.photos.invalidLength})
  @MaxLength(6, { message: OfferValidationMessage.photos.invalidLength})
  @IsMimeType(
    ['image/jpeg', 'image/png'], {
    message: OfferValidationMessage.photos.invalidType,
    each: true,
  })
  public photos?: string[];

  public isPremium?: boolean;

  @Min(1, {message: OfferValidationMessage.rating.minValue})
  @Max(5, {message: OfferValidationMessage.rating.maxValue})
  public rating?: number;

  public offerType?: OfferType;

  @Min(1, {message: OfferValidationMessage.numberOfRooms.minValue})
  @Max(8, {message: OfferValidationMessage.numberOfRooms.maxValue})
  public numberOfRooms?: number;

  @Min(1, {message: OfferValidationMessage.numberOfGuests.minValue})
  @Max(10, {message: OfferValidationMessage.numberOfGuests.maxValue})
  public numberOfGuests?: number;

  @IsInt({message: OfferValidationMessage.rentPrice.invalidFormat})
  @Min(100, {message: OfferValidationMessage.rentPrice.minValue})
  @Max(100000, {message: OfferValidationMessage.rentPrice.maxValue})
  public rentPrice?: number;

  @IsArray({ message: OfferValidationMessage.features.invalidFormat })
  @IsEnum(Feature, { message: OfferValidationMessage.features.invalid })
  public features?: Feature[];

  @IsInt({message: OfferValidationMessage.numberOfComments.invalidFormat})
  public numberOfComments?: number;

  public location?: Location;
}
