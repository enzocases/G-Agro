import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function GraficoEstoque({ produtos, tipoSelecionado }) {
  // Filtra produtos pelo tipo selecionado e organiza os dados para o gráfico
  const produtosFiltrados = produtos.filter(produto => produto.tipo === tipoSelecionado);
  const data = {
    labels: produtosFiltrados.map(produto => produto.nome),
    datasets: [
      {
        label: `Quantidade de Estoque - ${tipoSelecionado}`,
        data: produtosFiltrados.map(produto => produto.quantidade_em_estoque),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        barThickness: "flex",
        maxBarThickness: 15,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false, position: 'top' },
      title: { display: false, text: `Quantidade de Produtos em Estoque - ${tipoSelecionado}` },
    },
  };

  return <Bar data={data} options={options} />;
}