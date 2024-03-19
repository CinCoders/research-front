export interface PatentsDTO {
  id: number;
  professorId?: number;
  professorName?: string;
  title: string;
  authors: string;
  year: number;
  country: string;
  category: string;
  patentType: string;
  registryCode: string;
  total: number;
}
export interface Patents {
  id: number;
  professorId?: number;
  professorName?: string;
  title: string;
  authors: string;
  year: number;
  country: string;
  category: string;
  patentType: string;
  registryCode: string;
  total: number;
}
