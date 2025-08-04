import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import styles from "../assets/styles/cadastroPlantio.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import ModalMessage from "../components/ModalMessage";
import { cadastrarColheita } from "../api/colheitas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faSquare,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Button } from "react-bootstrap";

import { carregarCulturas, deletarCultura } from "../api/culturas";
import { cadastrarPlantio } from "../api/plantios";
import {
  carregarTerrenos,
  cadastrarTerreno,
  atualizarTerrenos,
  deletarTerreno,
  carregaTerrenoPorId,
} from "../api/terrenos";
import { cadastrarEvento } from "../api/eventos";

import CultureModal from "../components/ModalCultura";
import TerrenoModal from "@/frontend/components/ModalTerreno/index.jsx";

export default function CadastroPlantio({ handleAddPlantation }) {
  const navigate = useNavigate();
  const [cultures, setCultures] = useState([]);
  const [culturaAtual, setCulturaAtual] = useState(null)
  const [plantio, setPlantio] = useState({
    id_cultura: null,
    id_terreno: null,
    dataPlantio: "",
  });

  const [novoTerreno, setNovoTerreno] = useState({
    nome: "",
    tamanho: "",
    tipo_solo: "",
    status: "",
    imagem: "",
  });

  const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [selectedCultureId, setSelectedCultureId] = useState(null);
  const [selectedTerrainId, setSelectedTerrainId] = useState(null);
  const [terrenos, setTerrain] = useState([]);
  const [showDesocupados, setShowDesocupados] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [selectedCulture, setSelectedCulture] = useState(null);

  const [selectedTerrain, setSelectedTerrain] = useState(null);
  const [showTerrainModal, setShowTerrainModal] = useState(false);

  const handleAddEventoPlantio = async (dadosPlantio) => {
    const dadosEventoPlantio = {
      tipoEvento: `Plantio de ${dadosPlantio.nomeCultura}`,
      plantio: {
        id: dadosPlantio.idPlantio,
      },
    };

    const newEventoPlantio = await cadastrarEvento(dadosEventoPlantio);
    if (newEventoPlantio) {
      console.log(newEventoPlantio);
    }
  };

  useEffect(() => {
    // Verifica se há uma mensagem no sessionStorage
    const storedMessage = sessionStorage.getItem("modalMessage");
    if (storedMessage) {
      setModalMessage(storedMessage);
      setIsModalMessageVisible(true);

      // Remove a mensagem do sessionStorage após 4 segundos
      setTimeout(() => {
        setIsModalMessageVisible(false);
        sessionStorage.removeItem("modalMessage"); // Remove a mensagem para não exibir novamente
      }, 3000);
    }
  }, []);

  // * Carregar Culturas e Terrenos

  const fetchData = async () => {
    // Carregar culturas
    const culturasData = await carregarCulturas();
    setCultures(Array.isArray(culturasData) ? culturasData : []);

    // Carregar terrenos
    const terrenosData = await carregarTerrenos();
    setTerrain(Array.isArray(terrenosData) ? terrenosData : []);
  };

  useEffect(() => {
    fetchData()
  }, []);

  // * Select Cultura ////////////////////////////////////////////////////////////

  const handleCardCultureClick = (culture) => {
    setSelectedCultureId(culture.id);
    setPlantio((prevPlantio) => ({
      ...prevPlantio,
      id_cultura: culture.id,
    }));
    console.log(selectedCultureId)

    cultures.map((c) => {
      if (c.id == culture.id) {
        setCulturaAtual(c)
      }
    })
    console.log(culturaAtual)

  };

  // * Select Terreno ////////////////////////////////////////////////////////////

  const handleCardTerrainClick = (terrain) => {
    setSelectedTerrainId(terrain.id);
    setPlantio((prevPlantio) => ({
      ...prevPlantio,
      id_terreno: terrain.id,
    }));


  };

  // * Salvar Data do Plantio ////////////////////////////////////////////////////

  const handleDataPlantioChange = (e) => {
    setPlantio({ ...plantio, dataPlantio: e.target.value });
  };

  // * Cadastrar Plantio /////////////////////////////////////////////

  const handleSavePlantio = async () => {
    if (!selectedCultureId || !selectedTerrainId) {
      alert("Por favor, selecione uma cultura e um terreno.");
      return;
    }

    try {
      // Carrega o terreno pelo ID selecionado
      const terrenoAtual = await carregaTerrenoPorId(selectedTerrainId);

      // Verifica se o terreno está ocupado
      if (
        terrenoAtual.status === "ocupado" ||
        terrenoAtual.status === "Ocupado"
      ) {
        sessionStorage.setItem('modalMessage', 'Escolha um terreno desocupado!');
        return;
      }

      const dadosPlantios = {
        id_cultura: selectedCultureId,
        id_terreno: selectedTerrainId,
        dataplantio: plantio.dataPlantio,
      }

      const response = await cadastrarPlantio(dadosPlantios);

      if (response) {
        const idPlantioCadastrado = response.id;
        console.log("ID do plantio cadastrado:", idPlantioCadastrado);

        const culturaSelecionada = cultures.find(
          (culture) => culture.id === selectedCultureId
        );
        const nomeCultura = culturaSelecionada
          ? culturaSelecionada.nomeCultura
          : "";
        console.log("Nome da cultura selecionada:", nomeCultura);

        const dadosEvento = {
          idPlantio: idPlantioCadastrado,
          nomeCultura: nomeCultura,
        };
        console.log("Dados do evento de plantio:", dadosEvento);

        handleAddEventoPlantio(dadosEvento);

        // Atualiza o status do terreno para "ocupado"
        terrenoAtual.status = "ocupado";
        const update = await atualizarTerrenos(selectedTerrainId, terrenoAtual);
        console.log(update);
      }
    } catch (error) {
      console.error("Erro ao cadastrar plantio:", error);
      // alert("Houve um erro ao cadastrar o plantio.");
    }
    navigate('/plantio');
  };

  // * Cadastrar Terreno ///////////////////////////////////////////

  const handleTerrenoChange = (e) => {
    const { name, value } = e.target;
    setNovoTerreno({
      ...novoTerreno,
      [name]: value,
    });
  };

  const handleCadastrarTerreno = async (e) => {
    e.preventDefault();

    try {
      await cadastrarTerreno(novoTerreno);
      setNovoTerreno({
        nome: "",
        tamanho: "",
        tipo_solo: "",
        status: "",
        imagem: "",
      });
      const updatedTerrenos = await carregarTerrenos();
      setTerrain(updatedTerrenos);
      setIsSidebarOpen(false);
    } catch (error) {
      console.error("Erro ao cadastrar terreno:", error);
      // alert("Houve um erro ao cadastrar o terreno.");
    }
  };

  // * Mostrar Terrenos Desocupados ///////////////////////////////////////////

  const handleShowDesocupados = () => setShowDesocupados(!showDesocupados);

  const handleDetalhesTerreno = (terreno) => {
    setShowTerrainModal(true);
    setSelectedTerrain(terreno);
  };

  const handleCloseTerrainModal = () => {
    setShowTerrainModal(false);
    setSelectedTerrain(null);
  };

  const handledeleteTerreno = async (terreno) => {
    try {
      const response = await deletarTerreno(terreno.id);
      if (response) {
        setTerrain(prevTerrenos => prevTerrenos.filter(t => t.id !== terreno.id));
      }
    } catch (error) {
      console.error("Erro ao deletar terreno:", error);
      alert("Houve um erro ao deletar o terreno.");
    }
  };

  const handleUpdateTerreno = async (terrenoAtualizado) => {
    try {
      const response = await atualizarTerrenos(
        selectedTerrain.id,
        terrenoAtualizado
      );
      if (response) {

        const terrenosAtualizados = terrenos.map((terreno) =>
          terreno.id === selectedTerrain.id ? response : terreno
        );
        setTerrain(terrenosAtualizados);
        setShowTerrainModal(false);
      }
    } catch (error) {
      console.error("Erro ao atualizar terreno:", error);
    }
  };

  // * Carregar terrenos na tela //////////////////////////////////////////////

  const renderTerrain = () => {
    const terrenosFiltrados = showDesocupados
      ? terrenos.filter(
        (terreno) =>
          terreno.status === "Desocupado" || terreno.status === "desocupado"
      )
      : terrenos;

    if (terrenosFiltrados.length === 0) {
      return (
        <div className={styles.semTerreno}>
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className={styles.icone}
          />
          <p className={styles.semTerrenoText}>Nenhum Terreno cadastrado.</p>
        </div>
      );
    } else {
      return (
        <Row className={styles.terrenosGrid}>
          {terrenosFiltrados.map((terrain) => (
            <Col
              key={terrain.id}
              className={`${styles.card} ${selectedTerrainId === terrain.id ? styles.selected : ""
                }`}
              onClick={() => handleCardTerrainClick(terrain)}
            >
              <img
                src={terrain.imagem}
                alt={`Imagem de ${terrain.nome}`}
                className={styles.cardImage}
              />
              <h3 className={styles.cardTitle}>{terrain.nome}</h3>
              <p className={styles.cardDescription}>{terrain.status}</p>
              <Button
                variant="primary"
                className={styles.cardButton}
                onClick={() => handleDetalhesTerreno(terrain)}
              >
                Detalhes
              </Button>
            </Col>
          ))}
        </Row>
      );
    }
  };

  // * Modal de Detalhes Cultura ////////////////////////////////////////////////////////////////////////

  const handleCardClick = (culture) => {
    setSelectedCulture(culture);
    setShowModal(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCulture(null);
  };

  // * Carregar culturas na tela //////////////////////////////////////////////

  const renderCultures = () => {
    if (cultures.length === 0) {
      return (
        <div className={styles.semCultura}>
          <div className={styles.divIcone}>
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className={styles.icone}
            />
          </div>
          <div className={styles.divSemCultura}>
          <p className={styles.semCulturaText}>Nenhuma Cultura cadastrada.</p>
          <p className={styles.semCulturaText}>
            Deseja cadastrar uma? <Link to="/cultura">Clique Aqui</Link>
          </p>
          </div>
        </div>
      );
    } else {
      return (
        <Row className={styles.culturasGrid}>
          {cultures.map((culture) => (
            <Col
              key={culture.id}
              className={`${styles.card} ${selectedCultureId === culture.id ? styles.selected : ""
                }`}
              onClick={() => handleCardCultureClick(culture)}
            >
              <img
                src={culture.imagem}
                alt={`Imagem de ${culture.nome}`}
                className={styles.cardImage}
              />
              <h3 className={styles.cardTitle}>{culture.nomeCultura}</h3>
              <p className={styles.cardDescription}>{culture.descricao}</p>
              <Button
                variant="primary"
                className={styles.cardButton}
                onClick={() => handleCardClick(culture)}
              >
                Detalhes
              </Button>
            </Col>
          ))}
        </Row>
      );
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        {/* Botão para abrir a sidebar */}
        <div className={styles.sidebarButtonContainer}>
          <button
            onClick={handleOpenSidebar}
            className={styles.btnCadastrarTerreno}
          >
            Cadastrar Terreno
          </button>
        </div>

        {/* Sidebar */}
        <div
          className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ""
            }`}
        >
          <div className={styles.headerSidebar}>
            <h3>Cadastrar Novo Terreno</h3>
            <button
              onClick={handleCloseSidebar}
              className={styles.closeSidebarButton}
            >
              X
            </button>
          </div>

          {/* Formulário de cadastro do terreno */}
          <form className={styles.form}>
            <label className={styles.label}>Nome</label>
            <input
              type="text"
              name="nome"
              value={novoTerreno.nome}
              onChange={handleTerrenoChange}
              className={styles.input}
              placeholder="Digite o nome do terreno"
            />

            <label className={styles.label}>Tamanho</label>
            <input
              type="text"
              name="tamanho"
              value={novoTerreno.tamanho}
              onChange={handleTerrenoChange}
              className={styles.input}
              placeholder="Digite o tamanho do terreno"
            />

            <label className={styles.label}>Tipo do Solo</label>
            <input
              type="text"
              name="tipo_solo"
              value={novoTerreno.tipo_solo}
              onChange={handleTerrenoChange}
              className={styles.input}
              placeholder="Digite o tipo de solo"
            />

            <label className={styles.label}>Status do Terreno</label>
            <select
              name="status"
              value={novoTerreno.status}
              onChange={handleTerrenoChange}
              className={styles.input}
            >
              <option disabled={true} value="">
                Selecione o status:{" "}
              </option>
              <option value="ocupado">Ocupado</option>
              <option value="desocupado">Desocupado</option>
              <option value="Em_Descanso">Em Descanso</option>
            </select>

            <label className={styles.label}>Imagem (URL)</label>
            <input
              type="text"
              name="imagem"
              value={novoTerreno.imagem}
              onChange={handleTerrenoChange}
              className={styles.input}
              placeholder="URL da imagem do terreno"
            />

            <button
              type="submit"
              variant="success"
              className={styles.submitButton}
              onClick={handleCadastrarTerreno}
            >
              Salvar Terreno
            </button>
          </form>
        </div>

        <div className={styles.terrenosSection}>
          <h2>Selecione um Terreno</h2>
          {renderTerrain()}
          <div className={styles.sidebarButtonContainer}>
            <button
              onClick={handleShowDesocupados}
              className={styles.btnFiltrarDesocupados}
            >
              <label className={styles.labelDesocupados}>
                Mostrar Desocupados:{" "}
              </label>
              {showDesocupados ? (
                <FontAwesomeIcon icon={faSquareCheck} />
              ) : (
                <FontAwesomeIcon icon={faSquare} />
              )}
            </button>
          </div>
        </div>

        <div className={styles.culturasSection}>
          <h2>Selecione uma Cultura</h2>
          {renderCultures()}
        </div>

        <div className={styles.dataSection}>
          <label className={styles.label}>Data de Plantio:</label>
          <input
            type="date"
            name="dataPlantio"
            value={plantio.dataPlantio}
            onChange={handleDataPlantioChange}
            className={styles.input}
          />
        </div>

        {/* Modal de Detalhes da Cultura */}
        {selectedCulture && (
          <CultureModal
            show={showModal}
            handleClose={handleCloseModal}
            culture={selectedCulture}
          />
        )}

        {/* Modal de Detalhes do Terreno */}
        {selectedTerrain && (
          <TerrenoModal
            show={showTerrainModal}
            handleClose={handleCloseTerrainModal}
            terreno={selectedTerrain}
            handleDelete={handledeleteTerreno}
            handleUpdateTerreno={handleUpdateTerreno}
            setTerrain={setTerrain}
          />
        )}

        <div className={styles.buttonContainer}>
          <button onClick={handleSavePlantio} className={styles.saveButton}>

            Salvar Plantio
          </button>
        </div>
      </div>
      <ModalMessage
        message={sessionStorage.getItem("modalMessage")}
        show={isModalMessageVisible}
      />
      <Footer />
    </div>
  );
}
