interface Position {
  id: number;
  name: string;
  order: number;
  category: string;
}

interface ResearchArea {
  id: number;
  name: string;
}

interface Role {
  id: number;
  name: string;
}

interface EmployeeRoles {
  description: string;
  employeeId: number;
  gratificantionCode: string;
  role: Role;
  roleId: number;
}

export interface ProfessorHrResponse {
  id: number;
  name: string;
  sector: string;
  imageUrl: string;
  info: string;
  email: string;
  phone: string;
  fax: string;
  room: string;
  website: string;
  lattes: string;
  lattesCode: string;
  siape: string;
  status: string;
  workRegime: string;
  position: Position;
  researchAreas: ResearchArea[];
  employeeRoles: EmployeeRoles[];
}

export interface ProfessorHr {
  id: number;
  name: string;
  imageUrl?: string;
  email: string;
  phone: string;
  fax: string;
  room: string;
  website?: string;
  lattes: string;
  status: string;
  workRegime: string;
  positionName: string;
  researchAreasName: string[];
  rolesDescription: string[];
}
