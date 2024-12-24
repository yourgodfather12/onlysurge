import { render, screen } from '@testing-library/react';
import GlobalLoading from '../loading';

describe('GlobalLoading', () => {
  it('renders Loading component', () => {
    render(<GlobalLoading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders with spinner animation', () => {
    const { container } = render(<GlobalLoading />);
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });
}); 