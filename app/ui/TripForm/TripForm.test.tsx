import { render, screen, fireEvent } from '@testing-library/react';
import TripForm from './TripForm';
import { Trip } from '@/types/Trip';

describe('TripForm', () => {
  const initialData: Trip = {
    id: 1,
    status: 'done',
    title: 'Test Trip',
    description: 'Test Description',
    photo_url: 'http://example.com/photo.jpg',
    itinerary: [
      {
        day: 1,
        location: 'Location name',
        description: 'Location Description',
      },
    ],
  };

  test('renders TripForm with initial data', () => {
    render(<TripForm initialData={initialData} onSubmit={jest.fn()} />);
    expect(screen.getByDisplayValue('Test Trip')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
    expect(
      screen.getByDisplayValue('http://example.com/photo.jpg')
    ).toBeInTheDocument();
  });

  test('handles adding and removing itinerary items', () => {
    render(<TripForm initialData={initialData} onSubmit={jest.fn()} />);
    fireEvent.click(screen.getByLabelText('Add itinerary item'));

    expect(screen.getAllByPlaceholderText('Location').length).toBe(2);

    fireEvent.click(screen.getAllByText('Remove')[0]);

    expect(screen.getAllByPlaceholderText('Location').length).toBe(1);
  });

  test('submits form data', () => {
    const handleSubmit = jest.fn();
    render(<TripForm initialData={initialData} onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByPlaceholderText('Italy'), {
      target: { value: 'Updated Trip' },
    });
    fireEvent.click(screen.getByText('Save'));

    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'Updated Trip',
      description: 'Test Description',
      photo_url: 'http://example.com/photo.jpg',
      itinerary: initialData.itinerary,
    });
  });
});
