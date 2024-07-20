import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { useTripsStore } from '@/stores/tripsStore';
import { ComponentProps } from 'react';

jest.mock('@/stores/tripsStore');

describe('Header', () => {
  beforeEach(() => {
    useTripsStore.mockReturnValue({
      updateTrip: jest.fn(),
    });
  });

  const trip: ComponentProps<typeof Header> = {
    id: 1,
    title: 'Test Trip',
    status: 'todo',
  };

  test('renders header with trip title and status', () => {
    render(<Header {...trip} />);

    expect(screen.getByText('Test Trip')).toBeInTheDocument();
    expect(screen.getByText('Mark as completed')).toBeInTheDocument();
  });

  test('marks trip as completed when button is clicked', () => {
    const { updateTrip } = useTripsStore();

    render(<Header {...trip} />);
    fireEvent.click(screen.getByText('Mark as completed'));

    expect(updateTrip).toHaveBeenCalledWith(1, { status: 'done' });
  });
});
