import React, { useEffect, useState } from 'react';
import {
  PublicProfessorContext,
  PublicProfessorContextKey,
  PublicProfessorContextValue,
} from '../../../types/PublicProfessor.d';
import StateContainer from '../../share/StateContainer';
import AccordionMenu from './AccordionMenu';
import { AccordionSkeleton } from './AccordionSkeleton';

interface MobileMenuProps<K extends PublicProfessorContextKey> {
  data: PublicProfessorContext;
  options: {
    title: string;
    dataType: K;
    Card: React.ComponentType<PublicProfessorContextValue<K>>;
  }[];
}

export default function MobileMenu<K extends PublicProfessorContextKey>({ options, data }: MobileMenuProps<K>) {
  const [totalContributions, setTotalContributions] = useState<number | undefined>(undefined);

  useEffect(() => {
    const values = Object.values(data);

    if (!values.some(v => !Array.isArray(v))) {
      const total = values.reduce((acc, curr) => acc + (Array.isArray(curr) ? curr.length : 0), 0);
      setTotalContributions(total);
    }
  }, [data]);

  return (
    <div>
      {data.isLoading ? (
        <AccordionSkeleton />
      ) : (
        options.map((option, idx) => (
          <AccordionMenu
            key={option.dataType}
            title={option.title}
            data={(data[option.dataType] ?? null) as PublicProfessorContextValue<K>[] | null}
            Card={option.Card as React.ComponentType<PublicProfessorContextValue<K>>}
            isLoading={data.isLoading}
            isError={data.isError}
            defaultExpanded={idx === 0}
          />
        ))
      )}

      {totalContributions === 0 && <StateContainer message='Nenhuma contribuição encontrada' />}
    </div>
  );
}
