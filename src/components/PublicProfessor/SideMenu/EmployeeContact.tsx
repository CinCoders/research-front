import { MailOutlineRounded, MeetingRoomOutlined, PhoneOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

interface EmployeeContactProps {
  email?: string;
  phone?: string;
  room?: string;
}

export default function EmployeeContact({ email, phone, room }: EmployeeContactProps) {
  return (
    <Box
      display='flex'
      flexDirection={{ xs: 'row', md: 'column' }}
      flexWrap='wrap'
      gap={1}
      justifyContent='start'
      alignItems='start'
      sx={{ width: '100%', marginTop: '0.5rem' }}
    >
      <Box hidden={!email} display='flex' gap={1} alignItems='center'>
        <MailOutlineRounded fontSize='small' color='action' />
        <Typography variant='subtitle2' color='gray'>
          {email}
        </Typography>
      </Box>
      <Box hidden={!phone} display='flex' gap={1} alignItems='center'>
        <PhoneOutlined fontSize='small' color='action' />
        <Typography variant='subtitle2' color='gray'>
          {phone}
        </Typography>
      </Box>
      <Box hidden={!room} display='flex' gap={1} alignItems='center'>
        <MeetingRoomOutlined fontSize='small' color='action' />
        <Typography variant='subtitle2' color='gray'>
          {room}
        </Typography>
      </Box>
    </Box>
  );
}

EmployeeContact.defaultProps = {
  email: '',
  phone: '',
  room: '',
};
