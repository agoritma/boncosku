import supabase from "./supabaseClient"

const supabaseFetchTransaction = async (transaction_date) => {
    if (!transaction_date) {
        const { data, error } = await supabase
            .from('boncosku_users_transactions')
            .select('*')
            return {data, error}
    } else {
        const { data, error } = await supabase
            .from('boncosku_users_transactions')
            .select('*')
            .gt('transaction_date', transaction_date)
            return {data, error}
    }
}

export default supabaseFetchTransaction