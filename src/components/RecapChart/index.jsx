import "./style/style.css"
import groupTransactionWeek from '../../utils/groupTransactionWeek';
import { useState, useEffect } from "react";
import BarChart from "./BarChart";

const RecapChart = ({transactionData}) => {
    const [chartMonth, setChartMonth] = useState(() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    })
    const [chartBarData, setBarChartData] = useState(() => groupTransactionWeek(transactionData, chartMonth))
    
    useEffect(() => {
        setBarChartData(groupTransactionWeek(transactionData, chartMonth))
    }, [transactionData, chartMonth])
    
    const {labels, incomeArr, outcomeArr} = chartBarData

    return (
        <div className="chart-container">
            <div id="header" className="flex mb-10">
                <h3>See your transaction</h3>
                <input name="chart-date"
                    className="button-box"
                    type="month"
                    defaultValue={chartMonth}
                    onChange={(e) => setChartMonth(e.target.value)}
                />
            </div>
            <BarChart labels={labels} incomeArr={incomeArr} outcomeArr={outcomeArr}/>
        </div>
    )
}

export default RecapChart