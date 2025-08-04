
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ModalConfirm from '../ModalConfirm';
import styles from "./modal.module.css"

const CultureModal = ({ show, handleClose, culture, handleEdit, handleDelete }) => {

    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const handleShowConfirm = () => setShowModalConfirm(true);
    const handleCloseConfirm = () => setShowModalConfirm(false);

    return (
        <Modal show={show} onHide={handleClose}  >
            <Modal.Header className={styles.header}>
                <h2 className={styles.title}> <strong>{culture.nomecultura}</strong></h2>
            </Modal.Header>
                <div className={styles.container}>
            <Modal.Body>

                    <div className={styles.imagemContainer}>
                        <img src={culture.imagem} alt={culture.nomecultura} className={styles.imagem} />
                    </div>

                    <div className={styles.info}>

                        <div className={`${styles.infoItem} ${styles.right}`}>

                            <p className={styles.linha}><strong>Tipo:</strong><span> {culture.tipo}</span></p>
                        </div>

                        <div className={`${styles.infoItem} ${styles.left}`}>
                            <p className={styles.linha}><strong>Descrição:</strong><span> {culture.descricao}</span></p>
                        </div>

                        <div className={`${styles.infoItem} ${styles.left}`}>
                            <p className={styles.linha}><strong>Tempo de Plantio:</strong><span> {culture.tempoplantio} dias</span></p>
                        </div>

                    </div>
            </Modal.Body>
                </div>

            <Modal.Footer className={styles.footer}>
                <div className={styles.containerBtns}>
                    <button className={styles.btnedit} onClick={handleEdit}>
                        Editar
                    </button>

                    <button className={styles.btnclose} onClick={handleClose}>
                        Fechar
                    </button>

                    <button className={styles.btndelete} onClick={handleShowConfirm}>
                        Excluir
                    </button>
                    <ModalConfirm
                        show={showModalConfirm}
                        handleClose={handleCloseConfirm}
                        newCulture={culture}
                        handleDelete={handleDelete}
                        tipo={"essa cultura"}
                    />
                </div>
            </Modal.Footer>

        </Modal>
    );
};

export default CultureModal;