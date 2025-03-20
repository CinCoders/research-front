export interface PublicationsDTO {
  professorId?: number;
  professorName?: string;
  year?: number;
  total: number;
  top: number;
  a1: number;
  a2: number;
  a3: number;
  a4: number;
  b1: number;
  b2: number;
  b3: number;
  b4: number;
  b5: number;
  c: number;
  noQualis: number;
}

export interface Publications {
  professorId?: number;
  professorName?: string;
  year?: number;
  total: number;
  top: number;
  a1: number;
  a2: number;
  a3: number;
  a4: number;
  b1: number;
  b2: number;
  b3: number;
  b4: number;
  b5: number;
  c: number;
  noQualis: number;
}

export interface ProfessorPublications {
  title: string;
  year: number;
  eventJournal?: string;
  isEvent: boolean;
  acronymIssn: string;
  qualis: string;
  isTop: boolean;
  authors: string;
  doi?: string;
}
