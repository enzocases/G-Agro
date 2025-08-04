import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ModalConfirm from '../ModalConfirm';
import styles from "./modalPlantio.module.css";

const PlantioModal = ({ show, handleClose, plantio, handleEdit, handleDelete }) => {

    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const handleShowConfirm = () => setShowModalConfirm(true);
    const handleCloseConfirm = () => setShowModalConfirm(false);

    // * Formatar a Data
    const formatarData = (data) => {
        const dataObj = new Date(data); // Cria um objeto Date
        dataObj.setDate(dataObj.getDate() + 1); // Incrementa um dia e ajusta mês/ano automaticamente
    
        const dia = String(dataObj.getDate()).padStart(2, '0'); // Extrai e formata o dia
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Extrai e formata o mês
        const ano = dataObj.getFullYear(); // Extrai o ano
    
        return `${dia}/${mes}/${ano}`; // Retorna no formato dd/mm/yyyy
    };


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className={styles.header}>
                <h2 className={styles.title}><strong>{plantio.nomeCultura}</strong></h2>
            </Modal.Header>
                <div className={styles.container}>
            <Modal.Body>
                    <div className={styles.imagemContainer}>
                        <img
                            className={styles.imagem}
                            src={plantio.imagemTerreno}
                            alt={plantio.nomeCultura}
                        />
                    </div>

                    <div className={styles.info}>
                        <div className={`${styles.infoItem} ${styles.right}`}>
                            <p className={styles.linha}><strong>Data de Plantio:</strong> <span>{formatarData(plantio.dataPlantio)}</span></p>
                        </div>

                        <div className={`${styles.infoItem} ${styles.left}`}>
                            <p className={styles.linha}><strong>Tamanho do Terreno:</strong> <span>{plantio.tamanho} hectares</span></p>
                        </div>

                        <div className={`${styles.infoItem} ${styles.left}`}>
                            <p className={styles.linha}><strong>Nome do Terreno:</strong> <span>{plantio.nomeTerreno}</span></p>
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
                </div>
            </Modal.Footer>

            <ModalConfirm
                show={showModalConfirm}
                handleClose={handleCloseConfirm}
                newCulture={plantio}
                handleDelete={() => handleDelete(plantio)}
                tipo={"esse plantio"}
            />
        </Modal>
    );
};

export default PlantioModal;