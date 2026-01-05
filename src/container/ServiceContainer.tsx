'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { createServices, type Services } from '@/services/factory';

const ServiceContext = createContext<Services | null>(null);

export function ServiceContainer({
  children,
  services,
}: {
  children: ReactNode;
  services?: Services;
}) {
  const defaultServices =
    services ||
    createServices({
      apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
      useMocks: process.env.NEXT_PUBLIC_ENABLE_MOCK_SERVICES === 'true',
    });

  return <ServiceContext.Provider value={defaultServices}>{children}</ServiceContext.Provider>;
}

export function useServices(): Services {
  const services = useContext(ServiceContext);
  if (!services) {
    throw new Error('useServices must be used within ServiceContainer');
  }
  return services;
}
