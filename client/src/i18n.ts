import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      signIn: 'SignIn',
      signUp: 'SignUp',
    },
    errors: {
      invalidEmail: 'Invalid email',
      minLength: '{{what}} must contain at least {{length}} character(s)',
      maxLength: '{{what}} must be shorter than or equal to {{length}} character(s)',
      passwordsMatch: 'Passwords must match',
      unauthorizedAccess: 'User must be unauthorized',
    },
    apiErrors: {},
    fields: {
      username: 'Username',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      firstName: 'First Name',
      lastName: 'Last Name',
      usernamePlaceholder: 'Enter email address',
      passwordPlaceholder: 'Enter password',
      confirmPasswordPlaceholder: 'Enter password confirmation',
      firstNamePlaceholder: 'Enter first name',
      lastNamePlaceholder: 'Enter last name',
    },
    labels: {
      backToHomePage: 'Back to home page',
    },
    modals: {
      logoutTitle: 'Logout',
      logoutMessage: 'Are you sure you want to proceed logout?',
    },

    // Pages
    home: {
      heading: 'Your Language Learning Companion',
      description: 'Custom flashcards sorted by language and topic to make learning simple and effective.',
    },
    login: {
      heading: 'Login into account',
    },
    register: {
      heading: 'Register account',
    }
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    parseMissingKeyHandler: () => {
      return null;
    }
  });

export default i18n;
