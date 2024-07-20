import styles from './Skeleton.module.css';

// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default function Skeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden bg-gray-100 shadow-sm ${styles.container}`}
    >
      <div className={`bg-gray-200 py-16 ${styles.photoPlaceholder}`} />
      <div className={`flex flex-col p-4 ${styles.content}`}>
        <div className="h-5 w-8 rounded-md bg-gray-200" />
        <div className="h-10 w-40 rounded-md bg-gray-200 text-sm font-medium" />
        <div className="h-5 w-5 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}
