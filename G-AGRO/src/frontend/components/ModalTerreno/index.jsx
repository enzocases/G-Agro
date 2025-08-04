import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import styles from "./modal.module.css";
import ModalConfirmTerreno from "@/frontend/components/ModalConfirmTerreno/index.jsx";
import ModalEditTerreno from "@/frontend/components/ModalEditTerreno/ModalEditTerreno.jsx";

const TerrenoModal = ({ show, handleClose, terreno, handleEdit, handleDelete, handleUpdateTerreno, setTerrain}) => {
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const handleShowConfirm = () => setShowModalConfirm(true);
    const handleCloseConfirm = () => setShowModalConfirm(false);

    const handleShowEdit = () => setShowModalEdit(true);
    const handleCloseEdit = () => setShowModalEdit(false);

    const[showModalEdit, setShowModalEdit] = useState(false);

    const handleDeleteWithClose = (terreno) => {
        handleDelete(terreno);
        handleCloseConfirm();
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className={styles.header}>
                <h2 className={styles.title}><strong>{terreno.nome}</strong></h2>
            </Modal.Header>
            <div className={styles.container}>
                <Modal.Body>
                    <div className={styles.imagemContainer}>
                        <img src={terreno.imagem} alt={terreno.nome} className={styles.imagem} />
                    </div>
                    <div className={styles.info}>
                        <div className={`${styles.infoItem} ${styles.right}`}>
                            <p className={styles.linha}><strong>Tipo:</strong><span> {terreno.tipo_solo}</span></p>
                        </div>
                        <div className={`${styles.infoItem} ${styles.left}`}>
                            <p className={styles.linha}><strong>Status:</strong><span> {terreno.status}</span></p>
                        </div>
                        <div className={`${styles.infoItem} ${styles.left}`}>
                            <p className={styles.linha}><strong>Tamanho:</strong><span> {terreno.tamanho} hectares</span></p>
                        </div>
                    </div>
                </Modal.Body>
            </div>
            <Modal.Footer className={styles.footer}>
                <div className={styles.containerBtns}>
                    <button className={styles.btnedit} onClick={handleShowEdit}>
                        Editar
                    </button>
                    <button className={styles.btnclose} onClick={handleClose}>
                        Fechar
                    </button>
                    <button className={styles.btndelete} onClick={handleShowConfirm}>
                        Excluir
                    </button>
                    <ModalConfirmTerreno
                        show={showModalConfirm}
                        handleClose={handleCloseConfirm}
                        terreno={terreno}
                        handleDelete={handleDeleteWithClose}
                    />
                    <ModalEditTerreno
                        show={showModalEdit}
                        handleClose={
                            () => {
                                handleCloseEdit();
                                handleClose();
                            }
                        }
                        handleUpdateTerreno={handleUpdateTerreno}
                        terreno={terreno}
                        setTerrain={setTerrain}
                    />
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default TerrenoModal;
