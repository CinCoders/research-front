export interface ProjectsDTO {
  professorId?: number;
  professorName?: string;
  year?: number;
  total: number;
  cnpqProjects: number;
  facepeProjects: number;
  capesProjects: number;
  concludedProjects: number;
  projectsInProgress: number;
  noFinancier: number;
  anotherFinancier: number;
}

export interface Projects {
  professorId?: number;
  professorName?: string;
  year?: number;
  total: number;
  cnpqProjects: number;
  facepeProjects: number;
  capesProjects: number;
  concludedProjects: number;
  projectsInProgress: number;
  noFinancier: number;
  anotherFinancier: number;
}

export interface ProfessorProjects {
  id: number;
  name: string;
  year: number;
  inProgress: boolean;
  cnpqProject: boolean;
  facepeProject: boolean;
  capesProject: boolean;
  anotherFinanciers: boolean;
}
