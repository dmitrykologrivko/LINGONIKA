export type Card = {
  id: number;
  textFrom: string;
  textTo: string;
  languageFrom: string;
  languageTo: string;
  example?: string;
  isLearned: boolean;
  groupId?: number;
};
