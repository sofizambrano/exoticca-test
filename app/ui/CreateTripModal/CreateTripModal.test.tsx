import { render, screen, fireEvent } from '@testing-library/react';
import CreateTripModal from './CreateTripModal';
import { useCreateTripModalStore } from '@/stores/createTripModalStore';
import { useTripsStore } from '@/stores/tripsStore';

jest.mock('@/stores/createTripModalStore');
jest.mock('@/stores/tripsStore');

describe('CreateTripModal', () => {
  beforeEach(() => {
    useCreateTripModalStore.mockReturnValue({
      isOpen: true,
      closeModal: jest.fn(),
    });
    useTripsStore.mockReturnValue({
      addTrip: jest.fn(),
    });
  });

  test('renders CreateTripModal component when open', () => {
    render(<CreateTripModal />);
    expect(screen.getByText('Create a trip')).toBeInTheDocument();
  });

  test('submits form and closes modal', () => {
    const { addTrip } = useTripsStore();
    const { closeModal } = useCreateTripModalStore();

    render(<CreateTripModal />);

    fireEvent.change(screen.getByPlaceholderText('Italy'), {
      target: { value: 'Test Trip' },
    });
    fireEvent.change(
      screen.getByPlaceholderText(
        'Discover the wonders of the Roman empire...'
      ),
      {
        target: { value: 'Test Description' },
      }
    );
    fireEvent.change(screen.getByPlaceholderText('Image URL'), {
      target: { value: 'http://example.com/photo.jpg' },
    });
    fireEvent.change(screen.getByPlaceholderText('Location'), {
      target: { value: 'Location name' },
    });
    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: 'Location desription' },
    });

    fireEvent.click(screen.getByText('Save'));

    expect(addTrip).toHaveBeenCalled();
    expect(closeModal).toHaveBeenCalled();
  });
});
