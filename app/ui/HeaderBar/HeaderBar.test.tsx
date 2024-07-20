import { render, screen, fireEvent } from '@testing-library/react';
import { useCreateTripModalStore } from '@/stores/createTripModalStore';
import HeaderBar from './HeaderBar';

jest.mock('@/stores/createTripModalStore', () => ({
  useCreateTripModalStore: jest.fn(),
}));

describe('HeaderBar', () => {
  const openCreateTripModalMock = jest.fn();

  beforeEach(() => {
    useCreateTripModalStore.mockReturnValue({
      openModal: openCreateTripModalMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the logo', () => {
    render(<HeaderBar />);
    expect(screen.getByAltText('Exoticca logo')).toBeInTheDocument();
  });

  test('renders the "Create new trip" button', () => {
    render(<HeaderBar />);
    expect(screen.getByText('Create new trip')).toBeInTheDocument();
  });

  test('calls openCreateTripModal when "Create new trip" button is clicked', () => {
    render(<HeaderBar />);
    fireEvent.click(screen.getByText('Create new trip'));
    expect(openCreateTripModalMock).toHaveBeenCalled();
  });
});
