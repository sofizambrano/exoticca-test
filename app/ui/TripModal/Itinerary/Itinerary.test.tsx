import { render, screen } from '@testing-library/react';
import Itinerary from './Itinerary';

const itinerary = [
  { day: 1, location: 'Location 1', description: 'Description 1' },
  { day: 2, location: 'Location 2', description: 'Description 2' },
];

describe('Itinerary', () => {
  test('renders itinerary items correctly', () => {
    render(<Itinerary itinerary={itinerary} />);

    expect(screen.getByText('Day 1: Location 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Day 2: Location 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });
});
