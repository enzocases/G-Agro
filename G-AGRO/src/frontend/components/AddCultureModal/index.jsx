import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './addCultureModal.module.css';

const AddCultureModal = ({ show, handleClose, handleAdd }) => {
    const [newCulture, setNewCulture] = useState({
        nomecultura: '',
        descricao: '',
        imagem: '',
        tipo: '',
        tempoplantio: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewCulture({ ...newCulture, [name]: value });
    };

    const handleSubmit = () => {
        handleAdd(newCulture);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className={styles.blockTitle} >
                <Modal.Title className={styles.title}>Adicionar Nova Cultura</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.container}>
                <Form >
                    <div className={styles.containerInputs}>
                        <Form.Group controlId="formCultureName">

                            <Form.Label className={styles.label}>Nome da Cultura</Form.Label>
                            <input className={styles.input}
                                type="text"
                                placeholder="Digite o nome da cultura"
                                name="nomecultura"
                                value={newCulture.nomecultura}
                                onChange={handleChange}
                            />
                        </Form.Group >
                        <Form.Group controlId="formCultureDescription">
                            <Form.Label className={styles.label}>Descrição</Form.Label>
                            <textarea
                                className={styles.textarea}
                                type="text"
                                placeholder="Digite uma breve descrição"
                                name="descricao"
                                value={newCulture.descricao}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCultureImage">
                            <Form.Label className={styles.label}>Imagem (URL)</Form.Label>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Insira a URL da imagem"
                                name="imagem"
                                value={newCulture.imagem}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCultureType">
                            <Form.Label className={styles.label}>Tipo</Form.Label>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Digite o tipo da cultura (ex: Grão, Verdura)"
                                name="tipo"
                                value={newCulture.tipo}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCultureHarvestTime">
                            <Form.Label className={styles.label}>Tempo de Plantio</Form.Label>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Tempo de Plantio (ex: 60 a 90 dias)"
                                name="tempoplantio"
                                value={newCulture.tempoPlantio}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className={styles.footer}>
                
                <button className={styles.btnclose} onClick={handleClose}>
                    Cancelar
                </button>
                <button className={styles.btnedit} onClick={handleSubmit}>
                    Salvar Cultura
                </button>
            </Modal.Footer>
        </Modal >
    );
};

export default AddCultureModal;