import styles from "../assets/styles/plantio.module.css";
import {
  Container,
  Dropdown,
  Navbar,
  Collapse,
  NavLink,
  NavItem,
  DropdownItem,
  NavbarBrand,
  Nav,
  Card,
  Button,
  CardBody,
} from "react-bootstrap";
import NavbarComponent from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import ModalPlantio from "../components/AddPlantioModal";
import { Link } from "react-router-dom";
import PlantioModal from "../components/ModalPlantio";
import ModalEditPlantio from "../components/ModalEditPlantio";
import ModalMessage from "../components/ModalMessage";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faSearch,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { Route, Routes } from "react-router-dom";
import CadastroPlantio from "./CadastroPlantio";

import { atualizarPlantios, carregarPlantios, deletarPlantio } from "../api/plantios"
import { cadastrarEvento } from "../api/eventos";
import { carregaCulturaPorId } from "../api/culturas";
import { atualizarTerrenos } from "../api/terrenos";


export default function Plantio() {
  const [plantios, setPlantios] = useState([]);
  const [dropdownFiltrarOpen, setDropdownFiltrarOpen] = useState(false);
  const [dropdownCalendarioOpen, setDropdownCalendarioOpen] = useState(false);
  const [showAddPlantationModal, setShowAddPlantationModal] = useState(false);
  const [selectedPlantio, setSelectedPlantio] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isModalMessageVisible, setIsModalMessageVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState("")

  const handleAddPlantation = (novoPlantio) => {
    const newId = plantios.length ? plantios[plantios.length - 1].id + 1 : 1;
    const newPlantation = { ...novoPlantio, id: newId };
    setPlantios([...plantios, newPlantation]);
    setShowAddPlantationModal(false);
  };

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

  // Carregar plantios no momento da montagem do componente

  useEffect(() => {
    async function fetchPlantios() {
      const data = await carregarPlantios();
      if (data) {
        // Mapeia os dados dos plantios para incluir apenas os campos desejados
        const plantiosSimplificados = data.map((plantio) => ({
          id: plantio.id,
          nomeCultura: plantio.cultura.nomecultura,
          tamanho: plantio.terreno.tamanho,
          idTerreno: plantio.terreno.id,
          idCultura: plantio.cultura.id,
          dataPlantio: plantio.dataplantio,
          imagemCultura: plantio.cultura.imagem,
          imagemTerreno: plantio.terreno.imagem,
          nomeTerreno: plantio.terreno.nome,
          tipoSolo: plantio.terreno.tipo_solo
        }));
        setPlantios(plantiosSimplificados);
      }
    }
    fetchPlantios();
  }, []);

  function adicionarDias(data, dias) {
    const novaData = new Date(data); // Cria uma nova data para não modificar a original
    novaData.setDate(novaData.getDate() + dias); // Adiciona os dias
    return novaData;
  }

  

  // const handleAddEventoColheita = async (dadosPlantio) =>{
  //   const cultura = await carregaCulturaPorId(dadosPlantio.idCultura)

  //   if(!cultura){
  //     console.error("Cultura não encontrada!")
  //     return;
  //   }

  //   const dataPlantio = new Date(dadosPlantio.dataPlantio)
  //   const tempoPlantio = cultura.tempoPlantio

  //   const dataColheita = adicionarDias(dataPlantio, tempoPlantio)

  //   dadosPlantio.setDate(dataColheita)

  //   const dadosEventoColheita = {
  //     tipoEvento: `Colheita de ${dadosPlantio.nomeCultura}`,
  //     plantio:{
  //       id:
  //     }
  //   }

  // }

  // * Deletar plantio

  const handleDelete = async (plantio) => {
    console.log("Plantio para deletar:", plantio);
    if (!plantio || !plantio.id) {
      console.error("Plantio ou ID indefinido.");
      return;
    }

    // const dadosTerreno = {
    //   id: plantio.idTerreno,
    //   nome: plantio.nomeTerreno,
    //   status: "desocupado",
    //   tamanho: plantio.tamanho,
    //   tipoSolo: plantio.tipoSolo,
    //   imagem: plantio.imagemTerreno
    // }

    // const responseTerreno = await atualizarTerrenos(dadosTerreno.id, dadosTerreno)
    const response = await deletarPlantio(plantio.id);
    console.log(response)
    
    if (response) {
      const updatedPlantios = plantios.filter((p) => p.id !== plantio.id);
      setPlantios(updatedPlantios); // Atualiza a lista de plantios
      setShowModal(false);
      setSelectedPlantio(null);
    } else {
      console.error("Erro ao deletar plantio");
    }
  };


  const handleCardClick = (plantio) => {
    setSelectedPlantio(plantio);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedPlantio(null);
    setShowAddPlantationModal(false);
  };

  const handleEdit = () => {
    setShowModal(false);
    setShowEditModal(true);
  };

  const renderPlantios = () => {
    if (plantios.length === 0) {
      return (
        <div className={styles.semPlantio}>
          <div className={styles.divIcone}>
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className={styles.icone}
            />
          </div>
          <div className={styles.divSemPlantio}>
            <p className={styles.semPlantioText}>Nenhum plantio cadastrado.</p>
            <p className={styles.semPlantioText}>
              Deseja cadastrar um? <Link to="/cadastro-plantio">Clique Aqui</Link>
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.listaPlantios}>
        {plantios.map((plantio, index) => (
          <Card key={index} className={styles.cardPlantio}>
            <CardBody className={styles.cardEsquerda}>
              <Card.Img
                variant="top"
                src={plantio.imagemTerreno}
                alt="Imagem do Terreno"
              />
              <img
                src={plantio.imagemCultura}
                alt="Imagem da Cultura"
                className={styles.culturaImage}
              />
            </CardBody>
            <Card.Body className={styles.cardDireita}>
              <div className={styles.conteudo}>
                <div className={styles.culturaContainer}>
                  <h5>Cultura Selecionada:</h5>

                  <Card.Title>{plantio.nomeCultura}</Card.Title>
                </div>

                <div className={styles.descricaoContainer}>
                  <h5>Tamanho do Terreno:</h5>
                  <Card.Text className={styles.descricaoText}>
                    {plantio.tamanho} Hectares
                  </Card.Text>
                </div>
              </div>
              <div className={styles.btnContainer}>
                <Button
                  variant="primary"
                  onClick={() => handleCardClick(plantio)}
                >
                  Ver Detalhes
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  };




  return (
    <div className={styles.main}>
      <NavbarComponent></NavbarComponent>
      
      <Routes>
        <Route
          path="/cadastro-plantio"
          element={
            <CadastroPlantio handleAddPlantation={handleAddPlantation} />
          }
        />
        {/* Outras rotas */}
      </Routes>

      {/* Cabeçalho (Uma imagem ao lado de um texto como tem na home para explicar o que seria esta tela) */}
      {/*
      <div className={styles.cabecalhoContainer}>
        <h1 className={styles.titulo}>Planejamento de Plantio</h1>
        <div className={styles.cardCabecalho}>

          <p className={styles.descricao}>
            Utilize esta tela para gerenciar e planejar suas atividades de plantio.
            Aqui você pode cadastrar novos plantios, visualizar o histórico e ajustar suas configurações.
          </p>

        </div>
      </div>
*/}
      {/* Menu */}
      <div className={styles.menu}>
        <div className={styles.menuEsquerda}>
          <div className={styles.menuItem}>
            <Link to="/cadastro-plantio">Cadastrar Plantio</Link>
          </div>

          <div className={styles.menuItem}>
            <Link to="/calendario">Visualizar Calendário</Link>
          </div>
        </div>
        <div className={styles.menuDireita}>
          <div className={styles.filtrar}>
            <div
              className={styles.btnFiltrar}
              onClick={() => setDropdownFiltrarOpen(!dropdownFiltrarOpen)}
            >
              <FontAwesomeIcon
                icon={faFilter}
                className={styles.iconeFiltrar}
              />
              Filtrar
            </div>

            <div
              className={`${styles.dropdownFiltrar} ${dropdownFiltrarOpen ? styles.show : ""
                }`}
            >
              <label className={styles.label}>Tamanho do Terreno</label>
              <input
                type="text"
                placeholder="Ex: 10 hectares"
                className={styles.inputFiltrar}
              />
              <label className={styles.label}>Tipo de Cultura</label>
              <input
                type="text"
                placeholder="Ex: Milho"
                className={styles.inputFiltrar}
              />
              <label className={styles.label}>Data do Plantio</label>
              <input type="date" className={styles.inputFiltrar} />
              <button className={styles.btnFiltrarAplicar}>
                Aplicar Filtros
              </button>
            </div>
          </div>

          <div className={styles.pesquisa}>
            <div className={styles.divInputPesquisa}>
              <input
                type="text"
                placeholder="Pesquisar..."
                className={styles.inputPesquisa}
              />
            </div>
            <div className={styles.divBtnPesquisa}>
              <div className={styles.btnPesquisar}>
                <FontAwesomeIcon icon={faSearch} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Espaço para listar os plantios cadastrados */}

      <div className={styles.areaPlantios}>{renderPlantios()}</div>

      {/* Modais */}

      {selectedPlantio && (
        <PlantioModal
          show={showModal}
          handleClose={handleClose}
          plantio={selectedPlantio}
          handleEdit={handleEdit} // Passa o plantio selecionado para edição
          handleDelete={() => handleDelete(selectedPlantio)}
        />
      )}

      {selectedPlantio && (
        <ModalEditPlantio
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          plantio={selectedPlantio} // Passa todos os valores de selectedPlantio
          handleSave={() => handleSave(selectedPlantio)}
        />
      )}
      <ModalMessage
        message={sessionStorage.getItem("modalMessage")}
        show={isModalMessageVisible}
      />

      <Footer></Footer>
    </div>
  );
}
