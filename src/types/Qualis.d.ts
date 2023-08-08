export interface ConferencesQualis {
  id: number;
  acronym?: string;
  name?: string;
  qualis?: string;
  isTop?: boolean;
  official?: boolean;
  derivedFrom?: ConferencesQualis | null;
}

export interface JournalQualis {
  id: number;
  name?: string;
  issn?: string;
  qualis?: string;
  isTop?: boolean;
  official?: boolean;
  derivedFrom?: JournalQualis | null;
}

export interface QualisTypeDTO
  extends Omit<ConferencesQualis, 'derivedFrom' | 'id'>,
    Omit<JournalQualis, 'derivedFrom' | 'id'> {
  derivedFromId?: number | null;
}

export const qualisValuesList = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'B5', 'C', '', null, undefined];

export const checkValue = (value: string | undefined | null | number) =>
  value !== undefined && value !== null && typeof value === 'string' && value !== '';
