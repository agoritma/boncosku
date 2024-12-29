import supabase from "./supabaseClient"

const supabaseFetchUserProfile = async (userId) => {
    const { data } = supabase
    .storage
    .from('boncosku_storage')
    .getPublicUrl(`${userId}/avatar.jpg`)
    return data
}

export default supabaseFetchUserProfile