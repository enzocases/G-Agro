import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './addPlantioModal.module.css';
import Select from "react-select";

const AddPlantioModal = ({ show, handleClose, handleAdd }) => {
    const [newCulture, setNewCulture] = useState({
        idCultura: '',
        idTerreno: '',
        dataPlantio: ''
    });

    // ? Arrumar Questão dos Terrenos e Culturas usando o SELECT, para mostrar todos os registrados.
    const [cultures, setCultures] = useState([])
    const [terrenos, setTerrenos] = useState([])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewCulture({ ...newCulture, [name]: value });
    };

    const handleSubmit = () => {
        handleAdd(newCulture);
        handleClose(); 
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className={styles.blockTitle}>
                <Modal.Title className={styles.title}>Adicionar Novo Plantio</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.container}>
                <Form>
                    <Form.Group controlId="formCultureName">
                        <Form.Label className={styles.label}>Nome do Terreno</Form.Label>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Digite o nome do Terreno"
                            name="name"
                            value={newCulture.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCultureDescription">
                        <Form.Label className={styles.label}>Nome Da Cultura</Form.Label>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Digite o Nome da Cultura"
                            name="nomeCultura"
                            value={newCulture.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCultureHarvestTime">
                        <Form.Label className={styles.label}>Data de Plantio</Form.Label>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Data de Plantio (ex: 23/10/2003)"
                            name="harvestTime"
                            value={newCulture.harvestTime}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className={styles.footer}>
                <Button className={styles.btnclose} onClick={handleClose}>
                    Cancelar
                </Button>
                <Button className={styles.btnedit} onClick={handleSubmit}>
                    Salvar Cultura
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddPlantioModal;
