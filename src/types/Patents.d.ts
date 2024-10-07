export interface PatentsDTO {
  professorId?: number;
  professorName?: string;
  year?: number;
  totalInventionPatents: number;
  totalUtilityModelPatents: number;
  totalDepositPatents: number;
  totalGrantPatents: number;
  totalLicensePatents: number;
  brazilianPatents: number;
  internationalPatents: number;
  total: number;
}
export interface ProfessorPatents {
  title: string;
  authors: string;
  developmentYear: number;
  country: string;
  category: string;
  patentType: string;
  registryCode: string;
}
