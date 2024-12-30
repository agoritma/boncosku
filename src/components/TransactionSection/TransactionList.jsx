import moneyFormat from "../../utils/moneyFormat"
import supabaseDelTransaction from "../../api/supabaseDelTransaction"
import TrashIcon from "../../assets/icon/TrashIcon";
import TrafficUp from "../../assets/icon/TrafficUp";
import TrafficDown from "../../assets/icon/TrafficDown";
import { useEffect, useRef } from "react";

const TransactionList = ({ transactions, setTransactions, transactionHeadRef }) => {
    const transactionListRef = useRef([]);

    const handleScroll = () => {
        const headRect = transactionHeadRef.current.getBoundingClientRect();
        transactionListRef.current.forEach((ref, index) => {
            if (ref) {
                const itemRect = ref.getBoundingClientRect();
                if (itemRect.top < headRect.top + 50) {
                    ref.style.opacity = 0;
                } else {
                    ref.style.opacity = 1;
                }
            }
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);
    
    const deleteTransaction = async (id) => {
        const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
        setTransactions(updatedTransactions)
        const { error } = await supabaseDelTransaction(id);
        if (error) {
            console.error('Error deleting transaction:', error);
            return;
        }
    }

    return (
        <div className="transaction-list flex flex-col">
            {transactions.map((transaction, index) => (
                <div key={transaction.id} className="transaction-item flex" ref={el => transactionListRef.current[index] = el}>
                    <div className="transaction-icon button" onClick={() => deleteTransaction(transaction.id)}>
                        {transaction.transaction_category === 'income' ?
                            (<div className="transaction-icon-container income">
                                <TrashIcon className={'delete-icon'} />
                                <TrafficUp />
                            </div>) :
                            (<div className="transaction-icon-container outcome">
                                <TrashIcon className={'delete-icon'} />
                                <TrafficDown />
                            </div>)
                        }
                    </div>
                    <div className="transaction-info flex flex-col">
                        <span className="transaction-category">{transaction.transaction_note}</span>
                        <span className="transaction-date">{transaction.transaction_date}</span>
                    </div>
                    <div className="transaction-amount flex flex-col">
                        <span>
                            {transaction.transaction_category === 'income' ?
                                (<span className="amount-income">+ </span>) :
                                (<span className="amount-outcome">- </span>)}
                            Rp {moneyFormat(transaction.transaction_amount)}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TransactionList