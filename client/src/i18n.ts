import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    // Common Pages' and Features' translation
    translation: {},
    errors: {
      invalidEmail: 'Invalid email',
      minLength: '{{what}} must contain at least {{length}} character(s)',
      maxLength: '{{what}} must be shorter than or equal to {{length}} character(s)',
      passwordsMatch: 'Passwords must match',
      unableToProcessRequest: 'There was an issue with your request. Please try again later',
      unknownError: 'We are sorry an unknown error occurred. Please try again later',
      invalidRequest: 'Invalid request. Please check your input',
      authenticationRequired: 'Authentication required. Please log in',
      accessDenied: 'Access denied. You don\'t have permission',
      notFound: 'Sorry, the requested resource is not found',
      serverError: 'Something went wrong on our end. Please try again later',
      networkError: 'Network error occurred. Please check your connection and try again',
    },
    apiErrors: {},
    fields: {
      username: 'Username',
      usernamePlaceholder: 'Enter email address',
      password: 'Password',
      passwordPlaceholder: 'Enter password',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: 'Enter password confirmation',
      firstName: 'First Name',
      firstNamePlaceholder: 'Enter first name',
      lastName: 'Last Name',
      lastNamePlaceholder: 'Enter last name',
      languageFrom: 'Language From',
      languageFromDefault: 'Select a language',
      languageTo: 'Language To',
      languageToDefault: 'Select a language',
    },
    actions: {
      create: 'Create',
      edit: 'Edit',
      delete: 'Delete',
      ok: 'Ok',
      cancel: 'Cancel',
      tryAgain: 'Try Again',
      goBack: 'Go Back',
      signIn: 'SignIn',
      signUp: 'SignUp',
      logout: 'Logout',
      backToHomePage: 'Back to home page',
      editProfile: 'Edit Profile',
    },
    labels: {
      all: 'all',
      of: 'of',
      preparing: 'Preparing',
      loading: 'Loading...',
      loadingMore: 'Loading more...',
      BN: 'Bengali',
      ZH: 'Chinese',
      DA: 'Danish',
      NL: 'Dutch',
      EN: 'English',
      FI: 'Finnish',
      FR: 'France',
      DE: 'German',
      EL: 'Greek',
      HU: 'Hungarian',
      HI: 'Hindi',
      IT: 'Italian',
      IN: 'Indonesian',
      JA: 'Japan',
      KK: 'Kazakh',
      KO: 'Korean',
      LA: 'Latin',
      NO: 'Norwegian',
      PL: 'Polish',
      PT: 'Portuguese',
      RU: 'Russian',
      ES: 'Spanish',
      TR: 'Turkish',
      UK: 'Ukrainian',
    },
    modals: {
      logoutTitle: 'Logout',
      logoutMessage: 'Are you sure you want to proceed logout?',
    },

    // Independent Pages' and Features' translation
    home: {
      heading: 'Your Language Learning Companion',
      description: 'Custom flashcards sorted by language and topic to make learning simple and effective.',
    },
    login: {
      heading: 'Login into account',
    },
    register: {
      heading: 'Register account',
    },
    profile: {
      heading: 'Edit Profile',
      editProfile: 'Edit Profile',
      profileSaved: 'Profile saved successfully',
    },
    dashboard: {
      heading: 'Dashboard',
      yourDictionaries: 'Your Dictionaries',
      learnedWords: 'Learned Vocabulary',
      notLearnedWords: 'Pending Vocabulary',
      totalWords: 'Total Vocabulary',
      addCard: 'Add Flashcard',
      noDictionaries: 'You haven’t created any flashcards yet!',
    },
    cards: {
      defaultHeading: 'Cards',
      allCardsHeading: '{{languageFrom}} - {{languageTo}} Cards',
      groupCardsHeading: '{{groupName}} Cards',
      noCards: 'There are no cards',
      addCard: 'Add Flashcard',
      createCardTitle: 'Create Flashcard',
      editCardTitle: 'Edit Flashcard',
      textFrom: 'Word or phrase for learning',
      textFromPlaceholder: 'Enter word or phrase for learning',
      textTo: 'Translation',
      textToPlaceholder: 'Enter translation',
      example: 'Example',
      examplePlaceholder: 'Enter example',
      allFlashCards: 'All Flashcards',
      learned: 'Learned',
      notLearned: 'Not learned',
      oneCardSelected: '1 flashcard selected',
      multipleCardsSelected: '{{count}} flashcards selected',
      oneCardDeleted: '1 flashcard deleted',
      multipleCardsDeleted: '{{count}} flashcards deleted',
    },
    groups: {
      noGroups: 'There are no groups',
      renameGroup: 'Rename Group',
      deleteGroup: 'Delete Group',
      addCardToGroup: 'Add Card to Group',
      createGroupTitle: 'Create Group',
      editGroupTitle: 'Edit Group',
      name: 'Name',
      namePlaceholder: 'Enter group name',
      deleteGroupTitle: 'Delete Group',
      deleteGroupMessage: 'Are you sure you want to delete this group?',
    },
    dictionaries: {
      heading: 'Dictionary {{languageFrom}} - {{languageTo}}',
      dictionary: '{{languageFrom}} - {{languageTo}} dictionary',
      groups: 'Groups',
      addGroup: 'Add Group',
    },
    tutor: {
      heading: 'Flashcards Tutor',
      allCards: 'All Flashcards',
      finishTutorial: 'Finish Tutorial'
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
