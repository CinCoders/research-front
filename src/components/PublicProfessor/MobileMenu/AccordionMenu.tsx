import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Fade } from '@mui/material';
import Accordion, { AccordionSlots } from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import React from 'react';
import GenericList, { GenericListProps } from '../GenericList/GenericList';

interface AccordionMenuProps<T> extends GenericListProps<T> {
  title: string;
  defaultExpanded: boolean | undefined;
}

export default function AccordionMenu<T>({ title, defaultExpanded, data, Card }: AccordionMenuProps<T>) {
  const [expanded, setExpanded] = React.useState(defaultExpanded ?? false);

  console.log('defaultExpanded', defaultExpanded);

  const handleExpansion = () => {
    setExpanded(prevExpanded => !prevExpanded);
  };

  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        slots={{ transition: Fade as AccordionSlots['transition'] }}
        slotProps={{ transition: { timeout: 600, unmountOnExit: true } }}
        sx={{
          '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
          '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none', minHeight: 0 },
          minHeight: '0px',
        }}
        elevation={0}
      >
        <AccordionSummary
          sx={{
            borderRadius: '0px',
            borderLeft: '2px solid red',
            paddingY: 'none',
            margin: 'none',
            minHeight: '0px',
          }}
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel2-content'
          id='panel2-header'
        >
          <Typography variant='subtitle1' fontWeight={500}>
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GenericList data={data} Card={Card} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
