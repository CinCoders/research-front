import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Accordion, AccordionDetails, AccordionSummary, Skeleton } from '@mui/material';
import GenericListSkeleton from '../GenericList/GenericListSkeleton';

export function AccordionSkeleton() {
  return (
    <div>
      <Accordion expanded>
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
          <Skeleton variant='text' width='40%' height={30} />
        </AccordionSummary>
        <AccordionDetails>
          <GenericListSkeleton />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
