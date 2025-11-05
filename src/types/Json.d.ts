export interface ImportJsonProps {
  jsonFile: File | undefined;
}

export interface JSONProps {
  id: number;
  name: string;
  size: string | number;
}

export interface Pagination<Type> {
  totalElements: number;
  page: number;
  limit: number;
  data: Type;
}

export interface ImportJsonDto {
  id: string;
  name: string;
  professor: string;
  user: string;
  status: string;
  includedAt: string;
  importTime: string | undefined;
  storedJson: boolean;
}
