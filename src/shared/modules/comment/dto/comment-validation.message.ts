export const CommentValidationMessage = {
  content: {
    minLength: 'Minimum description length must be 5',
    maxLength: 'Maximum description length must be 1024',
  },
  rating: {
    invalidFormat: 'Rating must be an integer',
    minValue: 'Minimum rating must be 1',
    maxValue: 'Maximum rating must be 5',
  },
  date: {
    invalidFormat: 'Date must be a valid ISO date'
  },
  offerId: {
    invalidId: 'offerId field must be a valid id'
  },
  userId: {
    invalidId: 'userId field must be a valid id'
  }
};
