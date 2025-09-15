import { Bar } from "react-chartjs-2";

const BarChart = ({ labels, incomeArr, outcomeArr }) => {
    const incomeDataset = {
        label: "Income",
        data: incomeArr,
        backgroundColor: '#e6ff2a',
        barPercentage: 0.7,
        borderRadius: 5,
        categoryPercentage: 0.5
    }
    
    const outcomeDataset = {
        label: "Expense",
        data: outcomeArr,
        backgroundColor: '#ff9494',
        barPercentage: 0.7,
        borderRadius: 5,
        categoryPercentage: 0.5
    }

    const data = {
        labels,
        datasets: [incomeDataset, outcomeDataset]
    }

    const BarPlugins = {
        legend: {display: true, position: 'bottom', align: "start",
                labels: {
                    usePointStyle: true,
                    pointStyle: 'rectRounded',
                    boxHeight: 8,
                    font: {
                        size: 14
                    }
                }
            },
    }

    const BarScales = {
        y: {
            ticks: {
                maxTicksLimit: 5,
                callback: function(value) {
                    if (value >= 1000000) return (value/1000000) + " jt";
                    if (value >= 1000) return (value/1000) + " rb";
                    return value;
                },
                color: "#000"
            },
            border: {dash: [5,5], display: false, color: "#000"},
            grid: {display: true, color: "rgba(0,0,0,0.3)"},
        },
        x: {
            grid: {display: false}, border: {display: false}
        },
    }

    return (
        <Bar data={data}
        options={{
            plugins: BarPlugins,
            scales: BarScales,
        }}
        />
    )
}

export default BarChart