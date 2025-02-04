export type Card = {
  id: number;
  textFrom: string;
  textTo: string;
  languageFrom: string;
  languageTo: string;
  example?: string | null;
  isLearned?: boolean;
  groupId?: number | null;
  group?: {
    id: number;
    name: string;
  } | null;
};
