import supabase from "../api/supabaseClient";
import { v4 as uuidv4 } from 'uuid';

const submitTransaction = async ({transactionCategory, transactionNote, transactionAmount, transactionDate, transactionPurpose, setTransactionPurpose, updateTransactionList, setTransactionAmount, setTransactionDate, setTransactionNote, userInfo, transactionsList}) => {
    if (!transactionAmount || !transactionDate || !transactionNote || !userInfo.user_id || !transactionPurpose) {
        alert('Please fill in all fields');
        return;
    }
    if (transactionAmount && transactionDate && transactionNote && transactionCategory && transactionAmount > 0 && transactionNote.trim().length !== 0) {   
        const validTransacationDate = `${String(transactionDate).replace('T', ' ')}+00`
        
        const newTransaction = {
            "id": uuidv4(),
            "user_id": userInfo.user_id,
            "transaction_category": transactionCategory,
            "transaction_amount": parseInt(transactionAmount),
            "transaction_date": validTransacationDate,
            "transaction_note": transactionNote,
            "transaction_purpose": transactionPurpose,
        }

        console.log(validTransacationDate)

        updateTransactionList([...transactionsList, newTransaction]);
        setTransactionAmount('');
        setTransactionDate(null);
        setTransactionNote(null);
        setTransactionPurpose('-')

        const { data, error } = await supabase
            .from('boncosku_users_transactions')
            .insert(newTransaction)
            .select();
        if (error) {
            alert(error.message)
            return "error";
        }
        return "sucess"
    }
    return "error"
}

export default submitTransaction;