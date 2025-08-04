import { useState } from 'react';
import styles from './ModalModule.module.css';

const EditarColheita = ({ show, handleClose, colheita, handleSave }) => {
    const [updatedColheita, setUpdatedColheita] = useState({
        id: colheita.id, 
        id_cultura: colheita.cultura.id,
        id_terreno:colheita.terreno.id,
        condicao: colheita ? colheita.condicao : "",
        sacas: colheita ? colheita.sacas : 0,
        aprovacao: colheita ? colheita.aprovacao : "",
        feed_back: colheita ? colheita.feed_back : "",
        data_inicio: colheita ? colheita.data_inicio : "",
    });

    if (!show) {
        return null;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedColheita((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        console.log("Dados para salvar:", updatedColheita);
        handleSave(updatedColheita);
        handleClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Editar Colheita</h2>
                <label className={styles.label}>Condição:</label>
                <input
                    type="text"
                    name="condicao"
                    value={updatedColheita.condicao}
                    onChange={handleInputChange}
                    className={styles.input}
                />
                <label className={styles.label}>Sacas:</label>
                <input
                    type="number"
                    name="sacas"
                    value={updatedColheita.sacas}
                    onChange={handleInputChange}
                    className={styles.input}
                />
                <label className={styles.label}>Aprovação:</label>
                <select 
                 name="aprovacao"
                 value={updatedColheita.aprovacao}
                 onChange={handleInputChange}
                className={styles.select}>
                    <option value="aprovado" className={styles.option}>Aprovado</option>
                    <option value="reprovado" className={styles.option}>Reprovado</option>
                    <option value="realizado" className={styles.option}>Realizado</option>
                </select>
              
                <label className={styles.label}>Feedback:</label>
                <textarea
                    name="feed_back"
                    value={updatedColheita.feed_back}
                    onChange={handleInputChange}
                    className={styles.textarea}
                />
                <label className={styles.label}>Data:</label>
                <input
                    type="date"
                    name="data_inicio"
                    value={updatedColheita.data_inicio}
                    onChange={handleInputChange}
                    className={styles.input}
                />
                <div className={styles.modalButtons}>
                    <button
                        className={`${styles.modalButton} ${styles.fecharButton}`}
                        onClick={handleClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className={`${styles.modalButton} ${styles.editarButton}`}
                        onClick={handleSubmit}
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditarColheita;
