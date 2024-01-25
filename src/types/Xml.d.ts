export interface ImportXmlProps {
  xmlFiles: FileList | undefined;
}

export interface XMLProps {
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

export interface ImportXmlDto {
  id: string;
  name: string;
  professor: string;
  user: string;
  status: string;
  includedAt: string;
  importTime: string | undefined;
  storedXml: boolean;
}
