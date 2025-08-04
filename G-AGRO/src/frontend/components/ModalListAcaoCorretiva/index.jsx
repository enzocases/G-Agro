import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import styles from "./modalListAcaoCorretiva.module.css";
import { carregarAcoesCorretivasPorColheita } from "../../api/acaoCorretiva";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ListarAcoesCorretivasModal({
  show,
  handleClose,
  colheita,
}) {
  const [acoesCorretivas, setAcoesCorretivas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para carregar as ações corretivas
  const carregarDados = async () => {
    setLoading(true);
    console.log("Colheita: ", colheita);

    try {
      if (!colheita?.id) {
        console.error("ID da colheita não fornecido.");
        setAcoesCorretivas([]);
        setLoading(false);
        return;
      }

      const response = await carregarAcoesCorretivasPorColheita(colheita.id);

      if (Array.isArray(response)) {
        setAcoesCorretivas(response);
      } else {
        console.warn("Resposta inesperada. Inicializando com array vazio.");
        setAcoesCorretivas([]);
      }
    } catch (error) {
      console.error("Erro ao carregar ações corretivas:", error);
      setAcoesCorretivas([]);
    } finally {
      setLoading(false);
    }
  };

  // Carrega os dados toda vez que o modal for aberto
  useEffect(() => {
    if (show) {
      carregarDados();
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose} centered className={styles.modal}>
      <Modal.Header className={styles.header}>
        <h2>Lista de Ações Corretivas</h2>
      </Modal.Header>
      <div className={styles.container}>
        <Modal.Body>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <>
              {acoesCorretivas.length === 0 ? (
                <div className={styles.semAcaoCorretiva}>
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className={styles.icone}
                  />
                  <p className={styles.semAcaoCorretivaText}>Não há ações corretivas cadastradas.</p>
                </div>
              ) : (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.th}>ID</th>
                      <th className={styles.th}>Descrição</th>
                    </tr>
                  </thead>
                  <tbody>
                    {acoesCorretivas.map((acao) => (
                      <tr key={acao.id}>
                        <td className={styles.td}>{acao.id}</td>
                        <td className={styles.td}>{acao.descricao}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </Modal.Body>
      </div>
      <div className={styles.footer}>
        <Modal.Footer>
          <button className={styles.btnclose} onClick={handleClose}>
            Fechar
          </button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default ListarAcoesCorretivasModal;
