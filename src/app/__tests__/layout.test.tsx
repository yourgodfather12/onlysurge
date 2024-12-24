import { render } from '@testing-library/react';
import RootLayout from '../layout';

jest.mock('@/lib/platform-context', () => ({
  PlatformProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('RootLayout', () => {
  it('renders children within the layout', () => {
    const { container } = render(
      <RootLayout>
        <div data-testid="test-child">Test Content</div>
      </RootLayout>
    );

    // Check if html and body tags are present
    expect(container.querySelector('html')).toBeInTheDocument();
    expect(container.querySelector('body')).toBeInTheDocument();

    // Check if the child content is rendered
    expect(container.querySelector('[data-testid="test-child"]')).toBeInTheDocument();
  });

  it('includes Inter font class', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    const body = container.querySelector('body');
    expect(body?.className).toContain('inter');
  });
}); 