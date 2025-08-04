import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './EditPlantio.module.css';
import { carregarCulturas } from '../../api/culturas';
import { carregarTerrenos } from '../../api/terrenos';
import { atualizarPlantios } from '../../api/plantios';
import ModalMessage from '../ModalMessage';

const ModalEditPlantio = ({ show, handleClose, plantio, handleSave }) => {
    const [formData, setFormData] = useState({ id:'', id_cultura: '', dataplantio: '', id_terreno: '' });
    const [terrain, setTerrain] = useState([]);
    const [cultures, setCultures] = useState([]);
    const [isModalMessageVisible, setIsModalMessageVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState("")


    useEffect(() => {
        // Verifica se há uma mensagem no sessionStorage
        const storedMessage = sessionStorage.getItem('modalMessage');
        if (storedMessage) {
          setModalMessage(storedMessage);
          setIsModalMessageVisible(true);
    
          // Remove a mensagem do sessionStorage após 4 segundos
          setTimeout(() => {
            setIsModalMessageVisible(false);
            sessionStorage.removeItem('modalMessage'); // Remove a mensagem para não exibir novamente
          }, 3000);
        }
      }, []);


    useEffect(() => {
        setFormData({
            id: plantio.id,
            id_cultura: plantio.idCultura,
            dataplantio: plantio.dataPlantio,
            id_terreno: plantio.idTerreno,
        });
    }, [plantio]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: name === "id_cultura" || name === "id_terreno" ? parseInt(value) : value,
        });
    };

    const handleSubmit = () => {
        handleUpdate(); // Passa uma cópia do formData atual
        handleClose();
    };

    const handleUpdate = async () => {
        if (!formData || !plantio.id) {
          sessionStorage.setItem('modalMessage', 'Erro ao atualizar: Plantio sem ID.');
          setIsModalMessageVisible(true);
          return;
        }       
        
        try {
          const updatePlantio = await atualizarPlantios(formData.id, formData)
          if (updatePlantio) {
            const updatedPlantios = plantios.map((p) => (p.id === formData.id ? updatePlantio : p));
            setPlantios(updatedPlantios);
            handleClose();
          } 
        } catch (error) {
          sessionStorage.setItem('modalMessage', 'Erro de requisição ao atualizar.');
          setIsModalMessageVisible(true);
        }
      };

    useEffect(() => {
        const fetchCultures = async () => {
          const data = await carregarCulturas();
          if (data) {
            setCultures(data);
          }
        };
        fetchCultures();
      }, []);

      useEffect(() => {
        const fetchCultures = async () => {
          const data = await carregarTerrenos();
          if (data) {
            setTerrain(data);
          }
        };
        fetchCultures();
      }, []);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className={styles.blockTitle}>
                <Modal.Title className={styles.title}>Editar Plantio</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.container}>
                <Form>
                    <Form.Group controlId="formNomeCultura">
                        <Form.Label className={styles.label}>Nome da Cultura</Form.Label>
                        <Form.Select
                             className={styles.input}
                             name="id_cultura"
                             value={formData.id_cultura}
                             onChange={handleChange}
                        >
                            {cultures.map((cultura) => (
                                <option key={cultura.id} value={cultura.id}>
                                    {cultura.nomecultura}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="formDataPlantio">
                        <Form.Label className={styles.label}>Data de Plantio</Form.Label>
                        <Form.Control
                             className={styles.input}
                             type="date"
                             name="dataplantio"
                             value={formData.dataplantio}
                             onChange={handleChange}
                        />
                    </Form.Group>
                    
                    <Form.Group controlId="formNomeTerreno">
                        <Form.Label className={styles.label}>Nome do Terreno</Form.Label>
                        <Form.Select
                            className={styles.input}
                            name="id_terreno" 
                            value={formData.id_terreno} 
                            onChange={handleChange}
                        >
                            {/* Opções de terreno preenchidas dinamicamente */}
                            {terrain.map((terreno) => (
                                <option key={terreno.id} value={terreno.id}>
                                    {terreno.nome} - {terreno.status}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className={styles.footer}>
            <div className={styles.containerBtns}>
                        <button className={styles.btnclose} onClick={handleClose}>
                            Cancelar
                        </button>
                        <button className={styles.btnedit} onClick={() => handleSubmit()}>
                            Salvar
                        </button>
                    </div>
                    <ModalMessage 
                        message={sessionStorage.getItem("modalMessage")}
                        show={isModalMessageVisible}
                    />
            </Modal.Footer>
        </Modal>
        
    );
};

export default ModalEditPlantio;