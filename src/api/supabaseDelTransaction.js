import supabase from "./supabaseClient"

const supabaseDelTransaction = async (id) => {
    const { error } = await supabase
      .from('boncosku_users_transactions')
      .delete()
      .eq('id', id)

    if (error) {
      console.error(error)
      return false
    }
    return true
}

export default supabaseDelTransaction