import { render, screen } from '@/test-utils/test-utils';
import { Card } from '../card';

describe('Card', () => {
  it('renders children content', () => {
    render(
      <Card>
        <div data-testid="card-content">Card Content</div>
      </Card>
    );
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
  });

  it('applies default styles', () => {
    render(<Card>Content</Card>);
    const card = screen.getByText('Content').parentElement;
    expect(card).toHaveClass('rounded-lg border bg-card text-card-foreground shadow-sm');
  });

  it('accepts additional className', () => {
    render(<Card className="custom-class">Content</Card>);
    const card = screen.getByText('Content').parentElement;
    expect(card).toHaveClass('custom-class');
  });

  it('forwards ref to card element', () => {
    const ref = jest.fn();
    render(<Card ref={ref}>Content</Card>);
    expect(ref).toHaveBeenCalled();
  });

  it('renders with hover effect', () => {
    render(<Card hover>Content</Card>);
    const card = screen.getByText('Content').parentElement;
    expect(card).toHaveClass('hover:border-primary/50');
  });

  it('renders with padding', () => {
    render(<Card padding>Content</Card>);
    const card = screen.getByText('Content').parentElement;
    expect(card).toHaveClass('p-6');
  });

  it('renders with custom padding size', () => {
    render(<Card padding="sm">Content</Card>);
    const card = screen.getByText('Content').parentElement;
    expect(card).toHaveClass('p-4');
  });
}); 