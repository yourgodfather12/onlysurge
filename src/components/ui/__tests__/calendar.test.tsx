import { render, screen, waitFor } from '@/test-utils/test-utils';
import { Calendar } from '../calendar';

describe('Calendar', () => {
  const defaultProps = {
    mode: 'single',
    selected: new Date('2024-01-01'),
    onSelect: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders calendar with selected date', () => {
    render(<Calendar {...defaultProps} />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
    expect(screen.getByText('January 2024')).toBeInTheDocument();
  });

  it('handles date selection', async () => {
    const { user } = render(<Calendar {...defaultProps} />);
    
    // Find and click a date button (e.g., the 15th)
    const dateButton = screen.getByRole('button', { name: /15/ });
    await user.click(dateButton);
    
    expect(defaultProps.onSelect).toHaveBeenCalled();
  });

  it('navigates between months', async () => {
    const { user } = render(<Calendar {...defaultProps} />);
    
    // Click next month button
    const nextButton = screen.getByRole('button', { name: /next month/i });
    await user.click(nextButton);
    
    expect(screen.getByText('February 2024')).toBeInTheDocument();
    
    // Click previous month button
    const prevButton = screen.getByRole('button', { name: /previous month/i });
    await user.click(prevButton);
    
    expect(screen.getByText('January 2024')).toBeInTheDocument();
  });

  it('renders in range selection mode', () => {
    const from = new Date('2024-01-01');
    const to = new Date('2024-01-05');
    
    render(
      <Calendar
        mode="range"
        selected={{ from, to }}
        onSelect={defaultProps.onSelect}
      />
    );
    
    // Check if dates within range have the selected style
    const dateButtons = screen.getAllByRole('button');
    const selectedDates = dateButtons.filter(button => 
      button.classList.contains('bg-primary')
    );
    expect(selectedDates.length).toBeGreaterThan(0);
  });

  it('handles disabled dates', () => {
    const disabledDays = [new Date('2024-01-15')];
    
    render(
      <Calendar
        {...defaultProps}
        disabled={disabledDays}
      />
    );
    
    const disabledButton = screen.getByRole('button', { name: /15/ });
    expect(disabledButton).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Calendar {...defaultProps} className="custom-calendar" />);
    const calendar = screen.getByRole('grid').parentElement;
    expect(calendar).toHaveClass('custom-calendar');
  });

  it('shows today indicator', () => {
    render(<Calendar {...defaultProps} showToday />);
    const today = new Date().getDate().toString();
    const todayButton = screen.getByRole('button', { name: new RegExp(today) });
    expect(todayButton).toHaveClass('bg-accent');
  });
}); 