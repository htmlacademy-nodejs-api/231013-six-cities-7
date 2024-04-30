import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import {FileReader} from './file-reader.interface.js';
import {Offer, Feature, Location, OfferType, City, UserType} from '../../types/index.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384; // 16KB
  constructor(
    private readonly filename: string
  ) {
    super();
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

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }

    this.emit('end', importedRowCount);
  }
}
