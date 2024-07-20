import { Trip } from '@/types/Trip';
import styles from './TripForm.module.css';
import { useState } from 'react';
import { ItineraryItem } from '@/types/ItineraryItem';

interface TripFormProps {
  initialData?: Trip;
  onSubmit: (data: Omit<Trip, 'id' | 'status'>) => void;
}

export default function TripForm({
  initialData,
  onSubmit,
}: TripFormProps): JSX.Element {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(
    initialData?.description ?? ''
  );
  const [photoUrl, setPhotoUrl] = useState(initialData?.photo_url ?? '');
  const [itinerary, setItinerary] = useState<ItineraryItem[]>(
    initialData?.itinerary ?? [{ day: 1, location: '', description: '' }]
  );

  const handleAddItineraryItem = () => {
    setItinerary((itinerary) => [
      ...itinerary,
      { day: itinerary.length + 1, location: '', description: '' },
    ]);
  };

  const handleItineraryChange = (
    index: number,
    field: keyof ItineraryItem,
    value: string | number
  ) => {
    const newItinerary = [...itinerary];
    newItinerary[index] = { ...newItinerary[index], [field]: value };
    setItinerary(newItinerary);
  };

  const handleRemoveItineraryItem = (index: number) => {
    const anItinerary = [...itinerary];
    anItinerary.splice(index, 1);
    const newItinerary: ItineraryItem[] = [];
    anItinerary.forEach((item, index) => {
      newItinerary.push({
        ...item,
        day: index + 1,
      });
    });

    setItinerary(newItinerary);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const tripData = {
      title,
      description,
      photo_url: photoUrl,
      itinerary,
    };
    onSubmit(tripData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputWrapper}>
        <label className={styles.label}>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={styles.input}
          placeholder="Italy"
        />
      </div>

      <div className={styles.inputWrapper}>
        <label className={styles.label}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className={`${styles.input} ${styles.textarea}`}
          placeholder="Discover the wonders of the Roman empire..."
        />
      </div>

      <div className={styles.inputWrapper}>
        <label className={styles.label}>Image</label>
        <input
          type="text"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          required
          className={styles.input}
          placeholder="Image URL"
        />
      </div>

      <div className={styles.inputWrapper}>
        <div className={styles.header}>
          <label className={styles.label}>Day by day itinerary</label>
          <button type="button" onClick={handleAddItineraryItem}>
            <img
              aria-label="Add itinerary item"
              src="/add.png"
              width="21px"
              height="21px"
              alt="plus icon"
            />
          </button>
        </div>

        {itinerary.map((item, index) => (
          <div key={index} className={styles.itineraryInput}>
            <div className={styles.day}>
              <input
                type="text"
                value={item.day}
                onChange={(e) =>
                  handleItineraryChange(index, 'day', Number(e.target.value))
                }
                required
                className={styles.input}
                readOnly
              />
            </div>

            <div className={styles.texts}>
              <input
                type="text"
                value={item.location}
                onChange={(e) =>
                  handleItineraryChange(index, 'location', e.target.value)
                }
                required
                className={styles.input}
                placeholder="Location"
              />

              <textarea
                value={item.description}
                onChange={(e) =>
                  handleItineraryChange(index, 'description', e.target.value)
                }
                required
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Description"
              />

              <button
                type="button"
                onClick={() => handleRemoveItineraryItem(index)}
                className={styles.remove}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <button type="submit" className={styles.submit}>
          Save
        </button>
      </div>
    </form>
  );
}
