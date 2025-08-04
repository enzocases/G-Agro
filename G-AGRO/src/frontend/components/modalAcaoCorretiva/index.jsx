import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import styles from "./modalAcaoCorretiva.module.css";

function AcaoCorretivaModal({ show, handleClose, colheita, handleAdd }) {
  
  const [dadosAcao, setDadosAcao] = useState({
    id_colheita: colheita.id,
    descricao: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target
    setDadosAcao({
      ...dadosAcao,
      [name]: value
    });
  };

 
  return (
    <Modal show={show} onHide={handleClose} centered className={styles.modal}>
      <Modal.Header className={styles.header}>
        <h2>Ações Corretivas</h2>
      </Modal.Header>
      <div className={styles.container}>
        <Modal.Body>
          <form>
            <label className={styles.label}>Descrição: </label>
            <textarea
              className={styles.textarea}
              name="descricao"
              onChange={handleChange}
              placeholder="Digite a descrição da Ação Corretiva"
            ></textarea>
          </form>
        </Modal.Body>
      </div>
      <div className={styles.footer}>
        <Modal.Footer>
          <div className={styles.containerBtns}>
            <button
              className={styles.btnadd}
              onClick={() => {
                handleAdd(dadosAcao);
              }}
            >
              Adicionar
            </button>
            <button className={styles.btnclose} onClick={handleClose}>
              Cancelar
            </button>
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default AcaoCorretivaModal;
