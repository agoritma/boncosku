import moneyFormat from "../../utils/moneyFormat"
import supabaseDelTransaction from "../../api/supabaseDelTransaction"
import TrashIcon from "../../assets/icon/TrashIcon";
import TrafficUp from "../../assets/icon/TrafficUp";
import TrafficDown from "../../assets/icon/TrafficDown";
import ConfirmBox from "../ConfirmBox/Index"
import { useState } from "react";

const TransactionList = ({ transactions, tempTransactions, setTransaction, setTempTransactions }) => {
    const [showConfirmBox, setShowConfirmBox] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState(null);
    
    const handleDeleteClick = (transaction) => {
        setTransactionToDelete(transaction);
        setShowConfirmBox(true);
    }

    const confirmDeleteTransaction = async () => {
        const updatedTransactions = transactions.filter(transaction => transaction.id !== transactionToDelete.id);
        setTransaction(updatedTransactions)
        setTempTransactions(updatedTransactions)
        setShowConfirmBox(false);
        setTransactionToDelete(null);
        const { error } = await supabaseDelTransaction(transactionToDelete.id);
        if (error) {
            console.error('Error deleting transaction:', error);
            return;
        }
    }

    const cancelDeleteTransaction = () => {
        setShowConfirmBox(false);
        setTransactionToDelete(null);
    }

    return (
        <div className="transaction-list flex flex-col  ">
            {tempTransactions.slice(0, 30).map((transaction) => (
                <div key={transaction.id} className="transaction-item flex">
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
                        <span className="transaction-note">{transaction.transaction_note}</span>
                        <span className="transaction-date">{new Date(transaction.transaction_date).toLocaleString("id-ID", {timeStyle: "short", dateStyle: "short"})}</span>
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
                    message={`Are you sure want to delete transaction "${transactionToDelete.transaction_note}"?`}
                    isConfirmation={true}
                    onConfirm={confirmDeleteTransaction}
                    onCancel={cancelDeleteTransaction}
                />
            )}
        </div>
    )
}

export default TransactionList