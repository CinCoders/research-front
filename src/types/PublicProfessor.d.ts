import React from 'react';
import PatentItem from '../components/PublicProfessor/Patents/PatentItem';
import ProjectItem from '../components/PublicProfessor/Projects/ProjectItem';
import PublicationItem from '../components/PublicProfessor/Publications/PublicationItem';
import SupervisionItem from '../components/PublicProfessor/Supervisions/SupervisionItem';
import { Links } from './enums';
import { ProfessorPatents } from './Patents.d';
import { ProfessorProjects } from './Projects.d';
import { ProfessorPublications } from './Publications.d';
import { ProfessorStudents } from './Students.d';

export type PublicProfessorContext = {
  publications: ProfessorPublications[] | null;
  projects: ProfessorProjects[] | null;
  patents: ProfessorPatents[] | null;
  supervisions: ProfessorStudents[] | null;
};

export type PublicProfessorContextKey = keyof PublicProfessorContext;
export type PublicProfessorContextValue<K extends PublicProfessorContextKey> = PublicProfessorContext[K] extends Array<
  infer T
>
  ? T
  : never;

export interface ProfessorListProps<K extends PublicProfessorContextKey> {
  title: string;
  href: Links;
  isVisible: boolean;
  isLoading: boolean;
  component: React.ComponentType<PublicProfessorContextValue<K>>;
  dataType: K;
}

export function getMenuOptions<K extends PublicProfessorContextKey>({
  patents,
  projects,
  publications,
  supervisions,
}: PublicProfessorContext): ProfessorListProps<K>[] {
  return [
    {
      href: Links.PUBLIC_PROFESSOR_PUBLICATIONS,
      title: 'Publicações',
      isVisible: !!publications && publications.length > 0,
      isLoading: publications == null,
      component: PublicationItem,
      dataType: 'publications',
    },
    {
      href: Links.PUBLIC_PROFESSOR_PROJECTS,
      title: 'Projetos',
      isVisible: !!projects && projects.length > 0,
      isLoading: projects == null,
      component: ProjectItem,
      dataType: 'projects',
    },
    {
      href: Links.PUBLIC_PROFESSOR_PATENTS,
      title: 'Patentes',
      isVisible: !!patents && patents.length > 0,
      isLoading: patents == null,
      component: PatentItem,
      dataType: 'patents',
    },
    {
      href: Links.PUBLIC_PROFESSOR_SUPERVISIONS,
      title: 'Orientações Acadêmicas',
      isVisible: !!supervisions && supervisions.length > 0,
      isLoading: supervisions == null,
      component: SupervisionItem,
      dataType: 'supervisions',
    },
  ];
}
