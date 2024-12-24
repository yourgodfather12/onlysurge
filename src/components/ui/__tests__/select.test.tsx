import { render, screen, within } from '@/test-utils/test-utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';

describe('Select', () => {
  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
  ];

  const BasicSelect = () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  it('renders select with placeholder', () => {
    render(<BasicSelect />);
    expect(screen.getByText('Select a fruit')).toBeInTheDocument();
  });

  it('opens dropdown on click', async () => {
    const { user } = render(<BasicSelect />);
    const trigger = screen.getByRole('combobox');
    
    await user.click(trigger);
    
    // Check if all options are rendered
    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('selects an option', async () => {
    const { user } = render(<BasicSelect />);
    const trigger = screen.getByRole('combobox');
    
    await user.click(trigger);
    await user.click(screen.getByText('Apple'));
    
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
      </Select>
    );
    
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('handles custom className', () => {
    render(
      <Select>
        <SelectTrigger className="custom-trigger">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
      </Select>
    );
    
    expect(screen.getByRole('combobox')).toHaveClass('custom-trigger');
  });

  it('displays error state', () => {
    render(
      <Select>
        <SelectTrigger className="border-destructive">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
      </Select>
    );
    
    expect(screen.getByRole('combobox')).toHaveClass('border-destructive');
  });
}); 