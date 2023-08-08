export interface Students {
  professorId: number;
  professorName?: string;
  year: number | string | null;
  total?: number;
  undergradResearchAdvisor: number;
  postdocAdvisor: number;
  mastersMainAdvisor: number;
  phdMainAdvisor: number;
  mastersCoAdvisor: number;
  phdCoAdvisor: number;
}

export interface ProfessorStudents {
  name: string;
  degree: string;
  type: string;
  yearStart?: number;
  yearEnd?: number;
}
