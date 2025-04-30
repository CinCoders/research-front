import { Box, Chip, Skeleton } from '@mui/material';

interface ResearchAreasProps {
  researchAreas: string[] | undefined;
  isLoading: boolean;
}

function ResearchAreasSkeleton() {
  return (
    <>
      {[1, 2].map(v => (
        <Skeleton
          key={v}
          variant='rectangular'
          width={`${v * 40}%`}
          height={20}
          sx={{ borderRadius: '16px', marginY: '2px' }}
        />
      ))}
    </>
  );
}

export default function ResearchAreas({ researchAreas, isLoading }: ResearchAreasProps) {
  return (
    <Box display='flex' flexWrap='wrap' gap={1} sx={{ width: '100%' }}>
      {isLoading ? (
        <ResearchAreasSkeleton />
      ) : (
        researchAreas?.map(area => (
          <Chip
            key={area}
            label={area}
            size='small'
            sx={{
              color: 'black',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: '0.575rem',
              '& .MuiChip-label': {
                paddingY: '2px',
                paddingX: '6px',
              },
            }}
          />
        ))
      )}
    </Box>
  );
}
