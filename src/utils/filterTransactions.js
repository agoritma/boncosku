const filterTransactions = ({ transactions, setTempTransactions, search, startDateFilter, endDateFilter, categoryFilter, timeFilter, amountFilter }) => {
    let filteredTransactions = [...transactions];
    
    if (search !== '') {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.transaction_note.toLowerCase().includes(search.toLowerCase()));
    }

    if (startDateFilter) {
        const startDate = new Date(startDateFilter);
        startDate.setHours(0, 0, 0, 0);
        filteredTransactions = filteredTransactions.filter(transaction => new Date(transaction.transaction_date) >= startDate);
    }
    if (endDateFilter) {
        const endDate = new Date(endDateFilter);
        endDate.setHours(23, 59, 59, 999);
        filteredTransactions = filteredTransactions.filter(transaction => new Date(transaction.transaction_date) <= endDate);
    }

    if (categoryFilter) {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.transaction_category === categoryFilter);
    }

    filteredTransactions.sort((a, b) => {
        const dateA = new Date(a.transaction_date);
        const dateB = new Date(b.transaction_date);
        if (timeFilter === 'newest') return dateA - dateB;
        return dateB - dateA;
    });

    if (amountFilter) {
        filteredTransactions.sort((a, b) => {
            const amountA = parseInt(a.transaction_amount);
            const amountB = parseInt(b.transaction_amount);
            if (amountFilter === 'highest') return amountA - amountB;
            return amountB - amountA;
        });
    }

    setTempTransactions(filteredTransactions.reverse());
};

export default filterTransactions;