import { render, screen, fireEvent } from '@testing-library/react';
import EditTripModal from './EditTripModal';
import { useEditTripModalStore } from '@/stores/editTripModalStore';
import { useTripsStore } from '@/stores/tripsStore';

jest.mock('@/stores/editTripModalStore');
jest.mock('@/stores/tripsStore');

describe('EditTripModal', () => {
  beforeEach(() => {
    useEditTripModalStore.mockReturnValue({
      tripId: 1,
      closeModal: jest.fn(),
    });
    useTripsStore.mockReturnValue({
      trips: [
        {
          id: 1,
          title: 'Test Trip',
          description: 'Test Description',
          status: 'todo',
          itinerary: [],
        },
      ],
      updateTrip: jest.fn(),
    });
  });

  test('renders EditTripModal component when trip is found', () => {
    render(<EditTripModal />);
    expect(screen.getByText('Update trip')).toBeInTheDocument();
  });
});
