import TransactionCategory from "./TransactionCategory";
import TransactionInput from "./TransactionInput";
import { useState } from "react";
import submitTransaction from "../../utils/submitTransaction";

const TransactionFormContainer = ({ transactionsList, updateTransactionList, userInfo }) => {
    const [transactionCategory, setTransactionCategory] = useState('income');
    const [transactionAmount, setTransactionAmount] = useState('');
    const [transactionDate, setTransactionDate] = useState(null);
    const [transactionNote, setTransactionNote] = useState(null);

    const handleSubmitTransaction = () => {
        submitTransaction({
            transactionCategory,
            transactionNote,
            transactionAmount,
            transactionDate,
            updateTransactionList,
            setTransactionAmount,
            setTransactionDate,
            setTransactionNote,
            userInfo,
            transactionsList
        });
    }

    return (
        <div className="transaction-form-section flex flex-col">
            <h2>New Transaction</h2>
            <div className="another-options flex">
                <button className="button button-box" disabled>From Mutation</button>
                <button className="button button-box" disabled>From Image</button>
            </div>
            <div className="option-section flex">
                <hr></hr><span>or</span><hr></hr>
            </div>
            <TransactionCategory updateTransactionCategory={setTransactionCategory} />
            <TransactionInput
                transactionCategory={transactionCategory}
                transactionAmount={transactionAmount}
                transactionDate={transactionDate}
                transactionNote={transactionNote}
                updateTransactionAmount={setTransactionAmount}
                updateTransactionDate={setTransactionDate}
                updateTransactionNote={setTransactionNote}
            />
            <button id="submit" className="button button-box selected" onClick={handleSubmitTransaction}>Add Transaction</button>
        </div>
    )
}

export default TransactionFormContainer;