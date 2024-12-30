import moneyFormat from "../../utils/moneyFormat"
import supabaseDelTransaction from "../../api/supabaseDelTransaction"
import TrashIcon from "../../assets/icon/TrashIcon";
import TrafficUp from "../../assets/icon/TrafficUp";
import TrafficDown from "../../assets/icon/TrafficDown";

const TransactionList = ({ transactions, setTransactions }) => {
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
            {transactions.map((transaction) => (
                <div key={transaction.id} className="transaction-item flex">
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