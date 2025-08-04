import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../assets/styles/painelControle.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  plugins,
} from "chart.js";

import user from "../assets/imgs/user1.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faChartBar,
  faChartPie,
  faFileAlt,
  faHome,
  faWarehouse,
  faSeedling,
  faWheatAwnCircleExclamation,
  faCarrot,
} from "@fortawesome/free-solid-svg-icons";

import { carregarPlantios } from "../api/plantios";
import { carregarColheitas } from "../api/colheitas";
import {
  carregarAcaoCorretiva,
  carregarAcoesCorretivasPorColheita,
} from "../api/acaoCorretiva";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function PainelControle() {
  const [isOpen, setIsOpen] = useState(false);
  const [plantios, setPlantios] = useState([]);
  const [colheita, setColheitas] = useState([]);
  const [indiceCultura, setIndiceCultura] = useState([]);
  const [indiceProdutividade, setIndiceProdutividade] = useState([]);
  const [acoes, setAcoes] = useState([]);
  const [indiceQualidade, setIndiceQualidade] = useState(0);
  const [cores, setCores] = useState([]);

  // * Indice de numero 3
  async function fetchPlantios() {
    const data = await carregarPlantios();
    if (data) {
      setPlantios(data);
      processarPlantios(data);
    }
  }

  async function fetchColheitas() {
    const data = await carregarColheitas();
    if (data) {
      setColheitas(data);
      processarProdutividadeCultura(data);
      const response = await fetchAcoesCorretivas();
      if(response){
        processarQualidadeColheita(data, response);
      }
        
    }
  }

  async function fetchAcoesCorretivas() {
    const data = await carregarAcaoCorretiva();
    if (data) {
      setAcoes(data);
    }
    return data
  }

  //colheitas que possuem ações corretivas e dividir por todas as colheitas

  // Função para calcular índices e preparar o gráfico
  function processarPlantios(data) {
    const areasPorCultura = {};
    let areaTotal = 0;

    // Calcula a área por cultura e a área total
    data.forEach((plantio) => {
      const { cultura, terreno } = plantio;
      if (!areasPorCultura[cultura.nomecultura]) {
        areasPorCultura[cultura.nomecultura] = 0;
      }
      areasPorCultura[cultura.nomecultura] += terreno.tamanho;
      areaTotal += terreno.tamanho;
    });

    // Calcula os índices por cultura
    const calculoIndice = Object.entries(areasPorCultura).map(
      ([nomecultura, areaPlantada]) => ({
        nome: nomecultura,
        areaPlantada,
        indice: ((areaPlantada / areaTotal) * 100).toFixed(2),
      })
    );
    setIndiceCultura(calculoIndice);

    // Prepara os dados para o gráfico
    prepararDadosGrafico(areasPorCultura);
  }

  function processarProdutividadeCultura(data) {
    const sacasPorCultura = {};
    const areaPorCultura = {};

    data.forEach((dado) => {
      const { cultura, terreno, sacas } = dado;

      if (!sacasPorCultura[cultura.nomecultura]) {
        sacasPorCultura[cultura.nomecultura] = 0;
        areaPorCultura[cultura.nomecultura] = 0;
      }

      sacasPorCultura[cultura.nomecultura] += sacas;
      areaPorCultura[cultura.nomecultura] += terreno.tamanho;
    });

    const produtividadeCultura = Object.entries(sacasPorCultura).map(
      ([nomeCultura, totalSacas]) => {
        const areaTotal = areaPorCultura[nomeCultura];
        return {
          nome: nomeCultura,
          totalSacas,
          areaTotal,
          produtividade: (totalSacas / areaTotal).toFixed(2), // Percentual sobre a área total da cultura
        };
      }
    );
    setIndiceProdutividade(produtividadeCultura);

    prepararGraficosProdutividade(sacasPorCultura);
    return produtividadeCultura;
  }

  //Função para calcular quantidade de colheitas com ações corretivas

  async function processarQualidadeColheita(colheitas, acoesAtuais) {
    let totalColheitas = 0;
    let colheitasComAcoes = 0;
    const idsColheitasComAcoes = new Set();

    for (const colheita of colheitas) {
      for (const acao of acoesAtuais) {
        if (
          acao.colheita.id == colheita.id &&
          !idsColheitasComAcoes.has(acao.colheita.id)
        ) {
          idsColheitasComAcoes.add(colheita.id);
          colheitasComAcoes++;
        }
      }

      totalColheitas++;
    }
    const colheitasSemAcoes = totalColheitas - colheitasComAcoes;
    const percentual = ((colheitasSemAcoes / totalColheitas) * 100).toFixed(2);

    const dadosColheitas = {
      totalColheitas,
      colheitasComAcoes,
      percentual,
    };

    setIndiceQualidade(dadosColheitas);
  }

  // Grafico de Producao Mensal
  function processarProducaoMensal(colheitas, plantios) {
    const producaoMensal = {};

    colheitas.forEach(({ data_inicio, sacas }) => {
      const [ano, mes] = data_inicio.split("-");
      const chave = `${mes}/${ano}`;

      if (!producaoMensal[chave]) {
        producaoMensal[chave] = { sacas: 0, plantios: 0 };
      }
      producaoMensal[chave].sacas += sacas;
    });

    // Preparar os dados para o gráfico
    const labels = Object.keys(producaoMensal).sort();
    const colheitasData = labels.map((label) => producaoMensal[label].sacas);

    // Atualizar os estados
    setBarDataMensal({
      labels,
      datasets: [
        {
          label: "Sacas Produzidas",
          data: colheitasData,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          barThickness: "flex",
          maxBarThickness: 50,
        },
      ],
    });
  }

  function processarPlantiosColheitasMensal(colheitas, plantios) {
    const atividadesMensais = {};
    colheitas.forEach(({ data_inicio }) => {
      const [ano, mes] = data_inicio.split("-");
      const chave = `${mes}/${ano}`;

      if (!atividadesMensais[chave]) {
        atividadesMensais[chave] = { plantios: 0, colheitas: 0 };
      }
      atividadesMensais[chave].colheitas += 1;
    });

    plantios.forEach(({ dataplantio }) => {
      const [ano, mes] = dataplantio.split("-");
      const chave = `${mes}/${ano}`;

      if (!atividadesMensais[chave]) {
        atividadesMensais[chave] = { plantios: 0, colheitas: 0 };
      }
      atividadesMensais[chave].plantios += 1;
    });

    // Preparar os dados para o gráfico
    const labels = Object.keys(atividadesMensais).sort();
    const plantiosData = labels.map(
      (label) => atividadesMensais[label].plantios
    );
    const colheitasData = labels.map(
      (label) => atividadesMensais[label].colheitas
    );

    setBarDataAtividades({
      labels,
      datasets: [
        {
          label: "Plantios Realizados",
          data: plantiosData,
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          barThickness: "flex",
          maxBarThickness: 50,
        },
        {
          label: "Colheitas Realizadas",
          data: colheitasData,
          backgroundColor: "rgba(255, 206, 86, 0.5)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1,
          barThickness: "flex",
          maxBarThickness: 50,
        },
      ],
    });
  }

  // Função para preparar os dados do gráfico
  function prepararDadosGrafico(areasPorCultura) {
    const labels = Object.keys(areasPorCultura);
    const dataValues = Object.values(areasPorCultura);

    // Gerar cores aleatórias para o gráfico
    const cores = labels.map(
      () =>
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, 0.5)`
    );

    setPieData({
      labels,
      datasets: [
        {
          label: "Distribuição de Culturas",
          data: dataValues,
          backgroundColor: cores,
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 1,
        },
      ],
    });
  }

  function prepararGraficosProdutividade(sacasPorCultura) {
    const labels = Object.keys(sacasPorCultura);
    const dataValues = Object.values(sacasPorCultura);

    // Gerar cores aleatórias para o gráfico
    const cores = labels.map(
      () =>
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, 0.5)`
    );

    setBarDataProdutividade({
      labels,
      datasets: [
        {
          label: "Distribuição de Sacas",
          data: dataValues,
          backgroundColor: cores,
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 1,
          barThickness: "flex",
          maxBarThickness: 50,
        },
      ],
    });
  }

  useEffect(() => {
    document.title = "Painel de Controle - G-AGRO";

    fetchPlantios();
    fetchColheitas();
  }, []);

  useEffect(() => {
    if (colheita.length > 0 && plantios.length > 0) {
      processarProducaoMensal(colheita, plantios);
      processarPlantiosColheitasMensal(colheita, plantios);
    }
  }, [colheita, plantios]);

  const barOptions = {
    plugins: {
      legend: {
        display: false,
        position: "top",
        labels: {
          color: "rgba(255, 255, 255, 0.7)",
          padding: 20,
          boxWidth: 20,
          boxHeight: 15,
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Distribuição de Sacas",
        color: "rgba(255, 255, 255, 0.7)",
        font: {
          size: 40,
        },
        padding: {
          bottom: 20,
        },
      },
    },
  };

  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [
      {
        label: "Distribuição de Culturas",
        data: [],
        backgroundColor: [],
      },
    ],
  });

  const [barDataProdutividade, setBarDataProdutividade] = useState({
    labels: [],
    datasets: [
      {
        label: "Distribuição de Sacas",
        data: [],
        backgroundColor: [],
      },
    ],
  });

  const [barDataQualidadeColheita, setBarDataQualidadeColheita] = useState({
    labels: [],
    datasets: [
      {
        label: "Qualidade da Colheita",
        data: [],
        backgroundColor: [],
      },
    ],
  });

  const [barDataMensal, setBarDataMensal] = useState({
    labels: [],
    datasets: [],
  });

  const [barDataAtividades, setBarDataAtividades] = useState({
    labels: [],
    datasets: [],
  });

  const pieOptions = {
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "rgba(255, 255, 255, 0.7)",
          padding: 20,
          boxWidth: 20,
          boxHeight: 15,
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Distribuição de Culturas",
        font: {
          size: 40,
        },
        padding: {
          top: 20,
        },
        color: "rgba(255, 255, 255, 0.7)",
      },
    },
  };

  return (
    <div className={styles.main}>
      <header>
        <section className={styles.menu}>
          <div className={styles.divTitle}>
            <h1 className={styles.title}>Painel de Controle</h1>
          </div>
          <nav className={styles.nav}>
            <a href="#indicadores" className={styles.navLink}>
              <FontAwesomeIcon icon={faChartBar} /> Indicadores
            </a>
            <a href="#graficos" className={styles.navLink}>
              <FontAwesomeIcon icon={faChartPie} /> Gráficos
            </a>
            <a href="#relatorios" className={styles.navLink}>
              <FontAwesomeIcon icon={faFileAlt} /> Relatórios
            </a>
            <a href="/" className={styles.navLink}>
              <FontAwesomeIcon icon={faHome} /> Home
            </a>
          </nav>
          <div className={styles.divMenuLateral}>
            <div
              className={styles.menuButton}
              onClick={() => setIsOpen(!isOpen)}
            >
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

            <div className={`${styles.sidebar} ${isOpen ? styles.show : ""}`}>
              <span
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
              >
                &times;
              </span>
              <h2>Área do Agricultor</h2>
              <hr />

              <div className={styles.caminhoMenu}>
                <FontAwesomeIcon icon={faSeedling} className={styles.icone} />
                <Link to="/plantio">Plantio</Link>
              </div>
              <div className={styles.caminhoMenu}>
                <FontAwesomeIcon
                  icon={faWheatAwnCircleExclamation}
                  className={styles.icone}
                />
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
          </div>
        </section>
      </header>

      <section className={styles.container}>
        <section className={styles.indicadores} name="indicadores">
          {/*
                    <div className={styles.cardIndicador}>
                        <h2>Total de Produção</h2>
                        <p>12.350 sacas</p>
                        <button className={styles.detalhes}>Detalhes</button>
                    </div>
                    <div className={styles.cardIndicador}>
                        <h2>Terras Cultivadas</h2>
                        <p>45 hectares</p>
                        <button className={styles.detalhes}>Detalhes</button>
                    </div>
                    <div className={styles.cardIndicador}>
                        <h2>Culturas Manejadas</h2>
                        <p>43 culturas</p>
                        <button className={styles.detalhes}>Detalhes</button>
                    </div>
                    */}
          <section className={styles.indicador1}>
            <div className={styles.divH3}>
              <h3 className={styles.h3}>Índice de Cultura por Área</h3>
              <hr></hr>
            </div>
            <div className={styles.info}>
              <div className={styles.indiceCultura}>
                {indiceCultura.map((cultura, index) => (
                  <div key={index} className={styles.cardIndicador}>
                    <h2>{cultura.nome}</h2>
                    <p>Área Plantada: {cultura.areaPlantada} ha</p>
                    <p>Índice: {cultura.indice}%</p>
                  </div>
                ))}
              </div>

              <div className={styles.chart2}>
                <Pie
                  className={styles.chartPie}
                  data={pieData}
                  options={pieOptions}
                />
              </div>
            </div>
          </section>

          <section className={styles.indicador2}>
            <div className={styles.divH3}>
              <h3 className={styles.h3}>
                Índice de Produtividade das Culturas
              </h3>
              <hr></hr>
            </div>
            <div className={styles.info}>
              <div className={styles.indiceCultura}>
                {indiceProdutividade.map((produtividade, index) => (
                  <div key={index} className={styles.cardIndicador}>
                    <h2>{produtividade.nome}</h2>
                    <p>Total de Sacas: {produtividade.totalSacas} ha</p>
                    <p>Área Total: {produtividade.areaTotal} m²</p>
                    <p>Índice: {produtividade.produtividade} sacas/m²</p>
                  </div>
                ))}
              </div>

              <div className={styles.chart3}>
                <Bar
                  className={styles.chartPie}
                  data={barDataProdutividade}
                  options={barOptions}
                />
              </div>
            </div>
          </section>

          <section className={styles.indicador3}>
            <div className={styles.divH3}>
              <h3 className={styles.h3}>Índice de Qualidade da Colheita</h3>
              <hr></hr>
            </div>
            <div className={styles.info}>
              <div className={styles.indiceCultura}>
                <div className={styles.cardIndicador}>
                  <h2>Qualidade Geral da Colheita</h2>
                  <p>Total de Colheitas: {indiceQualidade.totalColheitas}</p>
                  <p>
                    Colheitas com Ações Corretivas:{" "}
                    {indiceQualidade.colheitasComAcoes}
                  </p>
                  <p>Índice de Qualidade: {indiceQualidade.percentual}%</p>
                </div>
              </div>
            </div>
          </section>
        </section>
        <section className={styles.charts} name="graficos">
          <div className={styles.divH3}>
            <h3 className={styles.h3}>Gráficos</h3>
          </div>

          <div className={styles.divCharts1}>
            <div className={styles.chart1}>
              <h2>Produção Mensal</h2>
              <Bar data={barDataMensal} />
            </div>
            <div className={styles.chart3}>
              <h2>Plantios e Colheitas Mensais</h2>
              <Bar data={barDataAtividades} />
            </div>
          </div>
        </section>

        <section className={styles.relatorios} name="relatorios">
          <div className={styles.divH3}>
            <h3 className={styles.h3}>Relatórios</h3>
          </div>
        </section>
      </section>
      <Footer />
    </div>
  );
}
