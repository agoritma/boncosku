import { useState, useEffect, useRef } from 'react';
import filterTransactions from '../../utils/filterTransactions';
import TransactionList from './TransactionList';
import TransactionFilter from './TransactionFilter';
import TranscationSearch from './TransactionSearch';
import Plus from '../../assets/icon/Plus';

const TransactionSection = ({ transactions, setTransactions, setShowTransactionForm }) => {
    const [search, setSearch] = useState('');
    const [timeFilter, setTimeFilter] = useState('newest');
    const [amountFilter, setAmountFilter] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState(null);
    const [startDateFilter, setStartDateFilter] = useState(null);
    const [endDateFilter, setEndDateFilter] = useState(null);
    const [tempTransactions, setTempTransactions] = useState(transactions);

    useEffect(() => {
        filterTransactions({ transactions, setTempTransactions, search, startDateFilter, endDateFilter, categoryFilter, timeFilter, amountFilter });
    }, [timeFilter, amountFilter, categoryFilter, startDateFilter, endDateFilter, search, transactions]);

    return (
        <div className="transaction-section flex flex-col">
            <div className="transaction-head flex flex-col">
                <div id='upper' className="flex flex-align-center">
                    <h2>Transactions</h2>
                    <button className="button button-box flex selected" onClick={() => setShowTransactionForm(true)}>
                        <Plus />
                        <span>Add Transaction</span>
                    </button>
                </div>
                <TranscationSearch setSearch={setSearch} />
                <TransactionFilter categoryFilter={categoryFilter} amountFilter={amountFilter} setCategoryFilter={setCategoryFilter} setTimeFilter={setTimeFilter} timeFilter={timeFilter} setAmountFilter={setAmountFilter} setStartDateFilter={setStartDateFilter} startDateFilter={startDateFilter} setEndDateFilter={setEndDateFilter} />
            </div>
            <TransactionList transactions={transactions} tempTransactions={tempTransactions} setTransaction={setTransactions} setTempTransactions={setTempTransactions} />
        </div>
    );
}

export default TransactionSection