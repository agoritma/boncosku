const calculateRecaps = (transactions) => {
    const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const currentYear = new Date().getFullYear();
    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

    const filterTransactionsByMonth = (transactions, month, year) => {
        return transactions.filter(transaction => {
            const transactionDate = new Date(transaction.transaction_date);
            return transactionDate.getMonth() + 1 === month && transactionDate.getFullYear() === year;
        });
    };

    const calculateBalance = (transactions, category) => {
        return transactions.reduce((acc, transaction) => {
            if (transaction.transaction_category === category) {
                return acc + transaction.transaction_amount;
            }
            return acc;
        }, 0);
    };

    const currentMonthTransactions = filterTransactionsByMonth(transactions, currentMonth, currentYear);
    const previousMonthTransactions = filterTransactionsByMonth(transactions, previousMonth, previousYear);

    const currentIncomeBalance = calculateBalance(currentMonthTransactions, 'income');
    const currentOutcomeBalance = calculateBalance(currentMonthTransactions, 'outcome');
    const previousIncomeBalance = calculateBalance(previousMonthTransactions, 'income');
    const previousOutcomeBalance = calculateBalance(previousMonthTransactions, 'outcome');

    const calculatePercentageChange = (current, previous) => {
        if (previous === 0) return current === 0 ? 0 : 100;
        return Math.round(((current - previous) / previous) * 1000) / 10;
    };

    const incomePercentageChange = calculatePercentageChange(currentIncomeBalance, previousIncomeBalance);
    const outcomePercentageChange = calculatePercentageChange(currentOutcomeBalance, previousOutcomeBalance);

    const incomePercentageStatus = incomePercentageChange > 0 ? 'up' : 'down';
    const outcomePercentageStatus = outcomePercentageChange > 0 ? 'up' : 'down';

    return ({
        balanceStatus: {
            incomeBalance: currentIncomeBalance,
            outcomeBalance: currentOutcomeBalance,
            incomePercentage: {
                status: incomePercentageStatus,
                amount: incomePercentageChange
            },
            outcomePercentage: {
                status: outcomePercentageStatus,
                amount: outcomePercentageChange
            }
        }
    });
};

export default calculateRecaps;