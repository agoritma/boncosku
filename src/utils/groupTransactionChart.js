const groupTransactionChart = (data) => {
    const weekOrder = ['1-7', '8-14', '15-21', '22-28', '29-31']
    const weekMap = {}
    weekOrder.forEach(week => {
        weekMap[week] = { income: 0, outcome: 0 }
    })

    data.forEach(item => {
        const date = new Date(item.transaction_date)
        const day = date.getDate()

        let weekLabel;
        if (day <= 7) weekLabel = '1-7';
        else if (day <= 14) weekLabel = '8-14';
        else if (day <= 21) weekLabel = '15-21';
        else if (day <= 28) weekLabel = '22-28';
        else weekLabel = '29-31';

        if (item.transaction_category === "income") {
            weekMap[weekLabel].income += item.transaction_amount;
        } else if (item.transaction_category === "outcome") {
            weekMap[weekLabel].outcome += item.transaction_amount;
        }
    })

    
    const labels = weekOrder;
    const incomeArr = labels.map(label => weekMap[label].income)
    const outcomeArr = labels.map(label => weekMap[label].outcome)
    
    return {labels, incomeArr, outcomeArr}
}

export default groupTransactionChart