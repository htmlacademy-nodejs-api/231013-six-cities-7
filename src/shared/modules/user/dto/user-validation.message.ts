export const UserValidationMessage = {
  email: {
    invalid: 'It must be email',
  },
  avatar: {
    maxLength: 'Too long for field «image»',
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
