import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import MenuLateral from "../MenuLateral"; 
import logo from "../../assets/imgs/logoMinimalista-semBg.png";
import user from "../../assets/imgs/user1.png"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarehouse, faSeedling, faWheatAwnCircleExclamation, faCarrot, faChartPie } from "@fortawesome/free-solid-svg-icons";

{
  /*
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Kay+Pho+Du:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
*/
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Define se o scroll ultrapassou 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll"); // Adiciona uma classe
    } else {
      document.body.classList.remove("no-scroll"); // Remove a classe
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  useEffect(() => {
    // Adicionar estilo no body quando o menu estiver aberto
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsClosed(false);
    } else {
      document.body.style.overflow = "auto"; 
      if (!isOpen) setIsClosed(true);
    }

    // Limpeza ao desmontar
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);



  return (
    <div
      className={`${styles.main} ${isScrolled ? styles.scrolled : ""
        }`}
    >
      <div className={styles.container}>
        <div className={styles.logo}>
          <a className="navbar-brand">
          </a>
          <h1>G-AGRO</h1>
        </div>

        <div className={styles.mainMenu}>
          <Link to="/">Home</Link>
          <a href="/cadastro">Login</a>
          <a href="/sobre">Sobre</a>
          <a href="">Contato</a>
        </div>

     
        <div className={styles.menuButton} onClick={() => setIsOpen(!isOpen)}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>

        {isOpen && (
          <div
            className={styles.overlay}
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        <div className={`${styles.sidebar} ${isOpen ? styles.show : ""} ${isClosed ? styles.closed : ""}`}>
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
            <Link to="/perfil">Perfil  &raquo;</Link>
          </div>

        </div>
     
      </div>
    </div>
  );
}
