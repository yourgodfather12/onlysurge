import { render, screen } from '@/test-utils/test-utils';
import { Avatar } from '../avatar';

describe('Avatar', () => {
  const defaultProps = {
    src: 'https://example.com/avatar.jpg',
    alt: 'User Avatar',
  };

  it('renders avatar with image', () => {
    render(<Avatar {...defaultProps} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', defaultProps.src);
    expect(img).toHaveAttribute('alt', defaultProps.alt);
  });

  it('renders fallback when image fails to load', () => {
    render(<Avatar {...defaultProps} src="" />);
    expect(screen.getByText(defaultProps.alt.charAt(0))).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    render(<Avatar {...defaultProps} size="lg" />);
    const container = screen.getByTestId('avatar-container');
    expect(container).toHaveClass('h-12 w-12');
  });

  it('renders with custom className', () => {
    render(<Avatar {...defaultProps} className="custom-avatar" />);
    const container = screen.getByTestId('avatar-container');
    expect(container).toHaveClass('custom-avatar');
  });

  it('renders with border', () => {
    render(<Avatar {...defaultProps} border />);
    const container = screen.getByTestId('avatar-container');
    expect(container).toHaveClass('ring-2 ring-background');
  });

  it('renders with hover effect', () => {
    render(<Avatar {...defaultProps} hover />);
    const container = screen.getByTestId('avatar-container');
    expect(container).toHaveClass('hover:opacity-80');
  });

  it('renders with custom fallback', () => {
    render(<Avatar {...defaultProps} src="" fallback="X" />);
    expect(screen.getByText('X')).toBeInTheDocument();
  });
}); 