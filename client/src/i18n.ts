import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      signIn: 'SignIn',
      signUp: 'SignUp',
    },
    home: {
      heading: 'Your Language Learning Companion',
      description: 'Custom flashcards sorted by language and topic to make learning simple and effective.'
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
    }
  });

export default i18n;
