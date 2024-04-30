import {readFileSync} from 'node:fs';
import {FileReader} from './file-reader.interface.js';
import {Offer, Feature, Location, OfferType, City, UserType} from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';
  constructor(
    private readonly filename: string

  ) {}

  private validateRawData(): void {
    if (! this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      publicDate,
      city,
      previewImg,
      photos,
      isPremium,
      isFavorite,
      rating,
      offerType,
      numberOfRooms,
      numberOfGuests,
      rentPrice,
      features,
      userName,
      userEmail,
      userAvatar,
      userType,
      numberOfComments,
      location
    ] = line.split('\t');

    return {
      title,
      description,
      publicDate: new Date(publicDate),
      city: city as City,
      previewImg,
      photos: photos.split(';'),
      isPremium: JSON.parse(isPremium),
      isFavorite: JSON.parse(isFavorite),
      rating: Number(rating),
      offerType: offerType as OfferType,
      numberOfRooms: Number(numberOfRooms),
      numberOfGuests: Number(numberOfGuests),
      rentPrice: Number.parseInt(rentPrice, 10),
      features: features.split(';').map((property: string) => Feature[property as keyof typeof Feature]) ?? [],
      user: {
        name: userName,
        email: userEmail,
        avatar: userAvatar,
        password: '',
        type: userType as UserType,
      },
      numberOfComments: Number.parseInt(numberOfComments, 10),
      location: this.parseLocation(location),
    };
  }

  private parseLocation(location: string):Location {
    const [lt, ln] = location.split(';');

    return {
      lt: Number.parseInt(lt, 10),
      ln:  Number.parseInt(ln, 10),
    };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
