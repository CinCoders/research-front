export interface Professor {
  id: number;
  identifier: string;
  name: string;
}

export interface ProfessorDetails {
  professorId?: number;
  id?: number;
  professorName: string;
  identifier: string;
  artisticProductions: number;
  books: number;
  computerArticles: number;
  computerPublications: number;
  patents: number;
}
