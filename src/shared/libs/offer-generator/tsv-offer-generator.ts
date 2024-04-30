import dayjs from 'dayjs';

import {OfferGenerator} from './offer-generator.interface.js';
import {MockServerData, OfferType, City, Feature, UserType} from '../../types/index.js';
import {generateRandomValue, getRandomItem, getRandomItems, getRandomBoolean} from '../../helpers/common.js';
import {CITIES} from '../../constants/constants.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_RATING = 1;
const MAX_RATING = 5;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const publicDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem(Object.keys(City));
    const previewImg = getRandomItem(this.mockData.previewImages);
    const photos = getRandomItems(this.mockData.photos).join(';');
    const isPremium = getRandomBoolean();
    const isFavorite = getRandomBoolean();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING);
    const offerType = getRandomItem(Object.keys(OfferType));
    const numberOfRooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS);
    const numberOfGuests = generateRandomValue(MIN_GUESTS, MAX_GUESTS);
    const rentPrice = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const features = getRandomItems(Object.keys(Feature)).join(';');
    const userName = getRandomItem(this.mockData.userNames);
    const userEmail = getRandomItem(this.mockData.userEmails);
    const userAvatar = getRandomItem(this.mockData.avatars);
    const userType = getRandomItem(Object.keys(UserType));
    //ToDo: Генерация комментариев поменяется
    const numberOfComments = generateRandomValue(0, 15);
    const location = CITIES[city as keyof typeof City];

    return [
      title, description, publicDate, city, previewImg, photos, isPremium, isFavorite, rating, offerType, numberOfRooms, numberOfGuests, rentPrice, features, userName, userEmail, userAvatar, userType, numberOfComments, `${location.lt};${location.ln}`
    ].join('\t');
  }
}
