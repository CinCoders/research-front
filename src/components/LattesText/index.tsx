import { Button } from '@mui/material';
import { memo, useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { FormattedLattes, CopyPopup } from './style';

interface LattesTextProps {
  text: string;
}

function NotifyCopy(copyNotification: boolean) {
  if (copyNotification) {
    return (
      <>
        <CheckIcon />
        <CopyPopup>Copiado!</CopyPopup>
      </>
    );
  }
  return <ContentCopyIcon style={{ width: '60%' }} />;
}

export const LattesText = memo((props: LattesTextProps) => {
  const [copyNotification, setCopyNotification] = useState(false);

  const { text } = props;
  return (
    <FormattedLattes>
      {text}
      <Button
        onClick={() => {
          setCopyNotification(true);
          setTimeout(() => {
            setCopyNotification(false);
          }, 2000);
          navigator.clipboard.writeText(text);
        }}
        style={{
          padding: '0',
          minWidth: '30px',
          borderRadius: '100px',
        }}
      >
        {NotifyCopy(copyNotification)}
      </Button>
    </FormattedLattes>
  );
});
