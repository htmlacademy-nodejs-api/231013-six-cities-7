import {
  MIN_RATING,
  MAX_RATING,
  MIN_COMMENT_CONTENT_LENGTH,
  MAX_COMMENT_CONTENT_LENGTH
} from '../../../constants/constants.js';

export const CommentValidationMessage = {
  content: {
    minLength: `Minimum description length must be ${MIN_COMMENT_CONTENT_LENGTH}`,
    maxLength: `Maximum description length must be ${MAX_COMMENT_CONTENT_LENGTH}`,
  },
  rating: {
    invalidFormat: 'Rating must be an integer',
    minValue: `Minimum rating must be ${MIN_RATING}`,
    maxValue: `Maximum rating must be ${MAX_RATING}`,
  },
  date: {
    invalidFormat: 'Date must be a valid ISO date'
  },
};
