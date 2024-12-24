import { render, screen, waitFor } from '@/test-utils/test-utils';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from '../dropdown-menu';

describe('DropdownMenu', () => {
  const BasicDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem disabled>Billing</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  it('renders trigger button', () => {
    render(<BasicDropdown />);
    expect(screen.getByText('Open Menu')).toBeInTheDocument();
  });

  it('opens menu on trigger click', async () => {
    const { user } = render(<BasicDropdown />);
    
    await user.click(screen.getByText('Open Menu'));
    
    expect(screen.getByText('My Account')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Billing')).toBeInTheDocument();
  });

  it('closes menu on item click', async () => {
    const { user } = render(<BasicDropdown />);
    
    // Open menu
    await user.click(screen.getByText('Open Menu'));
    expect(screen.getByText('Profile')).toBeInTheDocument();
    
    // Click menu item
    await user.click(screen.getByText('Profile'));
    
    // Menu should close
    await waitFor(() => {
      expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    });
  });

  it('handles disabled items', async () => {
    const { user } = render(<BasicDropdown />);
    
    await user.click(screen.getByText('Open Menu'));
    
    const billingItem = screen.getByText('Billing');
    expect(billingItem).toHaveAttribute('aria-disabled', 'true');
  });

  it('closes on escape key', async () => {
    const { user } = render(<BasicDropdown />);
    
    // Open menu
    await user.click(screen.getByText('Open Menu'));
    expect(screen.getByText('Profile')).toBeInTheDocument();
    
    // Press escape
    await user.keyboard('{Escape}');
    
    // Menu should close
    await waitFor(() => {
      expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    });
  });

  it('handles custom className on content', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent className="custom-dropdown">
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('supports nested groups', async () => {
    const { user } = render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Group 1</DropdownMenuLabel>
            <DropdownMenuItem>Item 1.1</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Group 2</DropdownMenuLabel>
            <DropdownMenuItem>Item 2.1</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByText('Open'));
    
    expect(screen.getByText('Group 1')).toBeInTheDocument();
    expect(screen.getByText('Group 2')).toBeInTheDocument();
    expect(screen.getByText('Item 1.1')).toBeInTheDocument();
    expect(screen.getByText('Item 2.1')).toBeInTheDocument();
  });

  it('handles keyboard navigation', async () => {
    const { user } = render(<BasicDropdown />);
    
    // Open menu
    await user.click(screen.getByText('Open Menu'));
    
    // Press arrow down
    await user.keyboard('{ArrowDown}');
    expect(document.activeElement).toHaveTextContent('Profile');
    
    // Press arrow down again
    await user.keyboard('{ArrowDown}');
    expect(document.activeElement).toHaveTextContent('Settings');
  });
}); 