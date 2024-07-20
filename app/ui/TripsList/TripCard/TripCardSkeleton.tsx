import styles from './TripCard.module.css';

// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function TripCardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 shadow-sm w-full ${styles.container}`}
    >
      <div
        className={`flex items-center justify-center truncate  bg-white px-4 py-16 ${styles.photo}`}
      ></div>
      <div className={`flex p-4 ${styles.content}`}>
        <div className="h-5 w-8 rounded-md bg-gray-200" />
        <div className="h-10 w-40 rounded-md bg-gray-200 text-sm font-medium" />
        <div className="h-5 w-5 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}
