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
