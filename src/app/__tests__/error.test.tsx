import { render, screen } from '@testing-library/react';
import GlobalError from '../error';

describe('GlobalError', () => {
  const mockError = new Error('Test global error');
  const mockReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders ErrorBoundary component with correct props', () => {
    render(<GlobalError error={mockError} reset={mockReset} />);
    
    // Check if error message is displayed
    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(screen.getByText('Test global error')).toBeInTheDocument();
    
    // Check if html and body tags are present
    const html = document.querySelector('html');
    const body = document.querySelector('body');
    expect(html).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });
}); 