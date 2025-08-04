import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import CultureCard from "../components/Card";
import CultureModal from "../components/ModalCultura";
import Navbar from "../components/Navbar";
import EditModal from "../components/ModalEdit";
import Footer from "../components/Footer";
import AddCultureModal from "../components/AddCultureModal";
import styles from "../assets/styles/cultura.module.css"
import ModalMessage from "../components/ModalMessage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import {
  carregarCulturas,
  cadastrarCultura,
  atualizarCultura,
  deletarCultura,
} from "../api/culturas";



const CultureManagement = () => {
  const [cultures, setCultures] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedCulture, setSelectedCulture] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isModalMessageVisible, setIsModalMessageVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState("")


  // * Verificar mensagem na session Storage
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

  // * Faz o carregamento de culturas
  useEffect(() => {
    const fetchCultures = async () => {
      const data = await carregarCulturas();
      console.log(data)
      if (data) {
        setCultures(data);
      }
    };
    fetchCultures();
  }, []);

  // * Cuida da pesquisa de uma cultura
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // const handleFilter = (type) => {
  //   setFilterType(type);
  // };

  // const filteredCultures = cultures.filter((culture) => {
  //   return (
  //     culture.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //     (filterType === "" || culture.type === filterType)
  //   );
  // });
  // }


  // * Cuida do clique no card, para abrir o modal
  const handleCardClick = (culture) => {
    setSelectedCulture(culture);
    setShowModal(true);
  };

  // * Cuida do botão de editar a cultura
  const handleCardClickEdit = (culture) => {
    setShowModal(false);
    setSelectedCulture(culture);
    setShowModalEdit(true);
  };



  // * Cuida do botão de deletar a cultura
  const handleDelete = async (culture) => {
    console.log("Deletando cultura com ID:", culture.id)
    const success = await deletarCultura(culture.id);
    if (success) {
      const newCultures = cultures.filter((c) => c.id !== culture.id);
      setCultures(newCultures);
      handleCloseModal();
    } else {
      console.error("Erro ao deletar a cultura");
    }
  };

  // * Cuida do botão de fechar modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCulture(null);
    setShowModalEdit(false);
    setShowAddModal(false);
  };

  // * Cuida do botão de atualizar a cultura
  const handleSave = async (culture) => {
    const updatedCulture = await atualizarCultura(culture.id, culture);
    if (updatedCulture) {
      const newCultures = cultures.map((c) =>
        c.id === culture.id ? updatedCulture : c
      );
      setCultures(newCultures);
      handleCloseModal();
    } else {
      console.error("Erro ao atualizar a cultura");
    }
  };



  // * Cuida do cadastro de uma cultura
  const handleAddCulture = async (culture) => {
    console.log("Adicionando nova cultura: ", culture)
    const newCulture = await cadastrarCultura(culture);
    if (newCulture) {
      setCultures((prevCultures) => [...prevCultures, newCulture]);
      handleCloseModal();
    } else {
      console.error("Erro ao adicionar nova cultura");
    }
  };

  // * Cuida da limpeza dos inputs
  const clearInputs = () => {
    setInputValues({
      name: "",
      description: "",
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: "#333" }}>
      {" "}
      <Navbar />
      {/* Menu suspenso e botão à direita */}
      <Container className="my-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: "30px" }}>
        

        {/* Botão alinhado à direita */}
        <Row>
          <div className={styles.containerTitle}>

       
          <div className={styles.title}>
            <h1 className={styles.h1}>Gerenciamento de Culturas</h1>
          </div>
    <div className={styles.containerBtn}>
            <div
              className={styles.btnAdd}
              onClick={() => setShowAddModal(true)}
            >
              Adicionar Nova Cultura
            </div>
          </div>
          </div>
        </Row>
      </Container>
      <Container className="culture-management-container my-5 flex-grow-1">
        {" "}
        {/* Ajuste aqui */}
        <Row className="justify-content-center">
          {cultures.length > 0 ? (
            cultures.map((culture) => (
              <Col
                key={culture.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="d-flex justify-content-center mb-4"
              >
                <CultureCard
                  culture={culture}
                  onClick={() => handleCardClick(culture)}
                />
              </Col>
            ))
          ) : (
            <div className={styles.semCultura}>
              <div className={styles.divIcone}>
                <FontAwesomeIcon icon={faTriangleExclamation} className={styles.icone} />
              </div>
              <div className={styles.divSemCultura}>
                <p className={styles.semCulturaText}>Nenhuma cultura cadastrada.</p>
                <p className={styles.semCulturaText}>
                  Deseja cadastrar um?{" "}
                  <a href="#" onClick={() => { setShowAddModal(true) }}>
                    Clique aqui
                  </a>
                </p>
              </div>
            </div>
          )}
        </Row>
        {selectedCulture && (
          <>
            <CultureModal
              show={showModal}
              handleClose={handleCloseModal}
              handleEdit={handleCardClickEdit}
              handleDelete={() => handleDelete(selectedCulture)}
              culture={selectedCulture}
            />
            <EditModal
              show={showModalEdit}
              handleClose={handleCloseModal}
              culture={selectedCulture}
              handleSave={handleSave}
            />
          </>
        )}
        <AddCultureModal
          show={showAddModal}
          handleClose={handleCloseModal}
          handleAdd={handleAddCulture}
        />
      </Container>

      <ModalMessage
        message={sessionStorage.getItem("modalMessage")}
        show={isModalMessageVisible}
      />

      {/* Secao Contato (Rodapé) */}
      <Footer></Footer>
    </div>
  );
};

export default CultureManagement;
