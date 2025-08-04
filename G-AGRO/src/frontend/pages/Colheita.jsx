import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../assets/styles/colheita.module.css";
import NavbarComponent from "../components/Navbar";
import Footer from "../components/Footer";
import GraficoEstoque from "../components/GraficoColheita";
import { Bar } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faScroll,
  faCirclePlus,
  faSearch,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

import {
  carregarColheitas,
  atualizarColheita,
  cadastrarColheita,
} from "../api/colheitas";

import { cadastrarAcaoCorretiva, carregarAcaoCorretiva } from "../api/acaoCorretiva";
import { carregarTerrenos } from "../api/terrenos";

import AcaoCorretivaModal from "../components/modalAcaoCorretiva";
import RegistrarColheitaModal from "../components/AddColheitaModal";
import ListarAcoesCorretivasModal from "../components/ModalListAcaoCorretiva";

import EditarColheita from "../components/ModalEditColheita/EditarColheita";
import { deletarColheita } from "../api/colheitas";
import ModalMessage from "../components/ModalMessage";



const Colheita = () => {

  const [modalMessage, setModalMessage] = useState("");
  const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
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

  const [colheita, setColheita] = useState([]);
  const [terrenos, setTerrenos] = useState([]);
  const [detalhesVisiveis, setDetalhesVisiveis] = useState(null);
  const [showAcaoCorretiva, setShowAcaoCorretiva] = useState(false);
  const [selectedColheita, setSelectedColheita] = useState(null);
  const [acaoCorretiva, setAcaoCorretiva] = useState([]);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [colheitaSelecionada, setColheitaSelecionada] = useState(null);
  const [culturasSelecionadas, setCulturasSelecionadas] = useState([]);

  const [colheitaParaColheita, setColheitaParaColheita] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [dropdownFiltrarOpen, setDropdownFiltrarOpen] = useState(false);

  const formatarData = (data) => {
    const dataObj = new Date(data); // Cria um objeto Date
    const dia = String(dataObj.getDate()).padStart(2, "0"); // Extrai e formata o dia
    const mes = String(dataObj.getMonth() + 1).padStart(2, "0"); // Extrai e formata o mês
    const ano = dataObj.getFullYear(); // Extrai o ano

    return `${parseInt(dia) + 1}/${mes}/${ano}`; // Retorna no formato dd/mm/yyyy
  };

  useEffect(() => {
    const fetchColheitas = async () => {
      const data = await carregarColheitas();
      if (data) {
        setColheita(data);
        const culturas = [
          ...new Set(data.map((item) => item.cultura.nomecultura)),
        ];
        setCulturasSelecionadas(culturas);
      } else {
        console.error("Erro ao carregar as colheitas!");
      }
    };

    fetchColheitas();
  }, []);

  const handleSelectColheita = (colheita) => {
    setColheitaSelecionada(colheita);
    setShowAcaoCorretiva(true);
  };

  const handleClose = () => {
    setShowAcaoCorretiva(false);
  };

  const toggleDetalhes = (index) => {
    setDetalhesVisiveis(detalhesVisiveis === index ? null : index);
  };

  const handleAddAcao = async (acaoCorretiva) => {
    const dadosAcao = {
      id_colheita: acaoCorretiva.id_colheita,
      descricao: acaoCorretiva.descricao,
    };

    const newAcao = await cadastrarAcaoCorretiva(dadosAcao);
    if (newAcao) {
      setAcaoCorretiva(newAcao);
    }
    setShowAcaoCorretiva(false)
  };

  const abrirEditarModal = (colheita) => {
    setColheitaSelecionada(colheita);
    setShowEditarModal(true);
  };

  const fecharEditarModal = () => {
    setShowEditarModal(false);
    setColheitaSelecionada(null);
  };

  const handleDelete = async (id) => {

    const response = await deletarColheita(id);
    if (response) {
      sessionStorage.setItem("modalmessage", "Colheita deletada com sucesso!");
      setColheita((prevColheita) =>
        prevColheita.filter((item) => item.id !== id)
      );
    }

  };

  const salvarEdicao = async (colheitaAtualizada) => {
    try {
      const response = await atualizarColheita(
        colheitaSelecionada.id,
        colheitaAtualizada
      );
      if (response) {
        setColheita((prevColheitas) =>
          prevColheitas.map((item) =>
            item.id === colheitaAtualizada.id
              ? { ...item, ...colheitaAtualizada }
              : item
          )
        );
      } 
    } catch (error) {
      console.error("Erro ao atualizar a colheita:", error);
    }
  };

  const realizarColheita = async (id) => {
    const colheitaAtual = colheita.filter((c) => c.id == id).at(0)
    const dadosColheita = {
      id: colheitaAtual.id,
      aprovacao: "realizado",
      id_cultura: colheitaAtual.cultura.id,
      id_terreno: colheitaAtual.terreno.id,
      data_inicio: colheitaAtual.data_inicio,
      condicao: colheitaAtual.condicao,
      feed_back: colheitaAtual.feed_back,
      sacas: colheitaAtual.sacas
    }

    try {
      const colheitaAtualizada = await atualizarColheita(dadosColheita.id, dadosColheita);
      if (colheitaAtualizada) {
        setColheita((prevColheitas) =>
          prevColheitas.map((item) =>
            item.id === id ? { ...item, ...colheitaAtualizada.aprovacao } : item
          )
        );
      }
    } catch (error) {
      console.error("Erro ao realizar a colheita:", error);
      alert("Erro ao realizar a colheita.");
    }
  };

  const colheitasNaoRealizadas = colheita.filter(
    (item) => item.aprovacao === "reprovado" || item.aprovacao === "aprovado" // Filtra colheitas desaprovadas para pendentes
  );

  const colheitasRealizadas = colheita.filter(
    (item) => item.aprovacao === "realizado" // Filtra colheitas aprovadas para realizadas
  );

  const renderColheitas = (colheitas, realizadas = false) => {
    if (colheitas.length === 0) {
      return (
        <div className={styles.semColheita}>
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className={styles.icone}
          />
          <p className={styles.semColheitaText}>
            {realizadas
              ? "Nenhuma colheita realizada."
              : "Nenhuma colheita pendente."}
          </p>
        </div>
      );
    } else {
      return colheitas.map((item, index) => (
        <div className={styles.cardContainer} key={index}>
          <div className={styles.cardHeader}>
            <img
              className={styles.imgTerreno}
              src={item.terreno.imagem}
              alt="Terreno"
            />
            <img
              className={styles.imgCultura}
              src={item.cultura.imagem}
              alt={item.cultura.nomecultura}
            />
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardTitulo}>
              <h2>{item.cultura.nomecultura}</h2>
              <div className={styles.acaoCorretiva}>
                <span className={styles.addAcao}>Ação Corretiva</span>
                <span onClick={() => handleSelectColheita(item)}>
                  <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon>
                </span>
                <span onClick={() => handleAbrirListagemAcoes(item)}>
                  <FontAwesomeIcon icon={faScroll}></FontAwesomeIcon>
                </span>
              </div>
            </div>
            <p className={styles.cardText}>Condição: {item.condicao}</p>
            <p className={styles.cardFeedback}>{item.feed_back}</p>

            {detalhesVisiveis === index && (
              <div className={styles.detalhes}>
                <p className={styles.cardText}>
                  Data Início:{" "}
                  {item.data_inicio ? formatarData(item.data_inicio) : "N/A"}
                </p>
                <p className={styles.cardText}>
                  Sacas: {item.sacas ? item.sacas.toString() : "N/A"}
                </p>
                <p className={styles.cardText}>
                  Aprovação:{" "}
                  {item.aprovacao ? item.aprovacao.toString() : "N/A"}
                </p>
              </div>
            )}

            {!realizadas && (
              <button
                className={styles.detalhesBtn}
                onClick={() => realizarColheita(item.id)}
              >
                Realizar Colheita
              </button>
            )}

            <button
              className={styles.detalhesBtn}
              onClick={() => toggleDetalhes(index)}
            >
              {detalhesVisiveis === index
                ? "Esconder Detalhes"
                : "Mostrar Detalhes"}
            </button>
            <button
              className={styles.detalhesBtn}
              onClick={() => abrirEditarModal(item)}
            >
              Editar
            </button>
            <button
              className={`${styles.detalhesBtn} ${styles.excluirBtn}`}
              onClick={() => handleDelete(item.id)}
            >
              Excluir
            </button>
          </div>
        </div>
      ));
    }
  };

  const [showRegistrarModal, setShowRegistrarModal] = useState(false);

  const abrirRegistrarModal = () => {
    setShowRegistrarModal(true);
  };

  const fecharRegistrarModal = () => setShowRegistrarModal(false);

  const handleAbrirListagemAcoes = (colheita) => {
    setSelectedColheita(colheita);
    setShowModal(true);
  };

  const salvarNovaColheita = async (novaColheita) => {
    try {
      const response = await cadastrarColheita(novaColheita); // API para salvar
      if (response) {
        setColheita((prevColheitas) => [...prevColheitas, response]);
      } 
    } catch (error) {
      console.error("Erro ao salvar colheita:", error);
    }
  };

  const [tipoGrafico, setTipoGrafico] = useState("colheita");
  const [terrenoSelecionado, setTerrenoSelecionado] = useState("");

  // Define o estado para armazenar os dados do gráfico
  const [dadosGrafico, setDadosGrafico] = useState({
    labels: [],
    datasets: [],
  });

  // Define as opções do gráfico
  const opcoesGrafico = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Dados das Sacas",
      },
    },
  };

  //* Função para atualizar os dados do gráfico com base no tipo selecionado
  useEffect(() => {
    const atualizarDadosGrafico = () => {
      let labels = [];
      let data = [];

      if (tipoGrafico === "porTerreno" && terrenoSelecionado) {
        const filtrado = colheita.filter(
          (item) => item.terreno.nome === terrenoSelecionado
        );
        labels = filtrado.map((item) => formatarData(item.data_inicio));
        data = filtrado.map((item) => item.sacas || 0);
      } else if (tipoGrafico === "porCultura") {
        labels = colheita.map((item) => item.cultura.nomecultura);
        data = colheita.map((item) => item.sacas);
      }

      setDadosGrafico({
        labels: labels,
        datasets: [
          {
            label:
              tipoGrafico === "porTerreno"
                ? "Quantidade de Sacas por Terreno"
                : "Quantidade de Sacas por Cultura",
            data: data,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            barThickness: "flex",
            maxBarThickness: 15,
          },
        ],
      });
    };

    atualizarDadosGrafico();
  }, [tipoGrafico, terrenoSelecionado, colheita]);

  return (
    <>
      <NavbarComponent />
      <div className={styles.main}>
        <div className={styles.menu}>
          <div className={styles.menuEsquerda}>
            <div className={styles.menuItem} onClick={abrirRegistrarModal}>
              <a>Registrar Colheita</a>
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

        <div className={styles.secaoColheitas}>
          <div className={styles.colheitasNaoRealizadas}>
            <h2 className={styles.h2}>Colheitas Pendentes</h2>
            <div className={styles.divColheitasNaoRealizadas}>
              {renderColheitas(colheitasNaoRealizadas)}
            </div>
          </div>
          <div className={styles.colheitasRealizadas}>
            <h2  className={styles.h2} >Colheitas Realizadas</h2>
            <div className={styles.divColheitasRealizadas}>
            {renderColheitas(colheitasRealizadas, true)}
            </div>
          </div>
        </div>

        <div className={styles.secaoGraficos}>
          <aside className={styles.menuLateral}>
            <h3>Opções de Gráficos</h3>
            <ul>
              <li>
                <button onClick={() => setTipoGrafico("porTerreno")}>
                  Sacas por Terreno
                </button>

                {/* TO-DO Labels desse tipo de grafico vai ser as datas de colheita   */}

                {tipoGrafico === "porTerreno" && (
                  <select
                    value={terrenoSelecionado}
                    onChange={(e) => setTerrenoSelecionado(e.target.value)}
                    className={styles.select}
                  >
                    <option value="" disabled={true} className={styles.option}>
                      Selecione um terreno
                    </option>
                    {Array.from(
                      new Set(
                        colheita.map((item) => item.terreno.nome) // Filtra os terrenos com colheitas
                      )
                    ).map((nome, index) => (
                      <option key={index} value={nome} className={styles.option}>
                        {nome}
                      </option>
                    ))}
                  </select>
                )}
              </li>
              <li>
                <button onClick={() => setTipoGrafico("porCultura")}>
                  Sacas por Culturas
                </button>
              </li>
            </ul>
          </aside>
          <div className={styles.graficoContainer}>
            <h2 className={styles.graficoTitulo}>
              {tipoGrafico === "porTerreno"
                ? "Sacas por Terreno"
                : "Sacas por Cultura"}
            </h2>
            <div className={styles.grafico}>
              {tipoGrafico === "porCultura" ? (
                <Bar data={dadosGrafico} options={opcoesGrafico} />
              ) : (
                <GraficoEstoque
                  sacas={colheita
                    .filter((item) => item.terreno.nome === terrenoSelecionado)
                    .map((item) => ({
                      label: formatarData(item.data_inicio || "N/A"),
                      value: item.sacas || 0,
                    }))}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {colheitaSelecionada && (
        <AcaoCorretivaModal
          show={showAcaoCorretiva}
          handleClose={handleClose}
          colheita={colheitaSelecionada}
          handleAdd={handleAddAcao}
        />
      )}


      <RegistrarColheitaModal
        show={showRegistrarModal}
        handleClose={fecharRegistrarModal}
        handleSave={salvarNovaColheita}
      />


      <ListarAcoesCorretivasModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        colheita={selectedColheita}
      />

      {showEditarModal && (
        <EditarColheita
          show={showEditarModal}
          handleClose={fecharEditarModal}
          colheita={colheitaSelecionada}
          handleSave={salvarEdicao}
        />
      )}
      <ModalMessage
        message={sessionStorage.getItem("modalMessage")}
        show={isModalMessageVisible}
      />

    </>
  );
};

export default Colheita;
