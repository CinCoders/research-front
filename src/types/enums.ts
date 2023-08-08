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
  QUALIS = '/research/qualis/',
  IMPORT_XML = '/research/import-xml',
  LATTES = 'http://lattes.cnpq.br/:id',
  PROFESSORS_LIST = '/research/professors/list',
  PROFESSOR_INFO = '/research/professor/:id',
  PROFESSOR_XML = 'http://buscatextual.cnpq.br/buscatextual/download.do?idcnpq=:id',
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
