import moneyFormat from "../../utils/moneyFormat"
import supabaseDelTransaction from "../../api/supabaseDelTransaction"
import TrashIcon from "../../assets/icon/TrashIcon";
import TrafficUp from "../../assets/icon/TrafficUp";
import TrafficDown from "../../assets/icon/TrafficDown";
import ConfirmBox from "../ConfirmBox/Index"
import { useState, useEffect, useRef } from "react";

const TransactionList = ({ transactions, setTransactions, transactionHeadRef }) => {
    const transactionListRef = useRef([]);
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState(null);

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
    
    const handleDeleteClick = (transaction) => {
        setTransactionToDelete(transaction);
        setShowConfirmBox(true);
    }

    const confirmDeleteTransaction = async () => {
        const updatedTransactions = transactions.filter(transaction => transaction.id !== transactionToDelete.id);
        setTransactions(updatedTransactions)
        const { error } = await supabaseDelTransaction(transactionToDelete.id);
        if (error) {
            console.error('Error deleting transaction:', error);
            return;
        }
        setShowConfirmBox(false);
        setTransactionToDelete(null);
    }

    const cancelDeleteTransaction = () => {
        setShowConfirmBox(false);
        setTransactionToDelete(null);
    }

    return (
        <div className="transaction-list flex flex-col">
            {transactions.map((transaction, index) => (
                <div key={transaction.id} className="transaction-item flex" ref={el => transactionListRef.current[index] = el}>
                    <div className="transaction-icon button" onClick={() => handleDeleteClick(transaction)}>
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
            {showConfirmBox && (
                <ConfirmBox 
                    type={'warning'}
                    message={`Are you sure you want to delete transaction "${transactionToDelete.transaction_note}"?`}
                    isConfirmation={true}
                    onConfirm={confirmDeleteTransaction}
                    onCancel={cancelDeleteTransaction}
                />
            )}
        </div>
    )
}

export default TransactionList