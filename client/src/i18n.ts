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
    },
    apiErrors: {

    },
    fields: {
      username: 'Username',
      password: 'Password',
      usernamePlaceholder: 'Enter email address',
      passwordPlaceholder: 'Enter password',
    },
    home: {
      heading: 'Your LanguageType Learning Companion',
      description: 'Custom flashcards sorted by language and topic to make learning simple and effective.',
    },
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
