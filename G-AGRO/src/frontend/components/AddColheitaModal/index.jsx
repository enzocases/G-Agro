import { useState, useEffect } from "react";
import styles from "./addColheitaModal.module.css";
import { Modal, ModalBody } from "react-bootstrap";
import { carregarCulturas } from "../../api/culturas";
import { carregarTerrenos } from "../../api/terrenos";
import { carregarPlantios } from "../../api/plantios";

const RegistrarColheitaModal = ({ show, handleClose, handleSave }) => {
  const [novaColheita, setNovaColheita] = useState({
    id_cultura: "",
    id_terreno: "",
    data_inicio: "",
    sacas: 0,
    condicao: "",
    aprovacao: "reprovado",
  });

  const [plantios, setPlantios] = useState([]);
  const [culturaAtual, setCulturaAtual] = useState(null)
  const [terrenosFiltrados, setTerrenosFiltrados] = useState([])

  const exibidos = new Set();

  useEffect(() => {
    async function fetchPlantios() {
      const data = await carregarPlantios();
      if (data) {
        setPlantios(data);
      }
      console.log(data)
    }
    fetchPlantios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNovaColheita((prevState) => {
      const updatedState = {
        ...prevState,
        [name]: value,
      };

      return updatedState;
    });
  };

  const salvarColheita = () => {
    handleSave(novaColheita);
    handleClose();
  };

  if (!show) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <div className={styles.main}>
        <Modal.Body className={styles.container}>
          <h2 className={styles.h2}>Registrar Nova Colheita</h2>
          <form>
            <div className={styles.divCulturaTerreno}>
              <label className={styles.label}>
                Cultura:
                <select
                  name="id_cultura"
                  value={novaColheita.id_cultura}
                  onChange={handleChange}
                  className={styles.select}
                >
                  
                  <option value="" disabled>Selecione uma cultura</option>
                  {plantios.map((plantio) => {
                    if(!exibidos.has(plantio.cultura.nomecultura)){
                      exibidos.add(plantio.cultura.nomecultura)
                      return(
                        <option key={plantio.cultura.id} value={plantio.cultura.id}>
                          {plantio.cultura.nomecultura}
                        </option>
                      )
                    }
                    return null;
                  })}
                </select>
              </label>
              <label className={styles.label}>
                Terreno:
                <select
                  name="id_terreno"
                  value={novaColheita.id_terreno}
                  onChange={handleChange}
                  className={styles.select}
                  disabled={!novaColheita.id_cultura} // Desabilita se nenhuma cultura for selecionada
                >
                  <option value="" disabled>Selecione um terreno</option>
                  {plantios.map((plantio) => {
                      if(plantio.cultura.id == novaColheita.id_cultura){
                        return (
                          <option key={plantio.terreno.id} value={plantio.terreno.id}>
                              {plantio.terreno.nome}
                          </option>  
                        )
                      } 
                  })}
                </select>
              </label>
            </div>
            <div className={styles.divDataSacas}>
              <label className={styles.label}>
                Data de Início:
                <input
                  type="date"
                  name="data_inicio"
                  value={novaColheita.data_inicio}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
              <label className={styles.label}>
                Sacas:
                <input
                  type="number"
                  name="sacas"
                  value={novaColheita.sacas}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
            </div>
            <label className={styles.label}>
              Condição:
              <textarea
                name="condicao"
                value={novaColheita.condicao}
                onChange={handleChange}
                className={styles.textarea}
              />
            </label>
            <div className={styles.footer}>
              <div className={styles.containerBtns}>
                <button
                  className={styles.salvarBtn}
                  type="button"
                  onClick={salvarColheita}
                >
                  Salvar
                </button>
                <button
                  className={styles.cancelarBtn}
                  type="button"
                  onClick={handleClose}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default RegistrarColheitaModal;
