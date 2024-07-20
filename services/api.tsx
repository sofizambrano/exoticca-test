import { Trip } from '@/types/Trip';

const BASE_URL =
  'https://my-json-server.typicode.com/mariosanz92/dream-travels-data';

export const getTrips = async (
  signal: RequestInit['signal']
): Promise<Trip[]> => {
  const url = `${BASE_URL}/travels`;

  const res = await fetch(url, { signal });

  if (!res.ok) {
    throw new Error();
  }

  const data = await res.json();

  return data;
};
