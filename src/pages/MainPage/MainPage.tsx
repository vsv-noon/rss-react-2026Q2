import { useEffect, useState, type ReactNode } from 'react';

import styles from './MainPage.module.scss';

import type { ContentProps } from './types';

import HookForm from '@/components/HookForm';
import Modal from '@/components/Modal';
import UncontrolledForm from '@/components/UncontrolledForm';

function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const handleOpenModalWithContent = (content: ContentProps['content']) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseModal();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={styles.main}>
      <button
        className={styles.btn}
        onClick={() => handleOpenModalWithContent(<HookForm />)}
      >
        React Hook Form
      </button>
      <button
        className={styles.btn}
        onClick={() => handleOpenModalWithContent(<UncontrolledForm />)}
      >
        Uncontrolled Form
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default MainPage;
