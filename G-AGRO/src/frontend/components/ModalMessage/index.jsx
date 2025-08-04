import React from 'react';
import styles from "./modalMessage.module.css";

const ModalMessage = ({ message, show }) => {
  if (!show) {
    return null; // Se não estiver visível, não renderiza o modal.
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p className={styles.text}>{message}</p>
        <div className={styles.progressBar}></div>
      </div>
    </div>
  );
};

export default ModalMessage;