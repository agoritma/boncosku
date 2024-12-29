import supabase from "./supabaseClient"

const supabaseFetchUserInfo = async () => {
    const { data, error } = await supabase
        .from('boncosku_users')
        .select('*')
    return {data, error}
}

export default supabaseFetchUserInfo