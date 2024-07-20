import { getTrips } from './api';
import { Trip } from '@/types/Trip';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

describe('getTrips', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('fetches trips successfully', async () => {
    const mockTrips: Trip[] = [
      {
        id: 1,
        title: 'Test Trip 1',
        description: 'Description 1',
        photo_url: 'http://example.com/photo1.jpg',
        status: 'todo',
        itinerary: [],
      },
      {
        id: 2,
        title: 'Test Trip 2',
        description: 'Description 2',
        photo_url: 'http://example.com/photo2.jpg',
        status: 'done',
        itinerary: [],
      },
    ];

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTrips),
      })
    );

    const signal = new AbortController().signal;
    const trips = await getTrips(signal);

    expect(trips).toEqual(mockTrips);
    expect(fetch).toHaveBeenCalledWith(
      'https://my-json-server.typicode.com/mariosanz92/dream-travels-data/travels',
      { signal }
    );
  });

  test('throws an error if fetch fails', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );

    const signal = new AbortController().signal;

    await expect(getTrips(signal)).rejects.toThrow();
    expect(fetch).toHaveBeenCalledWith(
      'https://my-json-server.typicode.com/mariosanz92/dream-travels-data/travels',
      { signal }
    );
  });
});
