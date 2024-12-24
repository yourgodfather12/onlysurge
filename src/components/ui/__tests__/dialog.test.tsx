import { render, screen, waitFor } from '@/test-utils/test-utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../dialog';

describe('Dialog', () => {
  const BasicDialog = () => (
    <Dialog>
      <DialogTrigger>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
        </DialogHeader>
        <div>Dialog Content</div>
        <DialogFooter>
          <button>Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  it('renders trigger button', () => {
    render(<BasicDialog />);
    expect(screen.getByText('Open Dialog')).toBeInTheDocument();
  });

  it('opens dialog on trigger click', async () => {
    const { user } = render(<BasicDialog />);
    
    await user.click(screen.getByText('Open Dialog'));
    
    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
    expect(screen.getByText('Dialog Description')).toBeInTheDocument();
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
  });

  it('closes dialog on close button click', async () => {
    const { user } = render(<BasicDialog />);
    
    // Open dialog
    await user.click(screen.getByText('Open Dialog'));
    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
    
    // Close dialog
    await user.click(screen.getByText('Close'));
    
    // Wait for dialog to be removed from the DOM
    await waitFor(() => {
      expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument();
    });
  });

  it('closes dialog on overlay click', async () => {
    const { user } = render(<BasicDialog />);
    
    // Open dialog
    await user.click(screen.getByText('Open Dialog'));
    
    // Click overlay (the parent of DialogContent)
    const overlay = screen.getByRole('dialog').parentElement;
    await user.click(overlay as HTMLElement);
    
    // Wait for dialog to be removed from the DOM
    await waitFor(() => {
      expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument();
    });
  });

  it('closes dialog on escape key', async () => {
    const { user } = render(<BasicDialog />);
    
    // Open dialog
    await user.click(screen.getByText('Open Dialog'));
    
    // Press escape
    await user.keyboard('{Escape}');
    
    // Wait for dialog to be removed from the DOM
    await waitFor(() => {
      expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument();
    });
  });

  it('applies custom className to dialog content', () => {
    render(
      <Dialog>
        <DialogContent className="custom-dialog">
          <div>Content</div>
        </DialogContent>
      </Dialog>
    );
    
    expect(screen.getByRole('dialog')).toHaveClass('custom-dialog');
  });
}); 