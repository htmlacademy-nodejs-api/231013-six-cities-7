import {readFileSync} from 'node:fs';
import {FileReader} from './file-reader.interface.js';
import {RentOffer, Feature, HousingType, Coordinates} from '../../types/index.js';

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

  private parseRawDataToOffers(): RentOffer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): RentOffer {
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
      housingType,
      numberOfRooms,
      numberOfGuests,
      rentPrice,
      features,
      author,
      numberOfComments,
      coordinates
    ] = line.split('\t');

    return {
      title,
      description,
      publicDate: new Date(publicDate),
      city,
      previewImg,
      photos: this.parsePhotos(photos),
      isPremium: this.parseBoolean(isPremium),
      isFavorite: this.parseBoolean(isFavorite),
      rating: this.parseNumbers(rating),
      housingType: housingType as HousingType,
      numberOfRooms: this.parseNumbers(numberOfRooms),
      numberOfGuests: this.parseNumbers(numberOfGuests),
      rentPrice: this.parseNumbers(rentPrice),
      features: this.parseFeatures(features),
      author,
      numberOfComments: this.parseNumbers(numberOfComments),
      coordinates: this.parseCoordinates(coordinates),
    };
  }

  private parseFeatures(features: string): Feature[] {
    return features.split(';').map((feature) => Feature[feature as keyof typeof Feature]);
  }

  private parsePhotos(photos: string): string[] {
    return photos.split(';');
  }

  //Q: А нужно ли писать разные методы для numberOfRooms, numberOfGuests, rentPrice
  private parseNumbers(value: string): number {
    return Number.parseInt(value, 10);
  }

  private parseBoolean(value: string): boolean {
    return JSON.parse(value);
  }

  private parseCoordinates(coordinates: string):Coordinates {
    return coordinates.split(';').reduce((obj: Coordinates, value, index) => {
      if (index === 0) {
        obj.lt = Number.parseInt(value, 10);
      } else if (index === 1) {
        obj.ln = Number.parseInt(value, 10);
      }
      return obj;
    }, {lt: 0, ln: 0});
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  public toArray(): RentOffer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
