import { render, screen } from '@/test-utils/test-utils';
import { LineChart, BarChart, PieChart } from '../charts';

// Mock ResizeObserver
window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('Charts', () => {
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Sales',
        data: [30, 50, 40],
        borderColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  const barData = {
    labels: ['Q1', 'Q2', 'Q3'],
    datasets: [
      {
        label: 'Revenue',
        data: [300, 450, 400],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const pieData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  beforeEach(() => {
    // Clear mock calls between tests
    jest.clearAllMocks();
  });

  describe('LineChart', () => {
    it('renders line chart with data', () => {
      render(<LineChart data={lineData} />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('applies custom height', () => {
      render(<LineChart data={lineData} height={300} />);
      const canvas = screen.getByRole('img');
      expect(canvas).toHaveAttribute('height', '300');
    });

    it('renders with custom className', () => {
      render(<LineChart data={lineData} className="custom-chart" />);
      const container = screen.getByTestId('line-chart-container');
      expect(container).toHaveClass('custom-chart');
    });

    it('handles empty data gracefully', () => {
      const emptyData = {
        labels: [],
        datasets: [{ label: 'Empty', data: [], borderColor: '#000' }],
      };
      render(<LineChart data={emptyData} />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  describe('BarChart', () => {
    it('renders bar chart with data', () => {
      render(<BarChart data={barData} />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('applies custom width', () => {
      render(<BarChart data={barData} width={500} />);
      const canvas = screen.getByRole('img');
      expect(canvas).toHaveAttribute('width', '500');
    });

    it('renders with custom options', () => {
      const options = {
        scales: {
          y: { beginAtZero: true },
        },
      };
      render(<BarChart data={barData} options={options} />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('handles responsive prop', () => {
      render(<BarChart data={barData} responsive />);
      const container = screen.getByTestId('bar-chart-container');
      expect(container).toHaveClass('w-full');
    });
  });

  describe('PieChart', () => {
    it('renders pie chart with data', () => {
      render(<PieChart data={pieData} />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('applies custom size', () => {
      render(<PieChart data={pieData} width={400} height={400} />);
      const canvas = screen.getByRole('img');
      expect(canvas).toHaveAttribute('width', '400');
      expect(canvas).toHaveAttribute('height', '400');
    });

    it('renders with legend', () => {
      render(
        <PieChart
          data={pieData}
          options={{ plugins: { legend: { display: true } } }}
        />
      );
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('handles custom colors', () => {
      const customColors = ['#FF0000', '#00FF00', '#0000FF'];
      const customData = {
        ...pieData,
        datasets: [{
          ...pieData.datasets[0],
          backgroundColor: customColors,
        }],
      };
      render(<PieChart data={customData} />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  describe('Chart Interactions', () => {
    it('handles click events', async () => {
      const onClick = jest.fn();
      const { user } = render(
        <LineChart data={lineData} onClick={onClick} />
      );

      const canvas = screen.getByRole('img');
      await user.click(canvas);
      expect(onClick).toHaveBeenCalled();
    });

    it('handles hover events', async () => {
      const onHover = jest.fn();
      const { user } = render(
        <BarChart data={barData} onHover={onHover} />
      );

      const canvas = screen.getByRole('img');
      await user.hover(canvas);
      expect(onHover).toHaveBeenCalled();
    });
  });
}); 