import { ItineraryItem } from './ItineraryItem';

type Status = 'todo' | 'done';

export interface Trip {
  id: number;
  title: string;
  description: string;
  status: Status;
  photo_url: string;
  itinerary: ItineraryItem[];
}
