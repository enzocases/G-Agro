import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./modalEdit.module.css";

const ModalEditTerreno = ({ show, handleClose, terreno, setTerrain, handleUpdateTerreno }) => {
  const [newTerreno, setNewTerreno] = useState(terreno);
  const [imagePreview, setImagePreview] = useState(terreno.imagem);

  useEffect(() => {
    setNewTerreno(terreno);
    setImagePreview(terreno.imagem);
  }, [terreno]);

  const OnChange = (e) => {
    setNewTerreno({
      ...newTerreno,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const updatedTerreno = { ...newTerreno }; // Usar newTerreno aqui

    handleUpdateTerreno(updatedTerreno)

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className={styles.blockTitle}>
        <Modal.Title className={styles.title}>
          <strong>Editar Terreno: {newTerreno.nome}</strong>
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
          value={newTerreno.imagem}
          onChange={OnChange}
        />

        {/* Campo para o Nome */}
        <label className={styles.label}>
          Nome do Terreno
        </label>
        <input
          className={styles.input}
          type="text"
          name="nome"
          value={newTerreno.nome}
          onChange={OnChange}
        />

        {/* Campo para o Tipo */}
        <label className={styles.label}>Tipo</label>
        <input
          className={styles.input}
          type="text"
          name="tipo_solo" 
          value={newTerreno.tipo_solo} 
          onChange={OnChange}
        />

        {/* Campo para o Tamanho */}
        <label className={styles.label}>Tamanho</label>
        <input
          className={styles.input}
          type="text"
          name="tamanho"
          value={newTerreno.tamanho}
          onChange={OnChange}
        />

        <label className={styles.label}>Status</label>
        <select
          name="status"
          value={newTerreno.status}
          onChange={OnChange}
          className={styles.input}
        >
          <option disabled={true} value="">
            Selecione o status:
          </option>
          <option value="ocupado" disabled={newTerreno.status === "ocupado"}>
            Ocupado
          </option>
          <option
            value="desocupado"
            disabled={newTerreno.status === "desocupado"}
          >
            Desocupado
          </option>
          <option
            value="Em_Descanso"
            disabled={newTerreno.status === "Em_Descanso"}
          >
            Em Descanso
          </option>
        </select>
      </Modal.Body>

      <div className={styles.footer}>
        <Modal.Footer>
          <div className={styles.containerBtns}>
            <button className={styles.btnclose} onClick={handleClose}>
              Cancelar
            </button>
            <button className={styles.btnedit} onClick={handleSave}>
              Salvar
            </button>
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default ModalEditTerreno;
