import { Box, Link, Typography } from '@mui/material';
import { ProfessorPublications } from '../../../types/Publications.d';

export default function PublicationItem({
  acronymIssn,
  authors,
  title,
  year,
  doi,
  eventJournal,
  isEvent,
}: ProfessorPublications) {
  return (
    <Box width='100%' display='flex' flexDirection='column'>
      <Typography variant='subtitle2' textAlign='start'>
        {year}
      </Typography>
      <Link
        href={`https://doi.org/${doi}`}
        target='_blank'
        aria-label='Acessar publicação na íntegra'
        variant='h6'
        sx={{
          color: 'black',
          textDecoration: 'underline',
          textDecorationColor: 'black',
          '&:hover': { textDecorationColor: '#d20000' },
        }}
      >
        {title}
      </Link>
      <Typography variant='overline'>{authors}</Typography>
      <Box>
        {isEvent && acronymIssn && <Typography variant='overline'>{`[${acronymIssn}] `}</Typography>}
        <Typography variant='overline'>{eventJournal}</Typography>
      </Box>
    </Box>
  );
}
