import React from 'react';
import {
  PublicProfessorContext,
  PublicProfessorContextKey,
  PublicProfessorContextValue,
} from '../../../types/PublicProfessor.d';
import StateContainer from '../../share/StateContainer';
import AccordionMenu from './AccordionMenu';

interface MobileMenuProps<K extends PublicProfessorContextKey> {
  data: PublicProfessorContext;
  options: {
    title: string;
    dataType: K;
    Card: React.ComponentType<PublicProfessorContextValue<K>>;
  }[];
}

export default function MobileMenu<K extends PublicProfessorContextKey>({ options, data }: MobileMenuProps<K>) {
  const totalContributions = Object.values(data).reduce((acc, curr) => acc + (curr?.length || 0), 0);

  return (
    <div>
      {options.map((option, idx) => (
        <AccordionMenu
          key={option.dataType}
          title={option.title}
          data={(data[option.dataType] ?? null) as PublicProfessorContextValue<K>[] | null}
          Card={option.Card as React.ComponentType<PublicProfessorContextValue<K>>}
          defaultExpanded={idx === 0}
        />
      ))}

      {totalContributions === 0 && <StateContainer message='Nenhuma contribuição encontrada' />}
    </div>
  );
}
