import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import SearchBar from './SearchBar';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('SearchBar', () => {
  const pushMock = jest.fn();
  const getMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: getMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('initializes search term from URL', () => {
    getMock.mockReturnValue('initialSearchTerm');
    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText(
      'Search trips'
    ) as HTMLInputElement;
    expect(inputElement.value).toBe('initialSearchTerm');
  });

  test('updates search term as user types', () => {
    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText(
      'Search trips'
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'new search term' } });
    expect(inputElement.value).toBe('new search term');
  });
});
