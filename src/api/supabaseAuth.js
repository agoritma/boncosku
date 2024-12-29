import supabase from "./supabaseClient";

const supabaseAuth = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: import.meta.env.VITE_APP_SUPABASE_EMAIL,
        password: import.meta.env.VITE_APP_SUPABASE_PASSWORD,
    });
    if (error) {
        console.error("Error logging in:", error);
        return false;
    }
    return true
};

export default supabaseAuth;