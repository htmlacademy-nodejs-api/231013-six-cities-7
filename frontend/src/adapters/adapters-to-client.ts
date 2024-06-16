import { DetailsOfferRDO } from '../dto/offer/details-offer.rdo';
import { UserRDO } from '../dto/user/user.rdo';
import { CommentRDO } from '../dto/comment/comment.rdo';
import { OfferRDO } from '../dto/offer/offer.rdo';
import { UserType as BackendUserType } from '../dto/backend-types.dto';
import { Comment, Offer, User } from '../types/types';
import { UserType } from '../const';
import { formatDate } from '../utils';

function convertToFrontendUserType(userTypeBackend: BackendUserType): UserType {
  switch (userTypeBackend) {
    case 'Ordinary':
      return UserType.Regular;
      break;
    case 'Pro':
      return UserType.Pro;
      break;
    default:
      throw new Error(`Unsupported userTypeBackend: ${userTypeBackend}`);
  }
}

export const adaptOfferToClient = (offer: DetailsOfferRDO): Offer => ({
  id: offer.id,
  price: offer.rentPrice,
  rating: offer.rating,
  title: offer.title,
  isPremium: offer.isPremium,
  isFavorite: offer.isFavorite ?? false,
  city: {
    name: offer.city,
    location: {
      latitude: offer.location.lt,
      longitude: offer.location.ln
    }
  },
  location: {
    latitude: offer.location.lt,
    longitude: offer.location.ln
  },
  previewImage: offer.previewImg,
  type: offer.offerType,
  bedrooms: offer.numberOfRooms,
  description: offer.description,
  goods: offer.features,
  host: {
    name: offer.user.name,
    avatarUrl: offer.user.avatar,
    type: convertToFrontendUserType(offer.user.type),
    email: offer.user.email
  },
  images: offer.photos,
  maxAdults: offer.numberOfGuests,
});

export const adaptUserToClient = (user: UserRDO): User => ({
  name: user.name,
  avatarUrl: user.avatar,
  type: convertToFrontendUserType(user.type),
  email: user.email
});

export const adaptCommentToClient = (comment: CommentRDO): Comment => ({
  id: comment.id,
  comment: comment.content,
  date: formatDate(comment.date),
  rating: comment.rating,
  user: {
    name: comment.author.name,
    avatarUrl: comment.author.avatar,
    type: convertToFrontendUserType(comment.author.type),
    email: comment.author.email
  },
});

export const adaptCommentsToClient = (comments: CommentRDO[]): Comment[] => comments.map((comment) => adaptCommentToClient(comment));

export const adaptOffersListToClient = (offers: OfferRDO[]): Offer[] => offers.map((offer) => ({
  id: offer.id,
  price: offer.rentPrice,
  rating: offer.rating,
  title: offer.title,
  isPremium: offer.isPremium,
  isFavorite: offer.isFavorite ?? false,
  city: {
    name: offer.city,
    location: {
      latitude: offer.location.lt,
      longitude: offer.location.ln,
    }
  },
  location: {
    latitude: offer.location.lt,
    longitude: offer.location.ln
  },
  previewImage: offer.previewImg,
  type: offer.offerType,
  bedrooms: 0,
  description: '',
  goods: [] as string[],
  host: {
    name: '',
    avatarUrl: '',
    type: UserType.Regular,
    email: ''
  },
  images: [],
  maxAdults: 0,
}));

