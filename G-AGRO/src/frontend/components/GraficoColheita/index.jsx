import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function GraficoColheita({ sacas = [], backgroundColor = 'rgba(75, 192, 192, 0.2)', borderColor = 'rgba(75, 192, 192, 1)' }) {
    
    
    // Verifica se o parâmetro sacas é um array e contém objetos com label e value
    if (!Array.isArray(sacas) || !sacas.every(saca => saca.label && typeof saca.value === 'number')) {
        return <div>Dados inválidos para o gráfico.</div>;
    }

    const data = {
        labels: sacas.map(saca => saca.label),
        datasets: [
            {
                label: 'Sacas',
                data: sacas.map(saca => saca.value),
                backgroundColor,
                borderColor,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Gráfico de Sacas Colhidas',
            },
        },
    };

    return <Bar data={data} options={options} />;
}
