import supabase from "../api/supabaseClient";
import { v4 as uuidv4 } from 'uuid';

const submitTransaction = async ({transactionCategory, transactionNote, transactionAmount, transactionDate, updateTransactionList, setTransactionAmount, setTransactionDate, setTransactionNote, userInfo, transactionsList}) => {
    if (!transactionAmount || !transactionDate || !transactionNote || !userInfo.user_id) {
        alert('Please fill in all fields');
        return;
    }
    if (transactionAmount && transactionDate && transactionNote && transactionCategory && transactionAmount > 0 && transactionNote.trim().length !== 0) {   
        const newTransaction = {
            "id": uuidv4(),
            "user_id": userInfo.user_id,
            "transaction_category": transactionCategory,
            "transaction_amount": parseInt(transactionAmount),
            "transaction_date": transactionDate,
            "transaction_note": transactionNote,
        }

        updateTransactionList([...transactionsList, newTransaction]);
        setTransactionAmount('');
        setTransactionDate(null);
        setTransactionNote(null);

        const { data, error } = await supabase
            .from('boncosku_users_transactions')
            .insert(newTransaction)
            .select();

        if (error) {
            console.error(error);
            return;
        }
    }
}

export default submitTransaction;