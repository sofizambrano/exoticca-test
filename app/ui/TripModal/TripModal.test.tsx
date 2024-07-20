import { render, screen } from '@testing-library/react';
import TripModal from './TripModal';
import { useTripModalStore } from '@/stores/tripModalStore';
import { useTripsStore } from '@/stores/tripsStore';

jest.mock('@/stores/tripModalStore');
jest.mock('@/stores/tripsStore');

describe('TripModal', () => {
  beforeEach(() => {
    useTripModalStore.mockReturnValue({
      tripId: 1,
      closeModal: jest.fn(),
    });
    useTripsStore.mockReturnValue({
      trips: [
        {
          id: 1,
          title: 'Test Trip',
          description: 'Test Description',
          photo_url: 'http://example.com/photo.jpg',
          itinerary: [
            { day: 1, location: 'Location 1', description: 'Description 1' },
          ],
        },
      ],
    });
  });

  test('renders TripModal component when trip is found', () => {
    render(<TripModal />);
    expect(
      screen.getByAltText('Test Trip picture reference')
    ).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Itinerary')).toBeInTheDocument();
    expect(screen.getByText('Day 1: Location 1')).toBeInTheDocument();
  });

  test('does not render TripModal when tripId is null', () => {
    useTripModalStore.mockReturnValue({
      tripId: null,
      closeModal: jest.fn(),
    });

    const { container } = render(<TripModal />);
    expect(container).toBeEmptyDOMElement();
  });

  test('displays "No itinerary" message when trip has no itinerary', () => {
    useTripsStore.mockReturnValue({
      trips: [
        {
          id: 1,
          title: 'Test Trip',
          description: 'Test Description',
          photo_url: 'http://example.com/photo.jpg',
          itinerary: [],
        },
      ],
    });

    render(<TripModal />);
    expect(screen.getByText('No itinerary')).toBeInTheDocument();
  });
});
