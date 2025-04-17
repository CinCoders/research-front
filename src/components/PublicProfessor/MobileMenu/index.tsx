import React from 'react';
import {
  PublicProfessorContext,
  PublicProfessorContextKey,
  PublicProfessorContextValue,
} from '../../../types/PublicProfessor.d';
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
  if (!options || options.length === 0) {
    return null;
  }

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
    </div>
  );
}
