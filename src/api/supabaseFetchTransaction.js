import supabase from "./supabaseClient"

const supabaseFetchTransaction = async () => {
    const { data, error } = await supabase
        .from('boncosku_users_transactions')
        .select('*')
    return {data, error}
}

export default supabaseFetchTransaction