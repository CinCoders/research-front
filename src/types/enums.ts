import dblp from '../assets/icons/dblp-icon.svg';
import email from '../assets/icons/email-icon.svg';
import lattes from '../assets/icons/lattes-icon.png';
import link from '../assets/icons/link-icon.svg';
import linkedin from '../assets/icons/linkedin-icon.svg';
import orcid from '../assets/icons/orcid-icon.svg';
import scholar from '../assets/icons/scholar-icon.svg';

export enum Links {
  ACCOUNT_MANAGEMENT = 'https://account.cin.ufpe.br',
  INTRANET_HOME = 'https://intranet.cin.ufpe.br/',
  HOME = '/research',
  FORBIDDEN = '/research/forbidden',
  PUBLICATIONS = '/research/publications',
  PROFESSOR_PUBLICATIONS = '/research/professors/:id/publications',
  STUDENTS = '/research/graduate-students',
  PROFESSOR_STUDENTS = '/research/professors/:id/graduate-students',
  PROJECTS = '/research/professors/research-projects',
  PROFESSOR_PROJECTS = '/research/professors/:id/research-projects',
  PATENTS = '/research/patents',
  PROFESSOR_PATENTS = '/research/professors/:id/patents',
  QUALIS = '/research/qualis/',
  IMPORT_XML = '/research/import-xml',
  LATTES = 'http://lattes.cnpq.br/:id',
  PROFESSORS_LIST = '/research/professors/list',
  PROFESSOR_INFO = '/research/professor/:id',
  PROFESSOR_XML = 'http://buscatextual.cnpq.br/buscatextual/download.do?idcnpq=:id',
  PUBLIC_PROFESSOR_PUBLICATIONS = '/research/public-professor/:alias',
  PUBLIC_PROFESSOR_PROJECTS = '/research/public-professor/:alias/projects',
  PUBLIC_PROFESSOR_SUPERVISIONS = '/research/public-professor/:alias/supervisions',
  PUBLIC_PROFESSOR_PATENTS = '/research/public-professor/:alias/patents',
  PUBLIC_PROFESSOR_LINKS = '/research/public-professor/:alias/links',
}

export enum Roles {
  USERS = 'sys_dashpesq-users',
  ADMIN = 'sys_dashpesq-admin',
}

export enum Status {
  PROGRESS = 'In Progress',
  PENDING = 'Pending',
  CONCLUDED = 'Concluded',
  NOT_IMPORTED = 'Not Imported',
}

export enum CommonLinkTypes {
  ORCID = 'ORCID',
  DBLP = 'DBLP',
  SCHOLAR = 'SCHOLAR',
  LINKEDIN = 'LINKEDIN',
  LATTES = 'LATTES',
  EMAIL = 'EMAIL',
  WEBSITE = 'WEBSITE',
}

export const LinksIcons: Record<CommonLinkTypes, string> = {
  [CommonLinkTypes.ORCID]: orcid,
  [CommonLinkTypes.EMAIL]: email,
  [CommonLinkTypes.WEBSITE]: link,
  [CommonLinkTypes.DBLP]: dblp,
  [CommonLinkTypes.SCHOLAR]: scholar,
  [CommonLinkTypes.LINKEDIN]: linkedin,
  [CommonLinkTypes.LATTES]: lattes,
} as const;

export const RomanNumbers = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
} as const;

export const RolesLevels = {
  DIRETOR: 3,
  CHEFE: 2,
  COORDENADOR: 1,
} as const;
