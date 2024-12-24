import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../error-boundary';

describe('ErrorBoundary', () => {
  const mockError = new Error('Test error message');
  const mockReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders error message', () => {
    render(<ErrorBoundary error={mockError} reset={mockReset} />);
    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('calls reset function when try again button is clicked', () => {
    render(<ErrorBoundary error={mockError} reset={mockReset} />);
    const button = screen.getByText('Try again');
    fireEvent.click(button);
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('logs error to console', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    render(<ErrorBoundary error={mockError} reset={mockReset} />);
    expect(consoleSpy).toHaveBeenCalledWith('Error:', mockError);
    consoleSpy.mockRestore();
  });
}); 