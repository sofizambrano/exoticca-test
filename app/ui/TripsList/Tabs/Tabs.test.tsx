import { render, screen } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Tabs from './Tabs';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('Tabs', () => {
  const tabs = [
    { label: 'All', value: null },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  beforeEach(() => {
    useRouter.mockReturnValue({
      push: jest.fn(),
    });

    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });
  });

  test('renders all tabs', () => {
    render(<Tabs tabs={tabs} />);

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  test('marks the correct tab as active', () => {
    useSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue('active'),
    });

    render(<Tabs tabs={tabs} />);

    expect(screen.getByText('Active')).toHaveClass('active');
  });
});
