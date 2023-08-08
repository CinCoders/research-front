import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { memo, useEffect, useRef, useState } from 'react';
import Grow from '@mui/material/Grow';

interface GridCellExpandProps {
  value: string;
  width: number;
}

function isOverflown(element: Element | null): boolean {
  if (!element) {
    return false;
  }
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

const GridCellExpand = memo((props: GridCellExpandProps) => {
  const { width, value } = props;
  const wrapper = useRef<HTMLDivElement | null>(null);
  const cellDiv = useRef(null);
  const cellValue = useRef(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showFullCell, setShowFullCell] = useState(false);
  const [showPopper, setShowPopper] = useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent: KeyboardEvent) {
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <Box
      ref={wrapper}
      onMouseOver={handleMouseEnter}
      onMouseOut={handleMouseLeave}
      sx={{
        alignItems: 'center',
        lineHeight: '24px',
        width: 1,
        height: 1,
        position: 'relative',
        display: 'flex',
        padding: 0,
      }}
    >
      <div
        ref={cellDiv}
        style={{
          height: 1,
          width,
          display: 'block',
          position: 'absolute',
          top: -1,
          left: -10,
        }}
      />
      <Box
        ref={cellValue}
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {value}
      </Box>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          sx={{
            display: 'flex',
            zIndex: '1000',
            width: { width },
            marginLeft: -17,
          }}
          transition
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} timeout={{ enter: 450, exit: 10 }}>
              <Paper
                elevation={1}
                style={{
                  minHeight: wrapper.current ? wrapper.current.offsetHeight - 3 : 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  boxShadow: '2px 2px 3px 2px rgba(0, 0, 0, 0.1)',
                  borderRadius: '0.3rem',
                }}
              >
                <Typography variant='body2' style={{ padding: 8 }}>
                  {value}
                </Typography>
              </Paper>
            </Grow>
          )}
        </Popper>
      )}
    </Box>
  );
});

export function renderCellExpand(params: GridRenderCellParams<string>) {
  return <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />;
}
