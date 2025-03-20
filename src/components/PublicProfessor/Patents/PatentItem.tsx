import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { ProfessorPatents } from '../../../types/Patents.d';

function AttributeValueDisplay({ attribute, value }: { attribute: string; value: string }) {
  return (
    <Box width='100%' display='flex' alignItems='center' gap={1}>
      <Typography variant='subtitle1' fontSize='0.875rem'>{`${attribute}:`}</Typography>
      <Typography variant='subtitle2' fontSize='0.875rem'>
        {value}
      </Typography>
    </Box>
  );
}

export default function PatentItem({
  authors,
  category,
  country,
  developmentYear,
  patentType,
  registryCode,
  title,
}: ProfessorPatents) {
  return (
    <Box width='100%' display='flex' flexDirection='column' gap={1}>
      <Typography variant='subtitle2'>{developmentYear}</Typography>
      <Typography variant='h6'>{title}</Typography>
      <Typography variant='overline' fontSize='0.75rem'>
        {authors}
      </Typography>
      <Grid container spacing={4}>
        <Grid xs={6}>
          <AttributeValueDisplay attribute='País' value={country} />
          <AttributeValueDisplay attribute='Tipo' value={patentType} />
        </Grid>
        <Grid xs={6}>
          <AttributeValueDisplay attribute='Categoria' value={category} />
          <AttributeValueDisplay attribute='Registro' value={registryCode} />
        </Grid>
      </Grid>
    </Box>
  );
}
