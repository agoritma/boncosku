import moneyFormat from "../../utils/moneyFormat";

const TransactionInput = ({ transactionCategory, transactionNote, transactionDate, transactionAmount, updateTransactionNote, updateTransactionAmount, updateTransactionDate }) => {
    const handleTransactionAmount = (e) => {
        const value = e.target.value;
        const filteredValue = value.replace(/[^0-9]/g, '');
        updateTransactionAmount(filteredValue);
    }
    
    return (
        <>
            <input type="text" name="note" id="note" placeholder="Transaction Notes" value={transactionNote || ''} onChange={(e) => updateTransactionNote(e.target.value)}/>
            <div className="button-group flex">
                <div className="group">
                    <span className="currency flex">
                        { transactionCategory === 'income' ? (<span className="income">+</span>) : (<span className="outcome">-</span>) }
                        Rp
                    </span>
                    <input type="text" id="amount" inputMode="numeric" placeholder="30.000" pattern="[0-9]*" value={moneyFormat(Number(transactionAmount)) || ''} onChange={handleTransactionAmount}/>
                </div>
                <input aria-label="transaction-date" type="date" value={transactionDate || ''} id="date" onChange={(e) => updateTransactionDate(e.target.value)}/>
            </div>
        </>
    )
}

export default TransactionInput;