import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockSupabaseClient } from './supabase-mock';

// Create a custom render function that includes providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
  initialState?: Record<string, any>;
}

// Mock providers setup
const mockProviders = {
  supabase: mockSupabaseClient,
  // Add other providers as needed
};

// Provider wrapper component
const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

// Custom render function
const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { route, initialState, ...renderOptions } = options;

  // Set up any route-specific mocking
  if (route) {
    window.history.pushState({}, 'Test page', route);
  }

  return {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: AllTheProviders,
      ...renderOptions,
    }),
  };
};

// Helper function to wait for loading states
const waitForLoadingToFinish = () =>
  new Promise((resolve) => setTimeout(resolve, 0));

// Helper to simulate window resize
const resizeWindow = (width: number, height: number) => {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event('resize'));
};

// Helper to mock intersection observer entries
const mockIntersectionObserverEntry = (isIntersecting: boolean) => ({
  isIntersecting,
  boundingClientRect: { top: 0, bottom: 0 },
  intersectionRatio: isIntersecting ? 1 : 0,
  intersectionRect: { top: 0, bottom: 0 },
  rootBounds: { top: 0, bottom: 0 },
  target: document.createElement('div'),
  time: Date.now(),
});

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
export {
  mockProviders,
  waitForLoadingToFinish,
  resizeWindow,
  mockIntersectionObserverEntry,
}; 