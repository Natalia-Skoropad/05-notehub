import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import css from './Modal.module.css';

//===============================================================

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

//===============================================================

function Modal({ onClose, children }: ModalProps) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => ev.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal} role="document">
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
