import { render, screen, fireEvent } from '@testing-library/react';
import TripCard from './TripCard';
import { useTripModalStore } from '@/stores/tripModalStore';
import { useTripsStore } from '@/stores/tripsStore';
import { useEditTripModalStore } from '@/stores/editTripModalStore';
import { useSearchParams } from 'next/navigation';
import { Trip } from '@/types/Trip';

jest.mock('@/stores/tripModalStore');
jest.mock('@/stores/tripsStore');
jest.mock('@/stores/editTripModalStore');
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

describe('TripCard', () => {
  const trip: Trip = {
    id: 1,
    title: 'Test Trip',
    description: 'Test Description',
    photo_url: 'http://example.com/photo.jpg',
    status: 'todo',
    itinerary: [],
  };

  beforeEach(() => {
    useTripModalStore.mockReturnValue({
      openModal: jest.fn(),
    });
    useTripsStore.mockReturnValue({
      deleteTrip: jest.fn(),
      updateTrip: jest.fn(),
    });
    useEditTripModalStore.mockReturnValue({
      openModal: jest.fn(),
    });
    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });
  });

  test('renders TripCard component with all details', () => {
    render(<TripCard {...trip} />);

    expect(
      screen.getByAltText('Test Trip picture reference')
    ).toBeInTheDocument();
    expect(screen.getByText('Test Trip')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('See trip details')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  test('shows repeat button when completed tab is active', () => {
    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue('done'),
    });

    render(<TripCard {...trip} />);

    expect(screen.getByText('Repeat')).toBeInTheDocument();
  });

  test('does not show repeat button when completed tab is not active', () => {
    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });

    render(<TripCard {...trip} />);

    expect(screen.queryByText('Repeat')).not.toBeInTheDocument();
  });

  test('clicking See trip details button opens trip modal', () => {
    const { openModal } = useTripModalStore();

    render(<TripCard {...trip} />);
    fireEvent.click(screen.getByText('See trip details'));

    expect(openModal).toHaveBeenCalledWith(trip.id);
  });

  test('clicking Edit button opens edit trip modal', () => {
    const { openModal } = useEditTripModalStore();

    render(<TripCard {...trip} />);
    fireEvent.click(screen.getByText('Edit'));

    expect(openModal).toHaveBeenCalledWith(trip.id);
  });

  test('clicking Delete button deletes the trip', () => {
    const { deleteTrip } = useTripsStore();

    render(<TripCard {...trip} />);
    fireEvent.click(screen.getByText('Delete'));

    expect(deleteTrip).toHaveBeenCalledWith(trip.id);
  });

  test('clicking Repeat button updates the trip status to todo', () => {
    const { updateTrip } = useTripsStore();
    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue('done'),
    });

    render(<TripCard {...trip} />);
    fireEvent.click(screen.getByText('Repeat'));

    expect(updateTrip).toHaveBeenCalledWith(trip.id, { status: 'todo' });
  });
});
