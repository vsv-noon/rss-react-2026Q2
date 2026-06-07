import { useRef, type MouseEvent } from 'react';

import { createPortal } from 'react-dom';

import styles from './Modal.module.scss';

import type { ModalProps } from './types';

function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRoot = document.getElementById('modal-root');
  const mouseDownTarget = useRef<EventTarget | null>(null);

  if (!isOpen || !modalRoot) return null;

  const handleMouseDown = (e: MouseEvent) => {
    mouseDownTarget.current = e.target;
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (
      mouseDownTarget.current === e.currentTarget &&
      e.target === e.currentTarget
    ) {
      onClose();
    }

    mouseDownTarget.current = null;
  };

  return createPortal(
    <div
      className={styles.modalOverlay}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalCloseBtn} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
