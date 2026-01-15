import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ServiceContainer } from '@/container';
import { createServices } from '@/services/factory';
import { Services } from '@/services/factory';

// Create a new QueryClient for each test
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

interface AllTheProvidersProps {
  children: React.ReactNode;
  services?: Services;
}

const AllTheProviders = ({ children, services }: AllTheProvidersProps) => {
  const queryClient = createTestQueryClient();
  const testServices =
    services || createServices({ apiBaseUrl: 'http://localhost:8000', useMocks: true });

  return (
    <ServiceContainer services={testServices}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ServiceContainer>
  );
};

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  services?: Services;
}

const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  const { services, ...renderOptions } = options || {};
  return render(ui, {
    wrapper: (props) => <AllTheProviders {...props} services={services} />,
    ...renderOptions,
  });
};

export * from '@testing-library/react';
export { customRender as render };
