import { Alert, Autocomplete, Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

interface AppSharingProps {
  id?: string;
}

export const AppSharing = ({ id }: AppSharingProps): React.ReactElement => {
  const [message, setMessage] = useState('Some message');
  useEffect(() => {
    if (id) {
      setMessage(`You are sharing the app with id: ${id}`);
    }
  }, [id]);

  return (
    <div>
      <Alert id="sharing-notification" severity="warning" sx={{ mb: '16px' }}>
        {message}
      </Alert>
      <p>Individuals and group access</p>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          gap: '8px',
          pb: '16px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[]}
            sx={{ width: 470 }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search one or more emails, usernames, or group names"
              />
            )}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Button variant="contained" color="primary">
            Share
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default AppSharing;
