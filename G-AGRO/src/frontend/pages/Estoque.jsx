import styles from "../assets/styles/estoque.module.css";
import { useState, useEffect } from "react";

import GraficoEstoque from "../components/GraficoEstoque";
import { Bar } from "react-chartjs-2";

import { Container, Row, Col, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faSearch,
  faFilter,
  faSeedling,
  faSprayCan,
  faWheatAwn,
  faBacteria,
  faFolderTree,
  faWheatAlt,
  faBugs,
  faWorm,
  faSquare,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";

import NavbarComponent from "../components/Navbar";
import Footer from "../components/Footer";
import ModalMessage from "../components/ModalMessage";
import AddProductModal from "../components/AddProductModal/addProductModal.jsx";
import ModalEditProduto from "../components/ModalEditProduto/index.jsx";
import ModalConsumoProduto from "../components/ModalConsumoProduto/index.jsx";
import AddQntdProdutoModal from "../components/AddQntdProdutoModal/index.jsx";

import {
  carregarProdutos,
  carregaProdutoPorId,
  cadastrarProduto,
  atualizarProduto,
  deletarProduto,
} from "../api/produtos";

import { carregarConsumos } from "../api/consumo.js";

export default function Estoque() {
  // * Verificar mensagem na session Storage
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

  

  // Seta Produtos (No momento vai ser mocado)
  const [produtos, setProdutos] = useState([]);

  // Verificar se vai precisar setar os fornecedores por aqui
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddQntdModal, setShowAddQntdModal] = useState(false);

  useEffect(() => {
    async function fetchProdutos() {
      const data = await carregarProdutos();
      if (data) {
        // Mapeia os dados dos plantios para incluir apenas os campos desejados
        const produtos = data.map((produto) => ({
          id: produto.id,
          nome: produto.nome,
          quantidade_minima: produto.quantidade_minima,
          tipo: produto.tipo,
          instrucoes_manejo: produto.instrucoes_manejo,
          quantidade_em_estoque: produto.quantidade_em_estoque,
          imagem: produto.imagem,
        }));
        setProdutos(produtos);
      }
    }
    fetchProdutos();
  }, []);

  const [tipoGrafico, setTipoGrafico] = useState("estoque");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  // Acao de Dropdown para o Botao de Filtrar no Menu
  const [dropdownFiltrarOpen, setDropdownFiltrarOpen] = useState(false);

  const [selectedProduto, setSelectedProduto] = useState(null);
  const [selectedProdutoId, setSelectedProdutoId] = useState(null);

  const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showModalEdit, setShowModalEdit] = useState(false);

  const [showModalConsumo, setShowModalConsumo] = useState(false);
  const [produtoParaConsumir, setProdutoParaConsumir] = useState(null);

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
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "Dados do Estoque",
      },
    },
  };

  const formatarData = (data) => {
    const dataObj = new Date(data); // Cria um objeto Date
    dataObj.setDate(dataObj.getDate() + 1); // Incrementa um dia e ajusta mês/ano automaticamente

    const dia = String(dataObj.getDate()).padStart(2, '0'); // Extrai e formata o dia
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Extrai e formata o mês
    const ano = dataObj.getFullYear(); // Extrai o ano

    return `${dia}/${mes}/${ano}`; // Retorna no formato dd/mm/yyyy
};

  // Função para atualizar os dados do gráfico com base no tipo selecionado
  useEffect(() => {
    const atualizarDadosGrafico = () => {
      let labels = [];
      let data = [];

      if (tipoGrafico === "estoque") {
        labels = produtos.map((produto) => produto.nome);
        data = produtos.map((produto) => produto.quantidade_em_estoque);
      } else if (tipoGrafico === "categorias" && categoriaSelecionada) {
        const produtosFiltrados = produtos.filter(
          (produto) => produto.tipo === categoriaSelecionada
        );
        console.log(produtos)
        labels = produtosFiltrados.map((produto) => produto.nome);
        data = produtosFiltrados.map((produto) => produto.quantidade_em_estoque);
        console.log(data)
      }

      setDadosGrafico({
        labels: labels,
        datasets: [
          {
            label: `Quantidade de ${tipoGrafico}`,
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
  }, [tipoGrafico, categoriaSelecionada, produtos]);

  // * Função para selecionar um produto /////////////////////////////////

  const handleCardProdutoClick = (produto) => {
    setSelectedProdutoId(produto.id);
    setProdutos((prevProdutos) =>
      prevProdutos.map((p) =>
        p.id === produto.id ? { ...p, idProduto: produto.id } : p
      )
    );
  };
  const handleCardClickEdit = (produto, event) => {
    event.stopPropagation();
    setSelectedProduto(produto);
    handleEdit();
    console.log(produto);
  };

  const handleDelete = async (produto) => {
    console.log("Produto para deletar:", produto);
    if (!produto || !produto.id) {
      sessionStorage.setItem("modalMessage", "Produto não encontrado!");
      return;
    }
    const response = await deletarProduto(produto.id);
    console.log(response);
    if (response) {
      const updatedProduto = produto.filter((p) => p.id !== produto.id);
      setProdutos(updatedProduto); // Atualiza a lista de produtos

      setSelectedProduto(null);
    } else {
      console.error("Erro ao deletar produto");
    }
  };

  const handleClose = () => {
    setShowAddModal(false);
    setSelectedProduto(null);
    setShowModalEdit(false);
    setShowModalConsumo(false);
    setShowAddQntdModal(false);
  };

  const handleEdit = () => {
    setShowModalEdit(true);
  };

  const handleConsumo = (produto, e) => {
    e.stopPropagation();
    setProdutoParaConsumir(produto);
    setShowModalConsumo(true);
  };

  const handleConsumirProduto = (quantidade) => {
    const produtoAtualizado = {
      ...produtoParaConsumir,
      quantidade_em_estoque: produtoParaConsumir.quantidade_em_estoque - quantidade,
    };
    setProdutos((prevProdutos) =>
      prevProdutos.map((p) =>
        p.id === produtoAtualizado.id ? produtoAtualizado : p
      )
    );
  };

  const handleAddQntd = (quantidade) => {
    const produtoAtt = {
      ...produtoParaConsumir,
      quantidade_em_estoque:
        Number(produtoParaConsumir.quantidade_em_estoque) + Number(quantidade),
    };
    setProdutos((prevProdutos) =>
      prevProdutos.map((p) => (p.id === produtoAtt.id ? produtoAtt : p))
    );
  };

  const handleAddQntdProduto = (produto, e) => {
    e.stopPropagation();
    setProdutoParaConsumir(produto);
    setShowAddQntdModal(true);
  };

  const handleAddProduct = async (product) => {
    const newProduto = await cadastrarProduto(product);
    if (newProduto) {
      setProdutos((prevProdutos) => {
        [...prevProdutos, newProduto];
      });
      handleClose();
    } else {
      console.error("Erro ao adicionar nova cultura");
    }
  };

  const handleUpdateProduct = async (product) => {
    const updatedProduto = await atualizarProduto(product.id, product);
    if (updatedProduto) {
      const newProdutos = produtos.map((p) => {
        return p.id === product.id ? updatedProduto : p;
      });
      setProdutos(newProdutos);
      handleClose();
    } 
  };

  // * Funções para a criação dos cards e separacao por tipo /////////////////////////////////

  const [tipoAberto, setTipoAberto] = useState(null);
  const [produtoAberto, setProdutoAberto] = useState(null);

  const produtosPorTipo = produtos.reduce((acc, produto) => {
    if (!acc[produto.tipo]) acc[produto.tipo] = [];
    acc[produto.tipo].push(produto);
    return acc;
  }, {});

  const iconesTipo = {
    Fertilizantes: faSeedling,
    Agrotoxicos: faSprayCan,
    Sementes: faWheatAwn,
    Inoculantes: faBacteria,
    Biopesticidas: faBugs,
    Substratos: faWorm,
  };

  const handleExpandirTipo = (tipo) => {
    setTipoAberto(tipoAberto === tipo ? null : tipo);
  };

  const handleExpandirProduto = (produtoId) => {
    setProdutoAberto(produtoAberto === produtoId ? null : produtoId);
  };

  // * Carregar Produtor em Estoque /////////////////////////////////////////////////////////
  const renderProdutos = () => {
    if (produtos.length === 0) {
      return (
        <div className={styles.semProdutos}>
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className={styles.icone}
          />
          <p className={styles.semProdutosText}>Nenhum produto cadastrado.</p>
        </div>
      );
    }

    return (
      <div className={styles.secaoProdutos}>
        {Object.keys(produtosPorTipo).map((tipo) => (
          <div key={tipo} className={styles.tipoContainer}>
            <div
              className={styles.tipoHeader}
              onClick={() => handleExpandirTipo(tipo)}
            >
              <FontAwesomeIcon
                icon={iconesTipo[tipo]}
                className={styles.tipoIcone}
              />
              {tipo}
            </div>

            {tipoAberto === tipo && (
              <div className={`${styles.barrasContainer} ${styles.ativo}`}>
                {produtosPorTipo[tipo].map((produto, index) => (
                  <div
                    key={index}
                    className={`${styles.barraPrincipal} ${
                      produtoAberto === produto.id ? styles.expandido : ""
                    }`}
                    onClick={() => handleExpandirProduto(produto.id)}
                  >
                    <div className={styles.infoEsquerda}>
                      <img
                        src={produto.imagem}
                        alt={produto.nome}
                        className={styles.produtoImagem}
                      />
                      <h5 className={styles.produtoTitulo}>{produto.nome}</h5>
                      <p
                        className={`${styles.produtoQuantidade} ${
                          produto.quantidade_em_estoque <=
                          produto.quantidade_minima
                            ? styles.qntdAbaixo
                            : ""
                        }`}
                      >
                        Em estoque: {produto.quantidade_em_estoque}
                      </p>
                    </div>
                    <div className={styles.infoDireita}>
                      <button
                        className={styles.btnConsumir}
                        onClick={(e) => handleAddQntdProduto(produto, e)}
                      >
                        <a>Adicionar Quantidade</a>
                      </button>
                      <button
                        className={styles.btnConsumir}
                        onClick={(e) => handleConsumo(produto, e)}
                      >
                        <a>Consumir Produto</a>
                      </button>
                    </div>

                    {produtoAberto === produto.id && (
                      <div className={styles.produtosLista}>
                        <div className={styles.produtoInfo}>
                          <p className={styles.produtoDescricao}>
                            Instruções de Manejo: {produto.instrucoes_manejo}
                          </p>
                          <p className={`${styles.produtoPreco}`}>
                            Quantidade Mínima: {produto.quantidade_minima}
                          </p>
                          {/*
                          <p className={styles.produtoFornecedor}>Fornecedor: {produto.fornecedor}</p>
                          */}
                        </div>
                        <button
                          className={styles.btnedit}
                          onClick={(e) => handleCardClickEdit(produto, e)}
                        >
                          Editar
                        </button>
                        <button
                          className={styles.btnexcluir}
                          onClick={(e) => handleDelete(produto, e)}
                        >
                          Excluir
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  const [consumo, setConsumo] = useState();
  const [showHistorico, setShowHistorico] = useState(false);

   // * Carrega o histórico de consumos ao ativar a visualização
   useEffect(() => {
    if (showHistorico) {
      const carregarDadosConsumo = async () => {
        const data = await carregarConsumos();
        if (data) {
          setConsumo(data);
        }
      };
      carregarDadosConsumo();
    }
  }, [showHistorico]);


  const renderConsumos = () => {
    if (!consumo || consumo.length === 0) {
      return (
        <div className={styles.semConsumos}>
          <FontAwesomeIcon icon={faTriangleExclamation} className={styles.icone} />
          <p className={styles.semConsumosText}>Nenhum consumo registrado.</p>
        </div>
      );
    } else {
      return consumo.map((item, index) => (
        <div key={index} className={styles.listaConsumo}>
          <div className={styles.cardConsumo}>
            <h4 className={styles.consumoTitulo}>Produto: {item.produto.nome}</h4>
            <div className={styles.consumoConteudo}>
              <p className={styles.consumoText}>Quantidade Consumida: {item.quantidade_consumida}</p>
              <p className={styles.consumoText}>Data de Consumo: {formatarData(item.data_consumo)}</p>
            </div>
          </div>
        </div>
      ));
    }
  };

  return (
    <>
      <NavbarComponent />

      <div className={styles.main}>
        <div className={styles.menu}>
          <div className={styles.menuEsquerda}>
            <button
              className={styles.menuItem}
              onClick={() => setShowAddModal(true)}
            >
              Cadastrar Produto
            </button>
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
                className={`${styles.dropdownFiltrar} ${
                  dropdownFiltrarOpen ? styles.show : ""
                }`}
              >
                <label className={styles.label}>Teste</label>
                <input
                  type="text"
                  placeholder="Ex: testest"
                  className={styles.inputFiltrar}
                />

                <label className={styles.label}>Testes</label>
                <input
                  type="text"
                  placeholder="Ex: testsets"
                  className={styles.inputFiltrar}
                />

                <label className={styles.label}>testes</label>
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

        <div className={styles.secaoProdutos}>{renderProdutos()}</div>

        <div className={styles.secaoHistoricoConsumo}>
        <button onClick={() => setShowHistorico(!showHistorico)} className={styles.btnVerHistorico}>
            <label className={styles.labelHistorico}>
              Ver Histórico Consumo:{" "}
            </label>
            {showHistorico ? (
              <FontAwesomeIcon icon={faSquareCheck} />
            ) : (
              <FontAwesomeIcon icon={faSquare} />
            )}
          </button>

          {showHistorico && <div className={styles.historicoConsumoContainer}>{renderConsumos()}</div>}
        </div>

        <div className={styles.secaoGraficos}>
          <aside className={styles.menuLateral}>
            <h3>Opções de Gráficos</h3>
            <ul>
              <li>
                <button onClick={() => setTipoGrafico("estoque")}>
                  Estoque Total
                </button>
              </li>
              <li>
                <button onClick={() => setTipoGrafico("categorias")}>
                  Estoque por Categoria
                </button>
                {tipoGrafico === "categorias" && (
                  <select
                  className={styles.select}
                    value={categoriaSelecionada}
                    onChange={(e) => setCategoriaSelecionada(e.target.value)}
                  >
                    <option value="" disabled={true} className={styles.option}>
                      Selecione uma categoria
                    </option>
                    {Array.from(
                      new Set(produtos.map((produto) => produto.tipo))
                    ).map((tipo, index) => (
                      <option key={index} value={tipo} className={styles.option}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                )}
              </li>
            </ul>
          </aside>
          <div className={styles.graficoContainer}>
            <h2 className={styles.graficoTitulo}>Gráfico de {tipoGrafico}</h2>
            <div className={styles.grafico}>
              {tipoGrafico === "estoque" && (
                <Bar data={dadosGrafico} options={opcoesGrafico} />
              )}
              {tipoGrafico === "categorias" && categoriaSelecionada && (
                <GraficoEstoque
                  produtos={produtos}
                  tipoSelecionado={categoriaSelecionada}
          
                />
              )}
            </div>
          </div>
        </div>

        <AddProductModal
          show={showAddModal}
          handleClose={handleClose}
          handleAdd={handleAddProduct}
        />

        <ModalMessage
          message={sessionStorage.getItem("modalMessage")}
          show={isModalMessageVisible}
        />

        <ModalEditProduto
          show={showModalEdit}
          handleClose={handleClose}
          produto={selectedProduto}
          handleSave={handleUpdateProduct}
        />

        <ModalConsumoProduto
          produto={produtoParaConsumir}
          onClose={handleClose}
          onConsumir={handleConsumirProduto}
          show={showModalConsumo}
        />

        <AddQntdProdutoModal
          show={showAddQntdModal}
          handleClose={handleClose}
          handleAdd={handleAddQntd}
          produto={produtoParaConsumir}
        />
      </div>
      <Footer />
    </>
  );
}
