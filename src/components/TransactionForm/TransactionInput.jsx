import { useEffect } from "react";
import moneyFormat from "../../utils/moneyFormat";
import transactionPurposeList from '../../utils/transactionPurposeList'

const TransactionInput = ({ transactionNote, transactionDate, transactionAmount, transactionPurpose, updateTransactionNote, updateTransactionAmount, updateTransactionDate, updateTransactionPurpose }) => {
    const handleTransactionAmount = (e) => {
        const value = e.target.value;
        const filteredValue = value.replace(/[^0-9]/g, '');
        updateTransactionAmount(filteredValue);
    }

    const pad = (n) => {
        return String(n).padStart(2, "0")
    }

    const toLocaleDateWithOutSeconds = (inputDate = new Date()) => {
        const d = new Date(inputDate)
        const YYYY = d.getFullYear();
        const MM = pad(d.getMonth() + 1)
        const DD = pad(d.getDate())
        const hh = pad(d.getHours())
        const mm = pad(d.getMinutes())
        return `${YYYY}-${MM}-${DD}T${hh}:${mm}:00`
    }

    useEffect(() => {
        updateTransactionDate(toLocaleDateWithOutSeconds())
    }, [])

    const TransactionPurposeList = transactionPurposeList()
    
    return (
        <>
            <div className="button-grup flex" style={{gap: '10px'}}>
                <input type="text" name="note" id="note" placeholder="Transaction Notes" value={transactionNote || ''} onChange={(e) => updateTransactionNote(e.target.value)}/>
                <input type="text" id="amount" inputMode="numeric" pattern="[0-9]*" value={moneyFormat(transactionAmount) || ''} onChange={handleTransactionAmount}/>
            </div>
            <div className="button-group flex">
                <input aria-label="transaction-date" type="datetime-local" value={transactionDate || toLocaleDateWithOutSeconds()} id="date" onChange={(e) => updateTransactionDate(e.target.value)}/>
                <select name="transaction-purpose" id="transaction-purpose" defaultValue={transactionPurpose} onChange={(e) => updateTransactionPurpose(e.target.value)}>
                    {TransactionPurposeList.map(p => (
                        <option value={p.key} key={p.key}>{p.label}</option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default TransactionInput;