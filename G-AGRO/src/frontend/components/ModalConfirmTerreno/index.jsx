import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from "./modalConfirm.module.css";

const ModalConfirmTerreno = ({ show, handleClose, terreno, handleDelete }) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body className={styles.container}>
                <h3>Tem certeza que deseja excluir o terreno {terreno.nome}?</h3>
                <button className={styles.btnclose} onClick={handleClose}>
                    Cancelar
                </button>
                <button
                    className={styles.btndelete}
                    onClick={() => {
                        handleDelete(terreno);
                        handleClose();
                    }}
                >
                    Confirmar exclusão
                </button>
            </Modal.Body>
        </Modal>
    );
};

export default ModalConfirmTerreno;