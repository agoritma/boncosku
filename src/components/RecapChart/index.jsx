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
    const {labels, incomeArr, outcomeArr} = groupTransactionChart(transactionData)

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
                label: "Outcome",
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
            {/* <h2>See your transaction on this month</h2> */}
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