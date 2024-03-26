import { Box, Divider, Grid, Stack } from '@mui/material';
import { JhApp, JhService, JhServiceFull } from '@src/types/jupyterhub';
import { UserState } from '@src/types/user';
import axios from '@src/utils/axios';
import {
  DEFAULT_PINNED_APPS,
  DEFAULT_PINNED_SERVICES,
} from '@src/utils/constants';
import { getAppStatus, getApps, getServices } from '@src/utils/jupyterhub';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  currentNotification,
  currentUser as defaultUser,
} from '../../../store';
import { Item } from '../../../styles/styled-item';
import { ServiceGrid } from './service-grid/service-grid';

export const ServicesSection = (): React.ReactElement => {
  const [currentUser] = useRecoilState<UserState | undefined>(defaultUser);
  const [, setCurrentNotification] = useRecoilState<string | undefined>(
    currentNotification,
  );
  const [apps, setApps] = useState<JhApp[]>([]);
  const [services, setServices] = useState<JhService[]>([]);

  const {
    isLoading: isLoadingApps,
    error: appsError,
    data: appsData,
  } = useQuery<UserState, { message: string }>({
    queryKey: ['app-state'],
    queryFn: () =>
      axios
        .get(`/server/`)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          return data;
        }),
    enabled: !!currentUser,
  });

  const {
    isLoading: isLoadingServices,
    error: servicesError,
    data: servicesData,
  } = useQuery<JhServiceFull[], { message: string }>({
    queryKey: ['service-data'],
    queryFn: () =>
      axios
        .get('/services/')
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          return data;
        }),
    enabled: !!currentUser,
  });

  useEffect(() => {
    if (!isLoadingApps && appsData && currentUser) {
      const appsWithStatus = getApps(appsData, 'mine', currentUser?.name ?? '')
        .filter((app) => DEFAULT_PINNED_SERVICES.includes(app.name))
        .map((app) => ({
          ...app,
          status: getAppStatus(app), // Compute and assign the status here
        }));

      if (appsWithStatus.length > 0) {
        const defaultApp = appsWithStatus[0];
        appsWithStatus.push({
          ...defaultApp,
          id: `${defaultApp.id}-vscode`,
          name: 'VSCode',
          description:
            defaultApp.description?.replace('JupyterLab', 'VSCode') || '',
          url: `${defaultApp.url}/vscode`,
        });
      }
      setApps(appsWithStatus);
    }
  }, [isLoadingApps, appsData, currentUser]);

  useEffect(() => {
    if (!isLoadingServices && servicesData && currentUser) {
      const appServices = getServices(servicesData, currentUser.name).filter(
        (service) =>
          DEFAULT_PINNED_SERVICES.includes(service.name) &&
          !DEFAULT_PINNED_APPS.includes(service.name), // Do not show the services that are already shown as apps
      );

      if (appServices.length > 0) {
        const defaultService = appServices[0];
        defaultService.description =
          'This is conda-store, your environments manager.';
      }
      setServices(appServices);
    }
  }, [isLoadingServices, servicesData, currentUser]);

  useEffect(() => {
    if (servicesError) {
      setCurrentNotification(servicesError.message);
    } else if (appsError) {
      setCurrentNotification(appsError.message);
    } else {
      setCurrentNotification(undefined);
    }
  }, [servicesError, appsError, setCurrentNotification]);

  return (
    <Box>
      <Stack>
        <Item>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Item>
                <h2>Services</h2>
              </Item>
            </Grid>
          </Grid>
        </Item>
        <Item sx={{ pt: '16px', pb: '24px' }}>
          <Divider />
        </Item>
        <Item>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'flex-start',
              paddingBottom: '48px',
            }}
          >
            {isLoadingServices ? (
              <div className="font-bold">Loading...</div>
            ) : services.length > 0 ? (
              // Wrap the code block inside curly braces and return the JSX elements explicitly
              <ServiceGrid apps={apps} services={services} />
            ) : (
              <div>No services available</div>
            )}
          </Box>
        </Item>
      </Stack>
    </Box>
  );
};
