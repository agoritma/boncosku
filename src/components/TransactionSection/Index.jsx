import { useState, useEffect, useRef } from 'react';
import filterTransactions from '../../utils/filterTransactions';
import TransactionList from './TransactionList';
import TransactionFilter from './TransactionFilter';
import TranscationSearch from './TransactionSearch';

const TransactionSection = ({ transactions, setTransactions }) => {
    const [search, setSearch] = useState('');
    const [timeFilter, setTimeFilter] = useState('newest');
    const [amountFilter, setAmountFilter] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState(null);
    const [startDateFilter, setStartDateFilter] = useState(null);
    const [endDateFilter, setEndDateFilter] = useState(null);
    const [tempTransactions, setTempTransactions] = useState(transactions);
    const transactionHeadRef = useRef(null);

    useEffect(() => {
        filterTransactions({ transactions, setTempTransactions, search, startDateFilter, endDateFilter, categoryFilter, timeFilter, amountFilter });
    }, [timeFilter, amountFilter, categoryFilter, startDateFilter, endDateFilter, search, transactions]);

    return (
        <div className="transaction-section flex flex-col">
            <div className="transaction-head flex flex-col" ref={transactionHeadRef}>
                <h2>Transactions</h2>
                <TranscationSearch setSearch={setSearch} />
                <TransactionFilter categoryFilter={categoryFilter} amountFilter={amountFilter} setCategoryFilter={setCategoryFilter} setTimeFilter={setTimeFilter} timeFilter={timeFilter} setAmountFilter={setAmountFilter} setStartDateFilter={setStartDateFilter} startDateFilter={startDateFilter} setEndDateFilter={setEndDateFilter} />
            </div>
            <TransactionList transactions={tempTransactions} setTransactions={setTransactions} transactionHeadRef={transactionHeadRef} />
        </div>
    );
}

export default TransactionSection