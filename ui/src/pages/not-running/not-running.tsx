import { Box, Button, Stack } from '@mui/material';
import { AppQueryGetProps } from '@src/types/api';
import { UserState } from '@src/types/user';
import axios from '@src/utils/axios';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { currentUser as defaultUser } from '../../store';

export const NotRunning = (): React.ReactElement => {
  const [id, setId] = React.useState<string | null>(null);
  const [currentUser] = useRecoilState<UserState | undefined>(defaultUser);
  const { data: formData } = useQuery<AppQueryGetProps, { message: string }>({
    queryKey: ['app-form', id],
    queryFn: () =>
      axios.get(`/server/${id}`).then((response) => {
        return response.data;
      }),
    enabled: !!id,
  });

  useEffect(() => {
    if (currentUser) {
      const currentId = window.location.pathname.split('/').pop();
      // If the currentId is 'lab', using base jupyterlab url
      if (currentId === 'lab') {
        setId('');
      } else {
        setId(currentId ?? null);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    console.log(formData);
    if (formData?.started) {
      window.location.assign(window.location.href.replace('/hub', ''));
    }
  }, [formData]);

  return (
    <Stack>
      <Box sx={{ margin: 'auto auto' }}>
        <h1>Server not running</h1>
      </Box>
      <Box sx={{ margin: 'auto auto', pb: '20px' }}>
        <p>Your server is not running. Would you like to start it?</p>
      </Box>
      <Box sx={{ margin: 'auto auto' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            const username = currentUser?.name;
            if (username) {
              const currentUrl = window.location.pathname;
              window.location.assign(
                (window.location.href = `/hub/spawn/${username}?next=${encodeURIComponent(currentUrl)}`),
              );
            }
          }}
        >
          Start Server
        </Button>
      </Box>
    </Stack>
  );
};
