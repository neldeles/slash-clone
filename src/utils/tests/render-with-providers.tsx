import { render } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithProviders(
  ui: React.ReactElement,
  { ...renderOptions } = {}
) {
  const testQueryClient = createTestQueryClient();

  function Wrapper({ children }: { children: React.ReactElement }) {
    return (
      <QueryClientProvider client={testQueryClient}>
        <Router>{children}</Router>
      </QueryClientProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
