import {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
} from '../../../constants/constants.js';

export const UserValidationMessage = {
  email: {
    invalid: 'It must be email',
  },
  avatar: {
    maxLength: 'Too long url to field avatar',
  },
  name: {
    minLength: `Minimum name length must be ${MIN_PASSWORD_LENGTH}`,
    maxLength: `Maximum name length must be ${MAX_PASSWORD_LENGTH}`,
  },
  type: {
    invalid: 'Type must be Ordinary or Pro'
  },
  password: {
    minLength: `Minimum password length must be ${MIN_NAME_LENGTH}`,
    maxLength: `Maximum password length must be ${MAX_NAME_LENGTH}`,
  },
  favotiteOffersId: {
    invalidType: 'favotiteOffersId must be array',
    invalid: 'favotiteOffersId must be Mongo Id',
  }
};
