import { CreateCommentDTO } from '../dto/comment/create-comment.dto';
import { CreateUserDTO } from '../dto/user/create-user.dto';
import { CreateOfferDTO } from '../dto/offer/create-offer.dto';
import { UpdateOfferDTO } from '../dto/offer/update-offer.dto';
import { LoginUserDTO } from '../dto/user/login-user.dto';
import { City as BackendCityType, UserType as BackendUserType, Feature } from '../dto/backend-types.dto';
import { NewOffer, Offer, UserRegister, NewComment, UserAuth } from '../types/types';
import { UserType } from '../const';

function convertToBackendType(userType: UserType):BackendUserType {
  switch (userType) {
    case 'regular':
      return BackendUserType.Ordinary;
    case 'pro':
      return BackendUserType.Pro;
    default:
      throw new Error(`Unsupported userType: ${userType}`);
  }
}
export const adaptCreateUserToServer = (newUser:UserRegister):CreateUserDTO => ({
  email: newUser.email,
  name: newUser.name,
  type: convertToBackendType(newUser.type),
  password: newUser.password,
  avatar: newUser.avatar,
});

export const adaptCreateOfferToServer = (newOffer: NewOffer): CreateOfferDTO => ({
  title: newOffer.title,
  description: newOffer.description,
  publicDate: new Date(),
  city: newOffer.city.name as BackendCityType,
  previewImg: newOffer.previewImage,
  photos: newOffer.images,
  isPremium: newOffer.isPremium,
  offerType: newOffer.type,
  numberOfRooms: newOffer.bedrooms,
  numberOfGuests: newOffer.maxAdults,
  rentPrice: newOffer.price,
  features: newOffer.goods as Feature[],
  location: {
    lt: newOffer.location.latitude,
    ln: newOffer.location.longitude,
  }
});

export const adaptCreateCommentToServer = (newComment: NewComment): CreateCommentDTO => ({
  content: newComment.comment,
  rating: newComment.rating,
  date: new Date(),
});

export const adaptAuthUserToServer = (auth: UserAuth): LoginUserDTO => ({
  email: auth.email,
  password: auth.password,
});

export const adaptUpdateOfferToServer = (updateData: Offer): UpdateOfferDTO => ({
  title: updateData.title,
  description: updateData.description,
  city: updateData.city.name as BackendCityType,
  previewImg: updateData.previewImage,
  photos: updateData.images,
  isPremium: updateData.isPremium,
  offerType: updateData.type,
  numberOfRooms: updateData.bedrooms,
  numberOfGuests: updateData.maxAdults,
  rentPrice: updateData.price,
  features: updateData.goods as Feature[],
  location: {
    lt: updateData.location.latitude,
    ln: updateData.location.longitude,
  }
});
