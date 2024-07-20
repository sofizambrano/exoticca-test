import { useEffect, PropsWithChildren } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose} type="button">
          <img
            aria-label="close"
            src="/close.png"
            width={20}
            height={20}
            alt="close icon"
          />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
