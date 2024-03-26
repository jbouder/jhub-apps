import { JhApp, JhService } from '@src/types/jupyterhub';
import React from 'react';
import AppCard from 'src/components/app-card/app-card';

interface ServiceGridProps {
  apps: JhApp[];
  services: JhService[];
}

export const ServiceGrid = ({
  apps,
  services,
}: ServiceGridProps): React.ReactElement => {
  return (
    <>
      {apps.map((app: JhApp) => (
        <AppCard
          id={app.id}
          key={`app-${app.id}`}
          title={app.name}
          description={app.description}
          //   thumbnail={app.thumbnail}
          framework={app.framework}
          url={app.url}
          ready={app.ready}
          serverStatus={app.status}
          username={app.username}
          isPublic={app.public}
          isShared={app.shared}
          isApp={false}
        />
      ))}
      {services.map((service, index) => (
        <AppCard
          id={`service-${index}`}
          key={`service-${index}`}
          title={service.name}
          description={service.description}
          framework=""
          url={service.url}
          serverStatus="ready"
          username=""
          isApp={false}
        />
      ))}
    </>
  );
};
