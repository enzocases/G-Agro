import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarehouse, faSeedling, faWheatAwnCircleExclamation, faCarrot, faChartPie } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./menuLateral.module.css";
import { useState } from "react";
import user from "../../assets/imgs/user1.png";

export default function MenuLateral() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão para abrir o menu lateral */}
      <div className={styles.menuButton} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>

      {/* Overlay para fechar o menu ao clicar fora */}
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>
      )}

      {/* Menu lateral */}
      <div className={`${styles.sidebar} ${isOpen ? styles.show : ""}`}>
        <span className={styles.closeButton} onClick={() => setIsOpen(false)}>
          &times;
        </span>
        <h2>Área do Agricultor</h2>
        <hr />

        <div className={styles.caminhoMenu}>
          <FontAwesomeIcon icon={faSeedling} className={styles.icone} />
          <Link to="/plantio">Plantio</Link>
        </div>
        <div className={styles.caminhoMenu}>
          <FontAwesomeIcon icon={faWheatAwnCircleExclamation} className={styles.icone} />
          <a href="/colheita">Colheita</a>
        </div>

        <div className={styles.caminhoMenu}>
          <FontAwesomeIcon icon={faWarehouse} className={styles.icone} />
          <a href="/estoque">Estoque</a>
        </div>

        <div className={styles.caminhoMenu}>
          <FontAwesomeIcon icon={faCarrot} className={styles.icone} />
          <Link to="/cultura">Culturas</Link>
        </div>

        <div className={styles.caminhoMenu}>
          <FontAwesomeIcon icon={faChartPie} className={styles.icone} />
          <Link to="/painel-controle">Painel de Controle</Link>
        </div>

        <div className={styles.perfil}>
          <img src={user} alt="Perfil" />
          <Link to="/perfil">Perfil &raquo;</Link>
        </div>
      </div>
    </>
  );
}
