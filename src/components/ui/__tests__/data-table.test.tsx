import { render, screen, within } from '@/test-utils/test-utils';
import { DataTable } from '../data-table';

describe('DataTable', () => {
  const columns = [
    { id: 'name', header: 'Name', accessorKey: 'name' },
    { id: 'age', header: 'Age', accessorKey: 'age' },
    { id: 'email', header: 'Email', accessorKey: 'email' },
  ];

  const data = [
    { name: 'John Doe', age: 30, email: 'john@example.com' },
    { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    { name: 'Bob Johnson', age: 35, email: 'bob@example.com' },
  ];

  it('renders table with headers and data', () => {
    render(<DataTable columns={columns} data={data} />);

    // Check headers
    columns.forEach(column => {
      expect(screen.getByText(column.header)).toBeInTheDocument();
    });

    // Check data
    data.forEach(row => {
      Object.values(row).forEach(value => {
        expect(screen.getByText(value.toString())).toBeInTheDocument();
      });
    });
  });

  it('handles sorting', async () => {
    const { user } = render(<DataTable columns={columns} data={data} />);

    // Click name header to sort
    const nameHeader = screen.getByText('Name');
    await user.click(nameHeader);

    // Check if sorted alphabetically
    const cells = screen.getAllByRole('cell');
    expect(cells[0]).toHaveTextContent('Bob Johnson');
    expect(cells[3]).toHaveTextContent('Jane Smith');
    expect(cells[6]).toHaveTextContent('John Doe');
  });

  it('handles pagination', async () => {
    const manyRows = Array.from({ length: 15 }, (_, i) => ({
      name: `Person ${i + 1}`,
      age: 20 + i,
      email: `person${i + 1}@example.com`,
    }));

    const { user } = render(
      <DataTable 
        columns={columns} 
        data={manyRows}
        pagination={{ pageSize: 10 }}
      />
    );

    // Check initial page
    expect(screen.getByText('Person 1')).toBeInTheDocument();
    expect(screen.getByText('Person 10')).toBeInTheDocument();
    expect(screen.queryByText('Person 11')).not.toBeInTheDocument();

    // Go to next page
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);

    // Check second page
    expect(screen.getByText('Person 11')).toBeInTheDocument();
    expect(screen.getByText('Person 15')).toBeInTheDocument();
    expect(screen.queryByText('Person 1')).not.toBeInTheDocument();
  });

  it('handles row selection', async () => {
    const onSelectionChange = jest.fn();
    const { user } = render(
      <DataTable 
        columns={columns} 
        data={data}
        enableRowSelection
        onSelectionChange={onSelectionChange}
      />
    );

    // Select first row
    const checkbox = screen.getAllByRole('checkbox')[1]; // First one is header
    await user.click(checkbox);

    expect(onSelectionChange).toHaveBeenCalledWith(expect.any(Object));
    expect(checkbox).toBeChecked();
  });

  it('handles search/filter', async () => {
    const { user } = render(
      <DataTable 
        columns={columns} 
        data={data}
        enableSearch
      />
    );

    const searchInput = screen.getByPlaceholderText(/search/i);
    await user.type(searchInput, 'John');

    // Should only show John Doe
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(
      <DataTable 
        columns={columns} 
        data={data}
        className="custom-table"
      />
    );

    const table = screen.getByRole('table');
    expect(table).toHaveClass('custom-table');
  });

  it('handles empty data state', () => {
    render(
      <DataTable 
        columns={columns} 
        data={[]}
        emptyMessage="No data available"
      />
    );

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });
}); 