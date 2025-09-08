import "./style.css"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import groupTransactionChart from '../../utils/groupTransactionChart';
import { useState, useEffect } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
ChartJS.defaults.font.family = "'Outfit', sans-serif"

const RecapChart = ({transactionData}) => {
    const [chartDate, setChartDate] = useState(() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    })
    const [chartData, setChartData] = useState(() => groupTransactionChart(transactionData, chartDate))
    
    useEffect(() => {
        setChartData(groupTransactionChart(transactionData, chartDate))
    }, [transactionData, chartDate])
    
    const {labels, incomeArr, outcomeArr} = chartData

    const data = {
        labels,
        datasets: [
            {
                label: "Income",
                data: incomeArr,
                backgroundColor: '#e6ff2a',
                barPercentage: 0.7,
                borderRadius: 5,
                categoryPercentage: 0.5
            },
            {
                label: "Expense",
                data: outcomeArr,
                backgroundColor: '#ff9494',
                barPercentage: 0.7,
                borderRadius: 5,
                categoryPercentage: 0.5
            },
        ]
    }

    return (
        <div className="chart-container">
            <div id="header" className="flex mb-10">
                <h3>See your transaction</h3>
                <input name="chart-date"
                    className="button-box"
                    type="month"
                    defaultValue={chartDate}
                    onChange={(e) => setChartDate(e.target.value)}
                />
            </div>
            <Bar data={data}
            options={{
                plugins: {
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
                },
                scales: {
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
                },
            }}
            />
        </div>
    )
}

export default RecapChart