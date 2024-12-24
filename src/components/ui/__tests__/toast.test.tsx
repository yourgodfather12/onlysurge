import { render, screen, waitFor } from '@/test-utils/test-utils';
import { Toast, useToast } from '../toast';

// Mock the useToast hook
jest.mock('../use-toast', () => ({
  useToast: jest.fn(),
}));

describe('Toast', () => {
  const mockToast = {
    id: '1',
    title: 'Test Toast',
    description: 'Test Description',
    type: 'default',
    duration: 5000,
  };

  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({
      toast: mockToast,
      dismiss: jest.fn(),
    });
  });

  it('renders toast with title and description', () => {
    render(<Toast {...mockToast} />);
    expect(screen.getByText('Test Toast')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders different toast types', () => {
    const types = ['default', 'success', 'error', 'warning', 'info'];
    
    types.forEach(type => {
      const { rerender } = render(<Toast {...mockToast} type={type} />);
      const toast = screen.getByRole('alert');
      
      switch (type) {
        case 'success':
          expect(toast).toHaveClass('bg-success');
          break;
        case 'error':
          expect(toast).toHaveClass('bg-destructive');
          break;
        case 'warning':
          expect(toast).toHaveClass('bg-warning');
          break;
        case 'info':
          expect(toast).toHaveClass('bg-info');
          break;
        default:
          expect(toast).toHaveClass('bg-background');
      }
      
      rerender(<></>);
    });
  });

  it('auto-dismisses after duration', async () => {
    jest.useFakeTimers();
    const dismiss = jest.fn();
    (useToast as jest.Mock).mockReturnValue({
      toast: mockToast,
      dismiss,
    });

    render(<Toast {...mockToast} />);
    
    jest.advanceTimersByTime(mockToast.duration);
    
    await waitFor(() => {
      expect(dismiss).toHaveBeenCalledWith(mockToast.id);
    });
    
    jest.useRealTimers();
  });

  it('can be dismissed manually', async () => {
    const dismiss = jest.fn();
    (useToast as jest.Mock).mockReturnValue({
      toast: mockToast,
      dismiss,
    });

    const { user } = render(<Toast {...mockToast} />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    
    await user.click(closeButton);
    expect(dismiss).toHaveBeenCalledWith(mockToast.id);
  });

  it('renders with action button', async () => {
    const action = {
      label: 'Undo',
      onClick: jest.fn(),
    };

    const { user } = render(<Toast {...mockToast} action={action} />);
    const actionButton = screen.getByText('Undo');
    
    await user.click(actionButton);
    expect(action.onClick).toHaveBeenCalled();
  });

  it('renders with custom className', () => {
    render(<Toast {...mockToast} className="custom-toast" />);
    expect(screen.getByRole('alert')).toHaveClass('custom-toast');
  });

  it('handles long content gracefully', () => {
    const longToast = {
      ...mockToast,
      title: 'A'.repeat(100),
      description: 'B'.repeat(200),
    };

    render(<Toast {...longToast} />);
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('overflow-hidden');
  });
}); 