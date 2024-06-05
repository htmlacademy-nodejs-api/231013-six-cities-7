export const UserValidationMessage = {
  email: {
    invalid: 'It must be email',
  },
  avatar: {
    invalid: 'It must be png or jpeg file',
  },
  name: {
    minLength: 'Minimum name length must be 1',
    maxLength: 'Maximum name length must be 15',
  },
  type: {
    invalid: 'Type must be Ordinary or Pro'
  },
  password: {
    minLength: 'Minimum password length must be 6',
    maxLength: 'Maximum password length must be 12',
  }
};
