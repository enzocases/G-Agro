import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from "./modalEdit.module.css";

const EditModal = ({ show, handleClose, culture, handleSave }) => {
    const [newCulture, setNewCulture] = useState(culture);
    const [imagePreview, setImagePreview] = useState(culture.image);

    const OnChange = (e) => {
        setNewCulture({
            ...newCulture,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className={styles.blockTitle}>
                <Modal.Title className={styles.title}>
                    <strong>Editar Cultura: {newCulture.nomecultura}</strong>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.container}>
                {/* Pré-visualização da Imagem */}
                {imagePreview && (
                    <div className={styles.imagem}>
                        <img src={imagePreview} alt="Preview" className={styles.imagem} />
                    </div>
                )}

                {/* Campo para Alterar Imagem */}
                <label className={styles.label}>Imagem (URL) </label>
                <input
                    className={styles.input}
                    type="text"
                    name="imagem"
                    value={newCulture.imagem}
                    onChange={OnChange}
                />

                {/* Campo para o Nome */}
                <label className={styles.label}>Nome da Cultura</label>
                <input
                    className={styles.input}
                    type="text"
                    name="nomecultura"
                    value={newCulture.nomecultura}
                    onChange={OnChange}
                />

                {/* Campo para o Tipo */}
                <label className={styles.label}>Tipo</label>
                <input
                    className={styles.input}
                    type="text"
                    name="tipo"
                    value={newCulture.tipo}
                    onChange={OnChange}
                />

                {/* Campo para a Descrição */}
                <label className={styles.label}>Descrição</label>
                <textarea
                    className={styles.input}
                    type="text"
                    name="descricao"
                    value={newCulture.descricao}
                    onChange={OnChange}
                />

                {/* Campo para o Tempo de Colheita */}
                <label className={styles.label}>Tempo de Plantio</label>
                <input
                    className={styles.input}
                    type="text"
                    name="tempoplantio"
                    value={newCulture.tempoplantio}
                    onChange={OnChange}
                />
            </Modal.Body>

            <div className={styles.footer}>
                <Modal.Footer>
                    <div className={styles.containerBtns}>
                        <button className={styles.btnclose} onClick={handleClose}>
                            Cancelar
                        </button>
                        <button className={styles.btnedit} onClick={() => handleSave(newCulture)}>
                            Salvar
                        </button>
                    </div>
                </Modal.Footer>
            </div>

        </Modal>
    );
};

export default EditModal;